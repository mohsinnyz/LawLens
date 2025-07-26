#D:\LawLens\gemini_api\client.py

import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key from .env
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("❌ GEMINI_API_KEY not found in .env file.")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Single-prompt mode (non-conversational)
def ask_gemini(prompt: str) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash")
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ Gemini Error: {str(e)}"

# Chat-style mode with message history (optional)
def ask_gemini_chat(messages: list[dict]) -> str:
    """
    messages: [{"role": "user", "parts": ["..."]}, {"role": "model", "parts": ["..."]}]
    """
    model = genai.GenerativeModel("gemini-pro")
    chat = model.start_chat(history=messages)
    try:
        response = chat.send_message(messages[-1]["parts"][0])
        return response.text
    except Exception as e:
        return f"❌ Gemini Chat Error: {str(e)}"
