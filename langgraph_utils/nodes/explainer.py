# D:\LawLens\langgraph_utils\nodes\explainer.py

from gemini_api.client import ask_gemini
from ..graph_builder import LawLensState # Corrected: Relative import for LawLensState
from typing import Dict, Any, List

def explainer_node(state: LawLensState) -> LawLensState:
    """
    Node to generate the final plain-language explanation for the user.
    """
    print(f"\n--- Entering explainer_node ---")
    print(f"Current state keys: {list(state.keys())}")

    state_as_dict = dict(state)
    original_query = state_as_dict.get("input", "")
    reasoning = state_as_dict.get("reasoning", "")
    # You might also want to include the raw context for the explainer for full clarity
    chunks = state_as_dict.get("context", []) 

    if not reasoning:
        explanation_message = "Explainer node: No reasoning available to form an explanation."
        print(explanation_message)
        return {**state, "explanation": explanation_message}
    
    context_str = "\n\n".join(
        f"Section {chunk.get('section', 'N/A')}: {chunk.get('title', 'No Title')}\n{chunk.get('content', 'No Content')}"
        for chunk in chunks
    )
    # ADD THIS LINE:
    print(f"Explainer node: Chunks received for explanation: {chunks}")

    
    prompt = f"""
You are a legal AI assistant named LawLens. Your final task is to provide a comprehensive and structured explanation to the user based on their original query, the legal reasoning derived from the relevant law sections, and the raw relevant sections themselves.

**Original User Query:** {original_query}

**Legal Reasoning (from relevant sections):**
{reasoning}

**Relevant Law Sections (for reference):**
{context_str}

---

**Based on all the information above, explain the legal implications to the user in a clear, structured, and plain-language format, following these specific guidelines:**

**⚖️ Legal Insights from LawLens:**

1.  **Start by directly acknowledging the user's situation.**
2.  **Provide Criminal Aspects (Pakistan Penal Code):**
    * **Definition of Theft:** Explicitly state the definition of theft as per **Section 378 of the Pakistan Penal Code (PPC)**.
    * **Punishment for Basic Theft:** State the standard punishment under **Section 379 of the PPC**.
    * **Aggravated Theft (Violence/Threat):** Add conditional logic: if the 'reasoning' or 'context' mentions violence, threat, or preparations to cause harm (e.g., to commit theft or escape), then specifically cite **Section 382 of the PPC** and its more severe implications. Phrase this conditionally (e.g., "If there were threats...").
3.  **Add Initial Steps & Civil Remedy Hint:**
    * Suggest **registering a First Information Report (FIR)** with the police as the first step for criminal proceedings.
    * Explain that the PPC deals with *criminal* aspects, but for *property recovery*, civil remedies are typically needed.
    * Suggest common civil recovery options like:
        * Filing a suit for recovery of property in a civil court.
        * Sending a formal legal notice to the friend.
4.  **Conclude with a Disclaimer:**
    * Always include the following exact disclaimer at the very end:
        ```
        Note: This information is for general guidance only and is not legal advice. For specific legal counsel regarding your situation, please consult a qualified lawyer in your jurisdiction.
        ```
5.  **Maintain plain language** and avoid excessive legal jargon where possible, except for official section citations.
6.  **Ensure all relevant details** from the reasoning and context are integrated cohesively.
7.  **If the reasoning indicates insufficient context, clearly state that** within the explanation.
"""
    print(f"Explainer node: Sending prompt to Gemini for final explanation (first 200 chars): {prompt[:200]}...")
    explanation = ask_gemini(prompt)
    print(f"Explainer node: Received explanation (first 200 chars): {explanation[:200]}...")

    new_state = LawLensState(**state)
    new_state["explanation"] = explanation # Store the final explanation here

    print(f"--- Exiting explainer_node ---")
    return new_state