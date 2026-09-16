const fs = require('fs');

let content = fs.readFileSync('src/app/developers/page.tsx', 'utf8');

const leafComponent = \
function FloatingLeaf() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cough = new Audio("/cough.mp3");
      cough.preload = "auto";
      window.coughAudio = cough;
      
      const snoop = new Audio("/snoop.mp3");
      snoop.preload = "auto";
      window.snoopAudio = snoop;
    }
  }, []);

  const handleLeafClick = () => {
    const isHigh = document.documentElement.classList.contains('theme-high');
    if (window.leafTimer) clearTimeout(window.leafTimer);
    
    if (isHigh) {
      document.documentElement.classList.remove('theme-high');
      document.body.classList.add('smoke-clearing');
      
      if (window.coughAudio) {
        window.coughAudio.currentTime = 0;
        window.coughAudio.volume = 0.6;
        window.coughAudio.play().catch(e => console.log(e));
      } else {
        new Audio("/cough.mp3").play().catch(e => {});
      }
      toast("Too strong? Back to normal.", { icon: "?????" });
      
      setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
    } else {
      document.documentElement.classList.add('theme-high');
      
      if (window.snoopAudio) {
        window.snoopAudio.currentTime = 0;
        window.snoopAudio.volume = 0.8;
        window.snoopAudio.play().catch(e => console.log(e));
      } else {
        new Audio("/snoop.mp3").play().catch(e => {});
      }
      toast.success("High Mode Activated ??", { icon: "??" });
      
      window.leafTimer = setTimeout(() => {
        if (document.documentElement.classList.contains('theme-high')) {
          document.documentElement.classList.remove('theme-high');
          document.body.classList.add('smoke-clearing');
          
          if (window.coughAudio) {
            window.coughAudio.currentTime = 0;
            window.coughAudio.volume = 0.6;
            window.coughAudio.play().catch(e => {});
          }
          toast("Too strong? Back to normal.", { icon: "?????" });
          
          setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
        }
      }, 15000);
    }
  };

  return (
    <div className="floating-leaf-anim group" onClick={handleLeafClick}>
      <img 
        src="/secret-leaf.png" 
        alt="Secret Leaf" 
        className="w-10 h-10 opacity-60 hover:opacity-100 hover:scale-110 drop-shadow-lg transition-all duration-300 dark:brightness-110" 
      />
    </div>
  );
}

\;

content = content.replace('export default function DevelopersPage() {', leafComponent + 'export default function DevelopersPage() {');
content = content.replace('<div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent/20">', '<div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent/20">\\n      <FloatingLeaf />');

fs.writeFileSync('src/app/developers/page.tsx', content);
