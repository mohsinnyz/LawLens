# D:\LawLens\rag\retriever.py

import faiss
import json
from sentence_transformers import SentenceTransformer
import os
from typing import List, Dict, Any

class PPCRetriever:
    """
    Retrieves relevant law sections (chunks) from a FAISS index
    based on a given query.
    """
    def __init__(self, index_dir='corpus/faiss_index/'):
        self.index_dir = index_dir
        self.index_path = os.path.join(index_dir, 'ppc.index')
        self.metadata_path = os.path.join(index_dir, 'metadata.json')
        
        # Initialize the SentenceTransformer model for embedding queries
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        
        self.index = None
        self.metadata = []
        self._load_index_and_metadata()

    def _load_index_and_metadata(self):
        """
        Loads the FAISS index and associated metadata from disk.
        """
        if os.path.exists(self.index_path) and os.path.exists(self.metadata_path):
            try:
                self.index = faiss.read_index(self.index_path)
                with open(self.metadata_path, 'r', encoding='utf-8') as f:
                    self.metadata = json.load(f)
                print(f"✅ Loaded FAISS index from {self.index_path} with {self.index.ntotal} vectors.")
                print(f"✅ Loaded metadata from {self.metadata_path} with {len(self.metadata)} entries.")
            except Exception as e:
                print(f"❗ Error loading FAISS index or metadata: {e}")
                self.index = None
                self.metadata = []
        else:
            print(f"❗ Warning: FAISS index or metadata not found in '{self.index_dir}'.")
            print("Please ensure `python rag\\embedder.py` has been run successfully.")
            self.index = None
            self.metadata = []

    # This is the method that MUST BE NAMED 'retrieve_chunks'
    def retrieve_chunks(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieves the top-k most similar chunks to the given query from the FAISS index.

        Args:
            query (str): The text query to search for.
            k (int): The number of top relevant chunks to retrieve.

        Returns:
            List[Dict[str, Any]]: A list of dictionaries, where each dictionary represents
                                  a retrieved chunk with its section, title, and content.
        """
        if self.index is None or not self.metadata:
            print("Error: Retriever not fully loaded (index or metadata missing). Cannot retrieve chunks.")
            return []

        # Encode the query into a vector embedding
        query_embedding = self.model.encode([query]).astype('float32') # Ensure float32 for FAISS

        # Perform similarity search in the FAISS index
        D, I = self.index.search(query_embedding, k) # D=distances, I=indices of found vectors

        retrieved_data = []
        # Iterate over the indices of the top-k nearest neighbors
        for i in I[0]: 
            if 0 <= i < len(self.metadata): # Ensure the index is valid
                retrieved_data.append(self.metadata[i])
            else:
                print(f"❗ Warning: Retrieved index {i} out of bounds for metadata list (size {len(self.metadata)}).")
        return retrieved_data