# D:\LawLens\langgraph_utils\nodes\retriever.py

from rag.retriever import PPCRetriever  # This imports your PPCRetriever class
from ..graph_builder import LawLensState # Corrected: Relative import for LawLensState
from typing import Dict, Any, List

# Initialize your PPCRetriever globally. This ensures it's loaded only once
# when the application starts, which is efficient for FAISS index loading.
_ppc_retriever_instance = PPCRetriever() 

def retrieve_node(state: LawLensState) -> LawLensState:
    """
    Node to retrieve relevant law sections based on legal intent.
    """
    print(f"\n--- Entering retrieve_node ---")
    print(f"Current state keys: {list(state.keys())}")

    state_as_dict = dict(state)
    legal_intent = state_as_dict.get("legal_intent", "")

    if not legal_intent:
        print("Retriever node: No legal intent found. Skipping retrieval.")
        return {**state, "context": []}

    # This is where you modify the call to retrieve_chunks
    print(f"Retriever node: Retrieving chunks for query/intent: {legal_intent[:100]}...")

    # --- THIS IS THE CORRECTED LINE: k is now set to 10 ---
    chunks = _ppc_retriever_instance.retrieve_chunks(legal_intent, k=10) 
    # --- END CORRECTED LINE ---

    print(f"Retriever node: Retrieved {len(chunks)} chunks.")

    new_state = LawLensState(**state)
    new_state["context"] = chunks
    
    print(f"--- Exiting retrieve_node ---")
    return new_state