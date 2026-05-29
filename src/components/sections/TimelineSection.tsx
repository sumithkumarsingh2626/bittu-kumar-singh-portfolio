"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const nodes = [
  { year: "2020", title: "Education" },
  { year: "2023", title: "B.Sc Computer Science" },
  { year: "2024", title: "Concentrix" },
  { year: "2025", title: "Cyber Security Internship" },
  { year: "2026", title: "Future Technology Professional" },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      const size = Math.random() * 2 + 1;
      arr.push({
        id: i,
        size,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    // Animate glowing line height
    tl.to(lineRef.current, { height: "100%", ease: "none" }, 0);

    // Animate nodes as line passes them
    nodesRef.current.forEach((node, index) => {
      if (!node) return;
      const progress = index / (nodes.length - 1);
      
      tl.to(node, {
        color: "#FFFFFF",
        textShadow: "0 0 20px rgba(167,199,255,0.8)",
        duration: 0.1
      }, progress);
      
      const texts = node.querySelectorAll('.timeline-text');
      tl.to(texts, {
        y: "0%",
        duration: 0.1
      }, progress);
      
      // Node dot illumination
      const dot = node.querySelector('.timeline-dot');
      tl.to(dot, {
        backgroundColor: "#A7C7FF",
        boxShadow: "0 0 20px 5px rgba(167,199,255,0.5)",
        scale: 1.2,
        duration: 0.1
      }, progress);
    });

  }, []);

  // Mouse parallax for star field
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX / innerWidth) * 20 - 10;
      const moveY = (e.clientY / innerHeight) * 20 - 10;
      starsRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="journey" ref={containerRef} className="relative py-40 px-6 bg-[#050505] overflow-hidden">
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
      <div className="max-w-3xl mx-auto relative flex flex-col items-center">
        
        {/* The background track line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/10" />
        
        {/* The glowing energy line */}
        <div 
          ref={lineRef}
          className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#7FA4D6] to-[#A7C7FF] h-0 shadow-[0_0_15px_#7FA4D6]"
        />

        <div className="w-full flex flex-col gap-32">
          {nodes.map((node, i) => (
            <div 
              key={node.year} 
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              className={`relative flex items-center w-full text-white/40 transition-colors ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              {/* Dot */}
              <div className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white/20 bg-black z-10 transition-all duration-300" />
              
              <div className={`w-1/2 ${i % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <div className="overflow-hidden mb-2 py-1">
                  <h3 className="timeline-text text-4xl md:text-5xl font-serif italic translate-y-full">{node.year}</h3>
                </div>
                <div className="overflow-hidden py-1">
                  <p className="timeline-text text-sm md:text-base font-mono uppercase tracking-widest translate-y-full">{node.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
