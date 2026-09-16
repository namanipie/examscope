const fs = require('fs');

const content = \"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

type Stage = "NORMAL" | "ASTEROID" | "DESTRUCTION" | "BEAM" | "VOID" | "RESOLVED";

export default function NotFound() {
  const [stage, setStage] = useState<Stage>("NORMAL");

  useEffect(() => {
    // 1. Wait a bit, then drop asteroid
    const t1 = setTimeout(() => setStage("ASTEROID"), 1500);
    // 2. Asteroid hits -> boom, elements fly apart
    const t2 = setTimeout(() => setStage("DESTRUCTION"), 2500);
    // 3. High beam flash
    const t3 = setTimeout(() => setStage("BEAM"), 4500);
    // 4. Fade to Void
    const t4 = setTimeout(() => setStage("VOID"), 6000);
    // 5. Show 404 and Home
    const t5 = setTimeout(() => setStage("RESOLVED"), 8500);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-background font-sans">
      
      {/* Styles for the animations */}
      <style jsx>{\
        @keyframes asteroidFall {
          0% { transform: translate(50vw, -50vh) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translate(0, 0) scale(4) rotate(-45deg); opacity: 1; }
        }
        .animate-asteroid {
          animation: asteroidFall 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-15px, -15px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translate(15px, 15px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 1.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .stars-bg {
          background: #000 url('data:image/svg+xml;utf8,<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="1" fill="white"/><circle cx="150" cy="50" r="1.5" fill="white"/><circle cx="80" cy="120" r="1" fill="white"/><circle cx="180" cy="180" r="0.5" fill="white"/></svg>') repeat;
          animation: drift 100s linear infinite;
        }
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: -1000px 1000px; }
        }
        @keyframes floatSpace {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
          50% { transform: translate(-50%, -50%) translateY(-20px) rotate(10deg); }
        }
        .animate-float-space {
          animation: floatSpace 6s ease-in-out infinite;
        }
      \}</style>

      {/* --- LAYER 1: The Mock Site (Gets Destroyed) --- */}
      <div 
        className={\bsolute inset-0 transition-opacity duration-1000 \ \\}
      >
        <div className="flex flex-col h-full opacity-80 pointer-events-none">
          {/* Fake Navbar */}
          <div className={\w-full h-16 border-b border-border/50 flex items-center px-6 gap-6 transition-all duration-1000 ease-out \\}>
            <div className="font-bold text-xl tracking-tight">MarkMint</div>
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="h-4 w-16 bg-muted rounded"></div>
          </div>
          
          {/* Fake Dashboard Content */}
          <div className="flex-1 p-8 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">
            {/* Sidebar */}
            <div className={\w-full md:w-64 space-y-4 transition-all duration-1000 delay-100 ease-out \\}>
              <h3 className="font-bold text-lg text-muted-foreground mb-6">Department</h3>
              <div className="p-4 bg-card border rounded-lg font-bold text-accent shadow-sm">Computer Science & Eng.</div>
              <div className="p-4 bg-muted/30 border border-transparent rounded-lg text-muted-foreground">Electrical Eng.</div>
              <div className="p-4 bg-muted/30 border border-transparent rounded-lg text-muted-foreground">Mechanical Eng.</div>
            </div>
            
            {/* Main Area */}
            <div className="flex-1 space-y-6">
              <h1 className={\	ext-3xl font-bold transition-all duration-1000 delay-75 ease-out \\}>Current Courses</h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={\p-6 bg-card border rounded-xl shadow-sm transition-all duration-1000 delay-150 ease-out \\}>
                  <div className="h-3 w-12 bg-accent/20 rounded mb-2"></div>
                  <h2 className="font-bold text-xl mb-2">Data Structures</h2>
                  <p className="text-sm text-muted-foreground">3 Credits • Prof. Sharma</p>
                </div>
                
                <div className={\p-6 bg-card border rounded-xl shadow-sm transition-all duration-1000 delay-200 ease-out \\}>
                  <div className="h-3 w-12 bg-accent/20 rounded mb-2"></div>
                  <h2 className="font-bold text-xl mb-2">Operating Systems</h2>
                  <p className="text-sm text-muted-foreground">4 Credits • Prof. Verma</p>
                </div>

                <div className={\p-6 bg-card border rounded-xl shadow-sm transition-all duration-1000 delay-300 ease-out \\}>
                  <div className="h-3 w-12 bg-accent/20 rounded mb-2"></div>
                  <h2 className="font-bold text-xl mb-2">Machine Learning</h2>
                  <p className="text-sm text-muted-foreground">3 Credits • Prof. Singh</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LAYER 2: The Asteroid --- */}
      {(stage === "ASTEROID" || stage === "DESTRUCTION") && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none animate-asteroid">
          <span className="text-9xl drop-shadow-[0_0_50px_rgba(239,68,68,1)] filter">??</span>
        </div>
      )}

      {/* --- LAYER 3: The High Beam --- */}
      <div 
        className={\bsolute inset-0 bg-white z-[60] pointer-events-none transition-opacity duration-[1500ms] \\} 
      />

      {/* --- LAYER 4: The Void & Leaf --- */}
      <div 
        className={\bsolute inset-0 z-[70] stars-bg transition-opacity duration-1000 flex flex-col items-center justify-center \\}
      >
        {/* Floating Leaf */}
        <div className={\bsolute top-1/2 left-1/2 animate-float-space transition-all duration-1000 \\}>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[50px] opacity-20"></div>
            <img src="/secret-leaf.png" alt="Lost Leaf" className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] opacity-80 brightness-110 object-contain" />
          </div>
        </div>

        {/* 404 Text & Home Button */}
        <div className={\bsolute top-1/2 left-1/2 -translate-x-1/2 translate-y-10 flex flex-col items-center text-center transition-all duration-[2000ms] ease-out \\}>
          <h1 className="text-7xl sm:text-9xl font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">404</h1>
          <p className="text-xl sm:text-2xl text-gray-400 font-light mb-12 tracking-wide">The site was destroyed.</p>
          
          <Link 
            href="/"
            className="group relative flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-bold transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Home className="w-5 h-5 relative z-10" />
            <span className="relative z-10 tracking-wide">Return to Safety</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
\;

fs.writeFileSync('src/app/not-found.tsx', content);
