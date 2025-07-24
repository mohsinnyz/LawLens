#D:\LawLens\langgraph\nodes\retriever.py

from rag.retriever import PPCRetriever

# Initialize retriever once (avoid repeated loads)
retriever = PPCRetriever()

def retrieve_node(state: dict) -> dict:
    """
    Node to retrieve relevant PPC sections for the user query.
    """
    query = state.get("query")
    if not query:
        return {**state, "retrieved_chunks": []}

    chunks = retriever.retrieve(query, top_k=5)
    return {
        **state,
        "retrieved_chunks": chunks
    }
