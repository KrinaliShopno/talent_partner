import os
import re

dir_path = r'e:\krinali\talent_partner'
index_path = os.path.join(dir_path, 'index.html')

with open(index_path, 'r', encoding='utf-8') as f:
    index_content = f.read()

# Extract footer block
footer_match = re.search(r'(<!-- FOOTER START -->.*?<!-- FOOTER END -->)', index_content, re.DOTALL)
if not footer_match:
    print("Error: Could not find FOOTER block in index.html")
    exit(1)

new_footer = footer_match.group(1)
count = 0

for filename in os.listdir(dir_path):
    if filename.endswith('.html') and filename != 'index.html':
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace footer
        if '<!-- FOOTER START -->' in content and '<!-- FOOTER END -->' in content:
            new_content = re.sub(r'<!-- FOOTER START -->.*?<!-- FOOTER END -->', new_footer.replace('\\', '\\\\'), content, flags=re.DOTALL)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Updated footer in {filename}")

print(f"Total files updated: {count}")
