#D:\LawLens\langgraph\nodes\interpreter.py

from gemini_api.client import ask_gemini

def interpreter_node(state: dict) -> dict:
    """
    Node to interpret retrieved law sections using Gemini.
    """
    query = state.get("query", "")
    chunks = state.get("retrieved_chunks", [])

    if not chunks:
        return {**state, "interpretation": "No relevant law sections found."}

    # Format the law chunks as context
    context = "\n\n".join(
        f"Section {chunk.get('section')}: {chunk.get('title')}\n{chunk.get('content')}"
        for chunk in chunks
    )

    prompt = f"""
You are a legal AI assistant interpreting the Pakistan Penal Code.

User Query: {query}

Relevant Sections:
{context}

Please explain to the user what the law says in plain terms.
"""

    interpretation = ask_gemini(prompt)
    return {
        **state,
        "interpretation": interpretation
    }
