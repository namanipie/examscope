const fs = require('fs');

let content = fs.readFileSync('src/app/developers/page.tsx', 'utf8');

const newIDCard = \unction IDCard({ dev, index }: { dev: Developer; index: number }) {
  const [isTapped, setIsTapped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (max 10 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col items-center pb-8 perspective-[1000px]">
      {/* Lanyard Strap Assembly */}
      <div className="flex flex-col items-center z-20 relative translate-y-3">
        {/* The fabric strap */}
        <div className="w-6 h-12 bg-muted-foreground/20 rounded-t-sm border-x border-t border-border/30 shadow-inner" />
        {/* The metal clip */}
        <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-800 rounded-b-lg border border-border/50 shadow-md flex items-center justify-center">
          <div className="w-6 h-1 bg-gray-500/50 rounded-full" />
        </div>
      </div>

      {/* Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: \otateX(\deg) rotateY(\deg)\,
          transformStyle: "preserve-3d"
        }}
        className={\elative w-[340px] sm:w-[380px] h-fit rounded-[1.5rem] overflow-hidden shadow-2xl bg-card transition-transform duration-200 ease-out \\}
      >
        {/* Plastic Glare Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 dark:via-white/[0.02] dark:to-white/10 pointer-events-none z-50 mix-blend-overlay" />

        {/* Slotted Lanyard Hole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-background rounded-full border border-border/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] z-50" />

        {/* Botanical background pattern */}
        <CardBotanical />

        {/* Header: Logo + Number */}
        <div className="relative flex items-start justify-between px-6 pt-12 pb-2">
          <div className="flex items-center gap-2.5">
            <Leaf className="w-5 h-5 text-accent" />
            <div>
              <p className="text-[15px] font-bold text-foreground leading-none">MarkMint</p>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-muted-foreground mt-0.5">Access Badge</p>
            </div>
          </div>
          <span className="text-xl font-bold text-muted-foreground/30 mt-1">{dev.number}</span>
        </div>

        {/* Official Details Row */}
        <div className="px-6 flex gap-6 mt-1 mb-4">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground/70">Issue Date</p>
            <p className="text-[10px] font-mono font-medium">2026.09.15</p>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground/70">Clearance</p>
            <p className="text-[10px] font-mono font-medium text-accent">LEVEL 5</p>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-widest text-muted-foreground/70">Status</p>
            <p className="text-[10px] font-mono font-medium text-green-500">ACTIVE</p>
          </div>
        </div>

        {/* Photo + Skills */}
        <div className="relative flex items-start px-6 gap-5 mt-2">
          {/* Photo */}
          <div 
            className="relative w-[130px] h-[150px] sm:w-[150px] sm:h-[170px] flex-shrink-0 rounded-xl overflow-visible group cursor-pointer"
            onClick={() => setIsTapped(!isTapped)}
          >
            {/* Glow effect */}
            <div className={\bsolute inset-0 bg-accent/40 rounded-xl blur-xl transition-opacity duration-700 -z-10 \\} />
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-border/50 bg-background/50 shadow-inner relative z-10">
              <img
                src={dev.avatar}
                alt={dev.name}
                className={\w-full h-full object-cover transition-all duration-700 \\}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-col py-2">
            <div className="flex flex-col gap-2">
              {dev.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[11px] font-bold tracking-[0.14em] uppercase text-muted-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {/* Holographic authentic seal */}
            <div className="mt-auto pt-4">
              <div className="w-10 h-10 rounded-full border border-yellow-500/30 bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-600 opacity-80 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.2)] mix-blend-hard-light relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent w-[200%] animate-[spin_3s_linear_infinite]" />
                 <ShieldCheck className="w-5 h-5 text-yellow-900/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Name + Role */}
        <div className="relative px-6 pt-5 pb-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight tracking-tight">{dev.name}</h3>
          <p className="text-[15px] sm:text-base font-bold text-accent mt-1 uppercase tracking-wide">{dev.role}</p>
          <p className="text-xs text-muted-foreground mt-1 italic">{dev.status}</p>
        </div>

        {/* Social Icons */}
        <div className="relative flex items-center gap-6 px-6 pt-3 pb-5">
          <Link href={dev.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={\\ GitHub\}>
            <GithubIcon />
          </Link>
          <Link href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={\\ LinkedIn\}>
            <LinkedinIcon />
          </Link>
          <Link href={dev.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label={\\ Instagram\}>
            <InstagramIcon />
          </Link>
        </div>

        {/* Footer: Leaf & Barcode */}
        <div className="relative flex items-end justify-between px-6 py-4 border-t border-border/50 bg-muted/10">
          <div 
            className="cursor-pointer group flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-accent/10 transition-colors z-50"
            onClick={() => {
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
            }}
          >
            <img 
              src="/secret-leaf.png" 
              alt="Secret Leaf" 
              className="w-7 h-7 opacity-80 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95 transition-all duration-300 dark:brightness-110" 
            />
          </div>
          <div className="flex flex-col items-end gap-1">
            <RealisticBarcode />
            <span className="text-[10px] font-mono font-semibold tracking-widest text-muted-foreground/60">{dev.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}\;

const regex = /function IDCard\(\{ dev, index \}: \{ dev: Developer; index: number \}\) \{[\s\S]*?\n\}\n/m;

if (!regex.test(content)) {
    console.error("Regex did not match!");
    process.exit(1);
}

content = content.replace(regex, newIDCard + '\n');

// Import ShieldCheck if not imported
if (!content.includes('ShieldCheck')) {
    content = content.replace('import { Leaf } from "lucide-react";', 'import { Leaf, ShieldCheck } from "lucide-react";');
}

fs.writeFileSync('src/app/developers/page.tsx', content);
