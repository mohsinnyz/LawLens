#D:\LawLens\rag\chunker.py

import re
import json
from pathlib import Path

def chunk_ppc_by_section(file_path: str, output_path: str):
    with open(file_path, 'r', encoding='utf-8') as file:
        raw_text = file.read()

    # Remove stray bracket numbers and annotations like "] 184", "182[] 182"
    clean_text = re.sub(r"\[\d+\]|\]\s*\d+|\d+\[\]|\[\]", "", raw_text)

    # Split using pattern: e.g., 494. Section Title:
    pattern = r'(?=\n?\d{1,4}\.\s+.*?:)'
    sections = re.split(pattern, clean_text)
    chunks = []

    for sec in sections:
        sec = sec.strip()
        if not sec:
            continue

        match = re.match(r'^(\d{1,4})\.\s+(.*?):\s*(.*)', sec, re.DOTALL)
        if match:
            section_number, title, content = match.groups()
            chunks.append({
                "section_number": section_number.strip(),
                "title": title.strip(),
                "content": content.strip()
            })

    # Save as JSON
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as out_file:
        json.dump(chunks, out_file, indent=2, ensure_ascii=False)

    print(f"✅ Chunking complete. Extracted {len(chunks)} sections.")

if __name__ == "__main__":
    input_path = "corpus/cleaned_ppc.txt"
    output_path = "corpus/cleaned_ppc_chunks.json"
    chunk_ppc_by_section(input_path, output_path)
