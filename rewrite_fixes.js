const fs = require('fs');

let content = fs.readFileSync('src/app/developers/page.tsx', 'utf8');

// Fix 1: Add todayDate to IDCard
content = content.replace('  const [isTapped, setIsTapped] = useState(false);', '  const [isTapped, setIsTapped] = useState(false);\n  const todayDate = new Date().toISOString().split(\\'T\\')[0].replace(/-/g, \\'.\\');');
content = content.replace('<p className="text-[10px] font-mono font-medium">2026.09.15</p>', '<p className="text-[10px] font-mono font-medium">{todayDate}</p>');

// Fix 2: Move cough up out of the setTimeout
const oldOnClick = \            onClick={() => {
              const isHigh = document.documentElement.classList.contains('theme-high');
              if (window.leafTimer) clearTimeout(window.leafTimer);
              if (isHigh) {
                document.documentElement.classList.remove('theme-high');
                document.body.classList.add('smoke-clearing');
                setTimeout(() => {
                  document.body.classList.remove('smoke-clearing');
                  const cough = new Audio("/cough.mp3");
                  cough.volume = 0.6;
                  cough.play().catch(e => console.log("Audio blocked", e));
                  toast("Too strong? Back to normal.", { icon: "?????" });
                }, 2000);
              } else {
                document.documentElement.classList.add('theme-high');
                const audio = new Audio("/snoop.mp3");
                audio.volume = 0.8;
                audio.play().catch(e => console.log("Audio play blocked", e));
                toast.success("High Mode Activated ??", { icon: "??" });
                window.leafTimer = setTimeout(() => {
                  if (document.documentElement.classList.contains('theme-high')) {
                    document.documentElement.classList.remove('theme-high');
                    document.body.classList.add('smoke-clearing');
                    setTimeout(() => {
                      document.body.classList.remove('smoke-clearing');
                      const cough = new Audio("/cough.mp3");
                      cough.volume = 0.6;
                      cough.play().catch(e => {});
                      toast("Too strong? Back to normal.", { icon: "?????" });
                    }, 2000);
                  }
                }, 15000);
              }
            }}\;

const newOnClick = \            onClick={() => {
              const isHigh = document.documentElement.classList.contains('theme-high');
              if (window.leafTimer) clearTimeout(window.leafTimer);
              if (isHigh) {
                // TURN OFF LOGIC
                document.documentElement.classList.remove('theme-high');
                document.body.classList.add('smoke-clearing');
                
                // Play cough immediately so it's not late and scary
                const cough = new Audio("/cough.mp3");
                cough.volume = 0.6;
                cough.play().catch(e => console.log("Audio blocked", e));
                toast("Too strong? Back to normal.", { icon: "?????" });
                
                setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
              } else {
                // TURN ON LOGIC
                document.documentElement.classList.add('theme-high');
                const audio = new Audio("/snoop.mp3");
                audio.volume = 0.8;
                audio.play().catch(e => console.log("Audio play blocked", e));
                toast.success("High Mode Activated ??", { icon: "??" });
                
                window.leafTimer = setTimeout(() => {
                  if (document.documentElement.classList.contains('theme-high')) {
                    document.documentElement.classList.remove('theme-high');
                    document.body.classList.add('smoke-clearing');
                    
                    const cough = new Audio("/cough.mp3");
                    cough.volume = 0.6;
                    cough.play().catch(e => {});
                    toast("Too strong? Back to normal.", { icon: "?????" });
                    
                    setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
                  }
                }, 15000);
              }
            }}\;

content = content.replace(oldOnClick, newOnClick);

fs.writeFileSync('src/app/developers/page.tsx', content);
