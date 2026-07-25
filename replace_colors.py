import os
import re

files = [
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\Hero.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\HowItWorks.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\Services.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\Templates.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\Testimonials.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\home\FAQ.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\layout\Navbar.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\layout\Footer.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\app\admin\page.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\app\commander\page.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\app\commander\succes\page.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\app\suivi\page.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\ui\card.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\ui\button.tsx",
    r"C:\Users\User\Pictures\Screenshots\ftp\src\components\ui\input.tsx"
]

replacements = {
    "#0a0a0f": "#0f172a",
    "#050508": "#0f172a",
    "#12121a": "#1e293b",
    "#1a1a2e": "#1e293b",
    "#22223a": "#334155",
    "#2a2a3e": "#334155",
    "#3a3a52": "#475569",
    "#f0f0f5": "#f1f5f9",
    "#d0d0d5": "#cbd5e1",
    "#8888a0": "#94a3b8",
    "#5a5a72": "#64748b",
    "#7c3aed": "#8b5cf6",
    "#6366f1": "#818cf8",
    "#06b6d4": "#22d3ee",
    "#10b981": "#34d399",
    "#f59e0b": "#fbbf24"
}

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = content
        for old, new in replacements.items():
            new_content = re.sub(re.escape(old), new, new_content, flags=re.IGNORECASE)
            
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {f}")
    else:
        print(f"File not found: {f}")
