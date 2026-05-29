"use client";

import { useRef, useEffect } from "react";
import { createParticleField } from "@/lib/createParticleField";

export default function CyberSecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 120);

  useEffect(() => {
    // Mouse parallax for star field
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX / innerWidth) * 20 - 10;
      const moveY = (e.clientY / innerHeight) * 20 - 10;
      starsRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

    return (
    <section id="journey" ref={containerRef} className="relative py-40 px-6 bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden">
        {/* Cosmic star field */}
        <div ref={starsRef} className="absolute inset-0 pointer-events-none">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
      


      {/* Cyber Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2C3E50] rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#1EA7E0] rounded-full blur-[150px] opacity-20 mix-blend-screen" />

      </div>

      <div className="relative z-10 max-w-4xl w-full text-center">
        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8 leading-tight">
          Understanding systems.<br/>
          <span className="text-[#1EA7E0]">Protecting experiences.</span>
        </h2>
        
        <div className="mt-16 inline-block bg-black/60 border border-[#1EA7E0]/30 backdrop-blur-md p-8 md:p-12 rounded-2xl text-left shadow-[0_0_30px_rgba(30,167,224,0.15)] relative overflow-hidden group">
          
          
          <p className="text-[#1EA7E0] font-mono text-sm tracking-widest mb-4">2025 • INTERNSHIP</p>
          <h3 className="text-3xl font-bold text-white mb-4">Cyber Security Internship</h3>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            Applying analytical problem-solving skills to protect digital assets. 
            Focusing on vulnerability assessment, network security principles, and proactive threat mitigation.
            Transitioning from resolving user issues to securing the systems they rely on.
          </p>
          
          <div className="mt-8 flex gap-4">
            <span className="px-4 py-1.5 border border-[#1EA7E0]/40 rounded-full text-xs font-mono text-[#1EA7E0]">THREAT ANALYSIS</span>
            <span className="px-4 py-1.5 border border-[#1EA7E0]/40 rounded-full text-xs font-mono text-[#1EA7E0]">NETWORK SECURITY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
