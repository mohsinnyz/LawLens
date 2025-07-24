#D:\LawLens\langgraph\nodes\reasoner.py

from gemini_api.client import ask_gemini

def reasoner_node(state: dict) -> dict:
    """
    Node to perform reasoning or clarification if interpretation is ambiguous or insufficient.
    """
    query = state.get("query", "")
    interpretation = state.get("interpretation", "")

    if not interpretation:
        return {**state, "reasoning": "Interpretation not available."}

    prompt = f"""
User Query: {query}

Interpretation Provided:
{interpretation}

Now assess:
1. Does this interpretation clearly answer the user's question?
2. Is anything missing or confusing?
3. If needed, expand the interpretation or clarify the legal meaning further.

Final Output: Provide a clear and well-reasoned explanation.
"""

    reasoning = ask_gemini(prompt)
    return {
        **state,
        "reasoning": reasoning
    }
