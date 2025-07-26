# D:\LawLens\langgraph_utils\nodes\reasoner.py

from gemini_api.client import ask_gemini
from ..graph_builder import LawLensState # Corrected: Relative import for LawLensState
from typing import Dict, Any, List

def reasoner_node(state: LawLensState) -> LawLensState:
    """
    Node to perform reasoning based on legal intent and retrieved context.
    """
    print(f"\n--- Entering reasoner_node ---")
    print(f"Current state keys: {list(state.keys())}")

    state_as_dict = dict(state)
    legal_intent = state_as_dict.get("legal_intent", state_as_dict.get("input", ""))
    chunks = state_as_dict.get("context", [])

    if not legal_intent or not chunks:
        reasoning_message = "Reasoner node: Insufficient information for reasoning (no legal intent or context)."
        print(reasoning_message)
        return {**state, "reasoning": reasoning_message}

    # ADD THIS LINE:
    print(f"Reasoner node: Chunks received for reasoning: {chunks}")

    context_str = "\n\n".join(
        f"Section {chunk.get('section', 'N/A')}: {chunk.get('title', 'No Title')}\n{chunk.get('content', 'No Content')}"
        for chunk in chunks
    )
    


    prompt = f"""
You are a legal AI assistant. Given a user's legal intent and relevant law sections, your task is to identify and synthesize the key legal principles or rules **EXCLUSIVELY from the provided "Relevant Law Sections"** that directly apply to the intent.

User's Legal Intent: {legal_intent}

Relevant Law Sections:
{context_str}

**Based ONLY on the "Relevant Law Sections" and "User's Legal Intent":**
1.  Identify the specific provisions, conditions, or definitions that are most pertinent.
2.  Synthesize these points into a concise legal analysis that directly addresses the intent.
3.  Do not provide the final answer or explanation yet. Focus on the underlying legal reasoning derived *only* from the provided sections.
4.  **CRITICAL:** If the provided "Relevant Law Sections" are clearly insufficient, irrelevant, or do not contain information to address the "User's Legal Intent" at all, you **MUST state "Insufficient context provided for comprehensive reasoning. The retrieved sections do not directly address the core legal intent."** Do NOT try to answer outside the given context.
"""
    print(f"Reasoner node: Sending prompt to Gemini for reasoning (first 200 chars): {prompt[:200]}...")
    reasoning = ask_gemini(prompt)
    print(f"Reasoner node: Received reasoning (first 200 chars): {reasoning[:200]}...")

    new_state = LawLensState(**state)
    new_state["reasoning"] = reasoning

    print(f"--- Exiting reasoner_node ---")
    return new_state