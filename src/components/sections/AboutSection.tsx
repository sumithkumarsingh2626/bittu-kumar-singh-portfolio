"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const quote = "I solve problems before they become problems.";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !subRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      }
    });

    tl.fromTo(words, 
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "+=0.5"
    );

  }, []);

  return (
    <section id="about" ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-[#0A0A0A]">
      
      {/* Particle Background (CSS simulated for performance) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: (Math.random() * 3 + 2) + 's',
              animationDelay: (Math.random() * 2) + 's',
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full z-10 text-center flex flex-col items-center gap-12">
        <h2 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
          {quote.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-3 md:mr-5 opacity-0">
              {word}
            </span>
          ))}
        </h2>
        
        <div ref={subRef} className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base font-mono uppercase tracking-widest text-[#7FA4D6] opacity-0">
          <span>Computer Science Graduate</span>
          <span className="hidden md:inline">•</span>
          <span>Customer Experience Professional</span>
          <span className="hidden md:inline">•</span>
          <span>Cyber Security Enthusiast</span>
        </div>
      </div>
    </section>
  );
}
