# ⚖️ LawLens — Pakistani Penal Code (PPC) AI Interpreter

LawLens is an AI-powered legal assistant that helps users understand the Pakistan Penal Code (PPC) using Retrieval-Augmented Generation (RAG), LangGraph multi-agent reasoning, and Google Gemini for legal simplification.

---

## 🧠 Features

- 🔍 Semantic search through PPC sections (FAISS + embeddings)
- 🧾 Real legal text chunked and cleaned from official PPC PDF
- 🧑‍⚖️ LangGraph-based multi-agent pipeline:
  - Retriever → Reasoner → Interpreter → Explainer
- 🤖 Gemini-based simplified explanations
- 🌐 Frontend React form to interact with the backend
- 🧪 Test JSON file to validate core use cases

---

## 📁 Project Structure

```

LAWLENS/
├── corpus/                # PPC source files and FAISS index
├── frontend/              # React + Vite frontend
├── gemini\_api/            # Gemini client
├── langgraph/             # Graph + nodes
├── rag/                   # Chunking, Embedding, Retrieval
├── tests/                 # Test input queries
├── ui/                    # API server and CLI
├── readme.md
└── requirements.txt

````

---

## 🚀 Getting Started

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
````

> 💡 Make sure `.env` has your Gemini API Key:
>
> ```
> GEMINI_API_KEY=your_key_here
> ```

---

### 2. Prepare the Legal Corpus

```bash
# Extract sections from raw PPC PDF
python rag/chunker.py

# Build FAISS index from JSON chunks
python rag/embedder.py
```

---

### 3. Run the Backend API

```bash
uvicorn ui.api_server:app --reload
```

---

### 4. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

> App runs at `http://localhost:5173/`

---

## ✅ Test Examples

See [`tests/demo_inputs.json`](tests/demo_inputs.json) for realistic legal questions.

---

## 🧑‍⚖️ Example Query

> ❓ *"What is the punishment for deceitfully living with a woman by pretending to be married?"*

LawLens will:

1. Retrieve relevant sections like 493-A
2. Reason with them
3. Use Gemini to explain in plain Urdu or English

---

## 📜 License

MIT — for educational and public good use.

```

