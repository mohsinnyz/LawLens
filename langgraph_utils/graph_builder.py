# D:\LawLens\langgraph_utils\graph_builder.py

from typing import TypedDict, List, Dict, Any, Optional # Import TypedDict and Optional
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages # Keep if needed, otherwise remove

# Define LawLensState as a TypedDict
# This is critical for LangGraph to properly manage state mutations and for type checking.
class LawLensState(TypedDict):
    input: str # The initial user query
    legal_intent: Optional[str] # Output from interpreter node
    context: List[Dict[str, Any]] # List of retrieved chunks from retriever node
    reasoning: Optional[str] # Output from reasoner node
    explanation: Optional[str] # Final explanation from explainer node

# Correct imports for your custom nodes within the 'langgraph_utils' package.
# These are relative imports, as graph_builder.py is at the root of 'langgraph_utils'.
from .nodes.retriever import retrieve_node
from .nodes.interpreter import interpreter_node
from .nodes.reasoner import reasoner_node
from .nodes.explainer import explainer_node


# Initialize LangGraph flow
def build_lawlens_graph():
    workflow = StateGraph(LawLensState)

    # Add nodes to the workflow
    # Note: "retrieve" node usually runs first to get context based on query.
    # The current flow "interpret" -> "retrieve" might mean "interpret query intent then retrieve"
    # or "retrieve first, then interpret retrieved context".
    # I'll keep your current order but flag it for review.
    workflow.add_node("interpret", interpreter_node)
    workflow.add_node("retrieve", retrieve_node)
    workflow.add_node("reason", reasoner_node)
    workflow.add_node("explain", explainer_node)

    # Define the edges (flow) of the graph
    workflow.set_entry_point("interpret") # Starting point of the graph
    workflow.add_edge("interpret", "retrieve")
    workflow.add_edge("retrieve", "reason")
    workflow.add_edge("reason", "explain")
    workflow.add_edge("explain", END) # End of the graph

    return workflow.compile()

# Function to analyze a query using the built graph
def analyze_with_graph(query: str) -> str:
    graph = build_lawlens_graph()
    # Initialize the state for the graph invocation.
    # The 'input' key holds the user's initial query, as expected by the 'interpreter_node'.
    state: LawLensState = {"input": query,
                           "legal_intent": None,
                           "context": [], # Initialize as empty list
                           "reasoning": None,
                           "explanation": None}
    
    # Invoke the graph with the initial state
    final_state = graph.invoke(state)

    # Retrieve the final explanation.
    # The 'explainer_node' is expected to put the final result in the 'explanation' key.
    return final_state.get("explanation", "❗ No explanation generated.")