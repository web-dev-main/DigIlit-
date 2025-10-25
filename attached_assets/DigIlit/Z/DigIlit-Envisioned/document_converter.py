#!/usr/bin/env python3
"""
QUICK DOCUMENT CONVERTER for AI Commander
Converts Word/PDF to clean text for proper learning
"""

import os
import sys
from pathlib import Path

try:
    from docx2txt import process as docx2txt_process
    import PyPDF2
except ImportError:
    print("Installing required packages...")
    os.system("pip install docx2txt PyPDF2")
    from docx2txt import process as docx2txt_process
    import PyPDF2

def convert_docx_to_text(docx_path):
    """Convert Word document to clean text"""
    try:
        text = docx2txt_process(docx_path)
        # Clean up extra whitespace
        text = ' '.join(text.split())
        return text
    except Exception as e:
        print(f"Error converting {docx_path}: {e}")
        return ""

def convert_pdf_to_text(pdf_path):
    """Convert PDF to clean text"""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error converting {pdf_path}: {e}")
        return ""

def convert_all_documents():
    """Convert all documents in current directory"""
    cpux_path = Path("cpux")
    converted_count = 0
    
    # Convert root documents
    for doc_file in Path(".").glob("*.*"):
        if doc_file.suffix.lower() in ['.docx', '.pdf']:
            print(f"📄 Converting: {doc_file.name}")
            
            if doc_file.suffix.lower() == '.docx':
                content = convert_docx_to_text(doc_file)
                category = "documentation"
            else:  # PDF
                content = convert_pdf_to_text(doc_file)
                category = "documentation"
            
            if content and len(content) > 100:  # Only save if we got meaningful content
                # Save to appropriate cpux category
                category_path = cpux_path / category
                category_path.mkdir(exist_ok=True)
                
                text_file = category_path / f"{doc_file.stem}.txt"
                with open(text_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"   ✅ Saved: {text_file.name} ({len(content)} chars)")
                converted_count += 1
    
    # Convert files in cpux subdirectories
    for category in ['ai_framework', 'blockchain', 'ui_ux', 'design', 'code', 'apps']:
        category_path = cpux_path / category
        if category_path.exists():
            for doc_file in category_path.glob("*.*"):
                if doc_file.suffix.lower() in ['.docx', '.pdf', '.pptx']:
                    print(f"📄 Converting: {category}/{doc_file.name}")
                    
                    if doc_file.suffix.lower() == '.docx':
                        content = convert_docx_to_text(doc_file)
                    elif doc_file.suffix.lower() == '.pdf':
                        content = convert_pdf_to_text(doc_file)
                    else:
                        continue  # Skip PPTX for now
                    
                    if content and len(content) > 100:
                        text_file = category_path / f"{doc_file.stem}.txt"
                        with open(text_file, 'w', encoding='utf-8') as f:
                            f.write(content)
                        
                        print(f"   ✅ Saved: {category}/{text_file.name}")
                        converted_count += 1
    
    return converted_count

if __name__ == "__main__":
    print("🚀 DOCUMENT CONVERTER FOR AI COMMANDER")
    print("Converting all documents to clean text...")
    
    converted = convert_all_documents()
    
    print(f"\n✅ CONVERSION COMPLETE!")
    print(f"📄 Converted {converted} documents to clean text")
    print(f"\n🎯 Now restart your AI Commander to learn from CLEAN content!")
    print("   python ai_commander_core.py")
