# -*- coding: utf-8 -*-
# Fix encoding issues in index.html

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all corrupted characters
replacements = {
    'â€"': '–',  # en dash
    'â€"': '—',  # em dash  
    'ðŸ"š': '📚',  # book emoji
    'ðŸŽ¨': '🎨',  # art emoji
    'ðŸš€': '🚀',  # rocket emoji
    'âœï¸': '✏️',  # pencil emoji
    'âœ‰ï¸': '✉️',  # envelope emoji
    'ðŸ'¼': '💼',  # briefcase emoji
    'ðŸ"±': '📱',  # phone emoji
    'âœ"': '✓',  # check mark
    'â†'': '→',  # right arrow
    'â•': '═',  # box drawing
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Write back with proper UTF-8 encoding
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all encoding issues!")
