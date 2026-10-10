import os

dir_path = r'e:\krinali\talent_partner'
count = 0

for filename in os.listdir(dir_path):
    if filename.endswith('.html'):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace Carrier Guidance with Career Guidance
        new_content = content.replace('>Carrier Guidance<', '>Career Guidance<')
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated header spelling in {filename}")

print(f"Total files updated: {count}")
