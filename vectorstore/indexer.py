#D:\LawLens\vectorstore\indexer.py


import json
import numpy as np
import faiss
from pathlib import Path

class FaissIndexer:
    def __init__(self, dim: int = 384):  # all-MiniLM-L6-v2 → 384 dim
        self.index = faiss.IndexFlatL2(dim)
        self.meta = []

    def index_data(self, embedded_json_path: str, index_save_path: str, meta_save_path: str):
        with open(embedded_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        embeddings = np.array([item['embedding'] for item in data], dtype='float32')
        self.meta = [
            {
                "section_number": item["section_number"],
                "title": item["title"],
                "content": item["content"]
            } for item in data
        ]

        self.index.add(embeddings)

        # Save index
        Path(index_save_path).parent.mkdir(parents=True, exist_ok=True)
        faiss.write_index(self.index, index_save_path)

        # Save metadata
        with open(meta_save_path, 'w', encoding='utf-8') as f_meta:
            json.dump(self.meta, f_meta, indent=2)

        print(f"✅ FAISS index saved to {index_save_path}")
        print(f"✅ Metadata saved to {meta_save_path}")

if __name__ == "__main__":
    indexer = FaissIndexer()
    indexer.index_data(
        embedded_json_path="corpus/embedded_ppc.json",
        index_save_path="vectorstore/ppc.index",
        meta_save_path="vectorstore/ppc_metadata.json"
    )

