#D:\LawLens\rag\retriever.py

import faiss
import json
import numpy as np
from sentence_transformers import SentenceTransformer

class PPCRetriever:
    def __init__(self,
                 index_path: str = "corpus/faiss_index/ppc.index",
                 metadata_path: str = "corpus/faiss_index/metadata.json",
                 model_name: str = "all-MiniLM-L6-v2"):
        self.index = faiss.read_index(index_path)
        self.metadata = self._load_metadata(metadata_path)
        self.model = SentenceTransformer(model_name)

    def _load_metadata(self, path):
        with open(path, 'r', encoding='utf-8') as file:
            return json.load(file)

    def retrieve(self, query: str, top_k: int = 5):
        query_embedding = self.model.encode([query]).astype("float32")
        distances, indices = self.index.search(query_embedding, top_k)

        results = []
        for idx in indices[0]:
            if idx < len(self.metadata):
                chunk = self.metadata[idx]
                results.append({
                    "section": chunk.get("section"),
                    "title": chunk.get("title"),
                    "content": chunk.get("content")
                })
        return results

# For quick testing
if __name__ == "__main__":
    retriever = PPCRetriever()
    query = "What is the punishment for marrying someone while already being married?"
    results = retriever.retrieve(query)

    for r in results:
        print(f"📌 Section {r['section']}: {r['title']}\n{r['content']}\n{'-'*50}")
