#D:\LawLens\langgraph\nodes\explainer.py

from gemini_api.client import ask_gemini

def explainer_node(state: dict) -> dict:
    """
    Final explainer node that synthesizes the reasoning and retrieved law to generate a legal explanation.
    """
    query = state.get("query", "")
    chunks = state.get("retrieved_chunks", [])
    reasoning = state.get("reasoning", "")

    # Format the law chunks as context
    context = "\n\n".join(
        f"Section {chunk.get('section')}: {chunk.get('title')}\n{chunk.get('content')}"
        for chunk in chunks
    )

    prompt = f"""
You are an AI legal assistant specialized in Pakistani Penal Code (PPC).
Your job is to explain the applicable law and reasoning to a user in simple yet accurate terms.

User Query:
{query}

Retrieved Law Sections:
{context}

AI Reasoning:
{reasoning}

Instructions:
- Summarize the relevant law clearly.
- Explain how it applies to the user’s situation.
- Be neutral, informative, and cite relevant section numbers.
- Format response in readable paragraphs with numbered sections if needed.

Final Answer:
"""

    explanation = ask_gemini(prompt)
    return {
        **state,
        "final_answer": explanation
    }
