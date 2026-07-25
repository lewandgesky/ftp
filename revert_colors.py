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

reverse_replacements = {
    "#0f172a": "#0a0a0f",
    "#1e293b": "#12121a",
    "#334155": "#22223a",
    "#475569": "#3a3a52",
    "#f1f5f9": "#f0f0f5",
    "#cbd5e1": "#d0d0d5",
    "#94a3b8": "#8888a0",
    "#64748b": "#5a5a72",
    "#8b5cf6": "#7c3aed",
    "#818cf8": "#6366f1",
    "#22d3ee": "#06b6d4",
    "#34d399": "#10b981",
    "#fbbf24": "#f59e0b",
    
    # Also handle some rgb/rgba cases if they exist
    "rgba(30, 41, 59": "rgba(18, 18, 26",
    "rgba(139, 92, 246": "rgba(124, 58, 237",
    "rgba(129, 140, 248": "rgba(99, 102, 241",
    "rgba(34, 211, 238": "rgba(6, 182, 212",
}

for f in files:
    if os.path.exists(f):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        
        new_content = content
        for old, new in reverse_replacements.items():
            new_content = re.sub(re.escape(old), new, new_content, flags=re.IGNORECASE)
            
        if new_content != content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Reverted colors in {f}")
    else:
        print(f"File not found: {f}")
