# D:\LawLens\ui\simple_cli.py

from langgraph.graph_builder import build_lawlens_graph

def main():
    print("📚 Welcome to Law Lens - Your AI Legal Assistant\n")
    print("Type a real-life legal situation (e.g., 'My wife married someone else without divorce.')")
    print("Type 'exit' to quit.\n")

    lawlens_graph = build_lawlens_graph()

    while True:
        user_input = input("👤 You: ")
        if user_input.lower() == "exit":
            print("👋 Exiting Law Lens. Stay legally aware!")
            break

        # Prepare input state
        state = {
            "input": user_input,
            "legal_intent": None,
            "context": None,
            "reasoning": None,
            "explanation": None
        }

        # Run LangGraph workflow
        final_state = lawlens_graph.invoke(state)

        print("\n📜 Law Lens Explanation:")
        print(final_state.get("explanation", "❗ No explanation found.\n"))
        print("-" * 50)

if __name__ == "__main__":
    main()
