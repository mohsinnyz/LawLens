#D:\LawLens\langgraph\graph_builder.py


from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages

from langgraph.nodes.interpreter import interpreter_node
from langgraph.nodes.retriever import retrieve_node
from langgraph.nodes.reasoner import reasoner_node
from langgraph.nodes.explainer import explainer_node

# Define input/output keys in state
class LawLensState:
    input = None
    legal_intent = None
    context = None
    reasoning = None
    explanation = None

# Initialize LangGraph flow
def build_lawlens_graph():
    workflow = StateGraph(LawLensState)

    # Step-by-step nodes
    workflow.add_node("interpret", interpreter_node)
    workflow.add_node("retrieve", retrieve_node)
    workflow.add_node("reason", reasoner_node)
    workflow.add_node("explain", explainer_node)

    # Edges
    workflow.set_entry_point("interpret")
    workflow.add_edge("interpret", "retrieve")
    workflow.add_edge("retrieve", "reason")
    workflow.add_edge("reason", "explain")
    workflow.add_edge("explain", END)

    return workflow.compile()

def analyze_with_graph(query: str) -> str:
    graph = build_lawlens_graph()
    state = {"query": query}
    final_state = graph.invoke(state)
    return final_state.get("final_answer", "❗ No answer generated.")
