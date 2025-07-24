#D:\LawLens\rag\embedder.py

import json
import faiss
import numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer

def load_chunks(chunk_path: str):
    with open(chunk_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def build_faiss_index(chunks, model_name='all-MiniLM-L6-v2'):
    model = SentenceTransformer(model_name)

    texts = [f"{chunk['title']}: {chunk['content']}" for chunk in chunks]
    embeddings = model.encode(texts, show_progress_bar=True)

    # Convert to float32 for FAISS
    embeddings = np.array(embeddings).astype("float32")

    # Initialize FAISS index
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    return index, embeddings

def save_index(index, path: str):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    faiss.write_index(index, path)

def save_metadata(chunks, path: str):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(chunks, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    chunk_path = "corpus/cleaned_ppc_chunks.json"
    index_path = "corpus/faiss_index/ppc.index"
    meta_path = "corpus/faiss_index/metadata.json"

    chunks = load_chunks(chunk_path)
    index, _ = build_faiss_index(chunks)
    save_index(index, index_path)
    save_metadata(chunks, meta_path)

    print(f"✅ FAISS index created with {len(chunks)} sections.")
