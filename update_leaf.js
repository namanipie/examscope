const fs = require('fs');

let content = fs.readFileSync('src/app/developers/page.tsx', 'utf8');

// The replacement code
const newOnClick = \onClick={() => {
              const isHigh = document.documentElement.classList.contains('theme-high');
              
              // Clear any existing timer
              if (window.leafTimer) clearTimeout(window.leafTimer);

              if (isHigh) {
                // TURN OFF LOGIC (Smoke Clear + Cough)
                document.documentElement.classList.remove('theme-high');
                
                // Add smoke clearing blur animation to body
                document.body.classList.add('smoke-clearing');
                setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
                
                // Play coughing sound
                const cough = new Audio("/cough.mp3");
                cough.volume = 0.6;
                cough.play().catch(e => console.log("Audio blocked", e));
                
                toast("Too strong? Back to normal.", { icon: "?????" });
              } else {
                // TURN ON LOGIC (Snoop + Neon)
                document.documentElement.classList.add('theme-high');
                
                const audio = new Audio("/snoop.mp3");
                audio.volume = 0.8;
                audio.play().catch(e => console.log("Audio blocked", e));
                
                toast.success("High Mode Activated ??", { icon: "??" });
                
                // Auto-revert after 15 seconds
                window.leafTimer = setTimeout(() => {
                  if (document.documentElement.classList.contains('theme-high')) {
                    document.documentElement.classList.remove('theme-high');
                    document.body.classList.add('smoke-clearing');
                    setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
                    
                    const cough = new Audio("/cough.mp3");
                    cough.volume = 0.6;
                    cough.play().catch(e => {});
                    
                    toast("Too strong? Back to normal.", { icon: "?????" });
                  }
                }, 15000);
              }
            }}\;

const regex = /onClick=\{\(\) => \{[\s\S]*?toast\("Back to reality.", \{ icon: "??" \}\);\s*\}\s*\}\s*\}/;

if (!regex.test(content)) {
    console.error("Regex did not match!");
    process.exit(1);
}

content = content.replace(regex, newOnClick);

// Ensure typescript knows about window.leafTimer
if (!content.includes('declare global')) {
    content = content.replace('import { toast } from "sonner";', 'import { toast } from "sonner";\n\ndeclare global {\n  interface Window {\n    leafTimer?: any;\n  }\n}\n');
}

fs.writeFileSync('src/app/developers/page.tsx', content);
