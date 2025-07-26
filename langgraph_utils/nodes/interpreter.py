# D:\LawLens\langgraph_utils\nodes\interpreter.py

from gemini_api.client import ask_gemini
# Corrected: Relative import for LawLensState from the parent 'langgraph_utils' package
from ..graph_builder import LawLensState
from typing import Dict, Any, List

def interpreter_node(state: LawLensState) -> LawLensState:
    """
    Node to interpret user query and/or retrieved law sections using Gemini.
    """
    print(f"\n--- Entering interpreter_node ---")
    print(f"Current state keys: {list(state.keys())}")

    # Access the user's initial query, which is expected under the 'input' key.
    # Convert TypedDict to a regular dict to safely use .get(), or use direct access if key is guaranteed.
    state_as_dict = dict(state)
    query = state_as_dict.get("input", "")
    
    # Retrieved chunks should be in 'context' key after the retriever node has run.
    # Assuming 'retrieve' runs AFTER 'interpret' based on graph builder, 'context' might be empty here initially.
    # However, if 'interpret' also needs context, this design might need review.
    chunks = state_as_dict.get("context", []) 

    if not query:
        print("Interpreter node: No user query found in state['input']. Skipping interpretation.")
        # If no query, return current state, possibly with an error message
        return {**state, "explanation": "No valid query provided for interpretation."}

    # Decide what to interpret: just the query, or query + chunks?
    # Based on your graph, 'interpret' runs before 'retrieve', so chunks will be empty here.
    # If the purpose of interpreter_node is to interpret the user's intent from the query,
    # then 'chunks' won't be used in the prompt here.
    # If it's meant to interpret *after* retrieval, your graph flow needs to be adjusted.
    # For now, I'll assume it interprets the query's intent primarily.

    interpretation_prompt = f"""
You are a legal AI assistant. Your task is to interpret the user's query and identify the core legal intent or keywords.
Focus on understanding what kind of legal information the user is seeking.

User Query: {query}

Based on the user query, what is the core legal question or intent? Provide a concise summary of the legal issue.
"""
    print(f"Interpreter node: Sending intent interpretation prompt to Gemini (first 200 chars): {interpretation_prompt[:200]}...")
    legal_intent = ask_gemini(interpretation_prompt)
    print(f"Interpreter node: Received legal intent (first 200 chars): {legal_intent[:200]}...")

    # Update the state and return.
    # Create a new LawLensState object for proper LangGraph state updates.
    new_state = LawLensState(**state) # Create a new TypedDict from existing state
    new_state["legal_intent"] = legal_intent
    # Ensure 'input' and 'context' are carried forward
    new_state["input"] = query 
    new_state["context"] = chunks # Will be empty here if 'interpret' runs before 'retrieve'

    print(f"--- Exiting interpreter_node ---")
    return new_state