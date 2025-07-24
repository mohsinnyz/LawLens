#D:\LawLens\rag\pdf_to_cleaned_txt.py

import re
import fitz  # PyMuPDF
from pathlib import Path

def extract_and_clean_pdf(pdf_path: str, output_path: str):
    doc = fitz.open(pdf_path)
    full_text = ""

    for page in doc:
        full_text += page.get_text()

    # Remove bracketed references like "16[", "] 17", "20[] 20", etc.
    full_text = re.sub(r'\[\d+\]|\d+\[\]|\[\]', '', full_text)
    full_text = re.sub(r'\n\s*\n', '\n', full_text)  # remove empty lines
    full_text = re.sub(r'\s{2,}', ' ', full_text)    # collapse long spaces

    # Fix broken section headers, like:
    # 45. "Life":
    # 46. "Death":
    full_text = re.sub(r'\n?(\d{1,4})\.\s*"(.*?)":', r'\n\1. \2:', full_text)

    # Remove page/line numbers if present
    full_text = re.sub(r'\n\s*\d+\s*\n', '\n', full_text)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_text)

    print(f"✅ Cleaned text saved to: {output_path}")

if __name__ == "__main__":
    pdf_path = "corpus/raw_ppc.pdf"
    output_path = "corpus/cleaned_ppc.txt"
    extract_and_clean_pdf(pdf_path, output_path)
