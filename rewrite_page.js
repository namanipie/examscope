const fs = require('fs');
let content = fs.readFileSync('src/app/developers/page.tsx', 'utf8');

// 1. Remove Holographic Seal
content = content.replace(/\{\/\* Holographic authentic seal \*\/\}[\\s\\S]*?<\/div>\s*<\/div>\s*<\/div>/, '</div>\n        </div>');

// 2. Remove Slotted Lanyard Hole
content = content.replace(/\{\/\* Slotted Lanyard Hole \*\/\}[\\s\\S]*?z-50" \/>/, '');

// 3. Clean up Lanyard Strap
const oldLanyard = \      {/* Lanyard Strap Assembly */}
      <div className="flex flex-col items-center z-20 relative translate-y-3">
        {/* The fabric strap */}
        <div className="w-6 h-12 bg-muted-foreground/20 rounded-t-sm border-x border-t border-border/30 shadow-inner" />
        {/* The metal clip */}
        <div className="w-10 h-6 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-800 rounded-b-lg border border-border/50 shadow-md flex items-center justify-center">
          <div className="w-6 h-1 bg-gray-500/50 rounded-full" />
        </div>
      </div>\;
const newLanyard = \      {/* Lanyard Strap */}
      <div className="flex flex-col items-center z-10 relative">
        <div className="w-8 h-6 bg-muted rounded-t-md border-x border-t border-border/50" />
        <div className="w-12 h-5 bg-card rounded-b-[10px] border border-border/50 -mt-[1px]" />
      </div>\;
content = content.replace(oldLanyard, newLanyard);

// 4. Remove dev.id under barcode
content = content.replace(/<span className="text-\[10px\] font-mono font-semibold tracking-widest text-muted-foreground\/60">\{dev\.id\}<\/span>/, '');

// 5. Remove Leaf from footer and extract its click handler
const footerRegex = /\{\/\* Footer: Leaf & Barcode \*\/\}[\\s\\S]*?<div className="flex flex-col items-end gap-1">/;
const newFooter = \{/* Footer: Barcode */}
        <div className="relative flex justify-end px-6 py-4 border-t border-border/50 bg-muted/10">
          <div className="flex flex-col items-end gap-1">\;
content = content.replace(footerRegex, newFooter);

// 6. Preload Audio & Add Floating Leaf
const topImports = \import { useState, useEffect, useRef } from "react";\;
content = content.replace('import { useState } from "react";', topImports);

const floatingLeafComponent = \
function FloatingLeaf() {
  const leafRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Preload audio to eliminate any delay
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
      }
      toast("Too strong? Back to normal.", { icon: "?????" });
      
      setTimeout(() => document.body.classList.remove('smoke-clearing'), 2000);
    } else {
      document.documentElement.classList.add('theme-high');
      
      if (window.snoopAudio) {
        window.snoopAudio.currentTime = 0;
        window.snoopAudio.volume = 0.8;
        window.snoopAudio.play().catch(e => console.log(e));
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
    <div 
      className="floating-leaf-container group"
      onClick={handleLeafClick}
    >
      <img 
        src="/secret-leaf.png" 
        alt="Secret Leaf" 
        className="w-12 h-12 opacity-70 group-hover:opacity-100 group-hover:scale-110 drop-shadow-2xl transition-all duration-300" 
      />
    </div>
  );
}
\;

// Add FloatingLeaf to the global declarations block
content = content.replace('leafTimer?: any;', 'leafTimer?: any;\\n    coughAudio?: HTMLAudioElement;\\n    snoopAudio?: HTMLAudioElement;');

// Insert the component before DevelopersPage
content = content.replace('export default function DevelopersPage() {', floatingLeafComponent + '\\nexport default function DevelopersPage() {');

// Insert it into the layout
content = content.replace('<div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent/20">', '<div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-accent/20">\\n      <FloatingLeaf />');

fs.writeFileSync('src/app/developers/page.tsx', content);
