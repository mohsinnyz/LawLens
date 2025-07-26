# D:\LawLens\extract_pdf_text.py

from pdfminer.high_level import extract_text
import os # Import os for path joining

def extract_text_pdfminer(pdf_path, output_txt_path):
    try:
        text = extract_text(pdf_path)
        with open(output_txt_path, 'w', encoding='utf-8') as output_file:
            output_file.write(text)
        print(f"Text successfully extracted from {pdf_path} to {output_txt_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage:
# Set the correct paths relative to where this script is run.
# Assuming raw_ppc.pdf is in D:\LawLens\corpus\
# and cleaned_ppc.txt should also be saved in D:\LawLens\corpus\

# Define paths for input PDF and output TXT
input_pdf_name = 'raw_ppc.pdf'
output_txt_name = 'cleaned_ppc.txt'

# Construct full paths
current_dir = os.path.dirname(os.path.abspath(__file__)) # Get directory of current script
corpus_dir = os.path.join(current_dir, 'corpus') # Path to the 'corpus' folder

full_pdf_path = os.path.join(corpus_dir, input_pdf_name)
full_output_txt_path = os.path.join(corpus_dir, output_txt_name)

# Make sure the 'corpus' directory exists
os.makedirs(corpus_dir, exist_ok=True)

extract_text_pdfminer(full_pdf_path, full_output_txt_path)