"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createParticleField } from "@/lib/createParticleField";

const impacts = [
  { title: "Community Service", desc: "Dedicated hours to improving local infrastructure and support systems." },
  { title: "Health Awareness", desc: "Organized camps and drives to spread awareness about fundamental health practices." },
  { title: "Education Support", desc: "Mentored underprivileged students in basic computer literacy." },
  { title: "Environmental Initiatives", desc: "Led tree plantation and clean-up drives in the local community." }
];

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 160);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>('.impact-panel');
    if (panels.length === 0) return;

    const totalScrollDistance = (panels.length - 1) * window.innerWidth;

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + totalScrollDistance,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center">
      
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
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <h2 className="text-xl font-mono text-[#7FA4D6] uppercase tracking-[0.3em]">NSS Community Impact</h2>
      </div>

      <div className="flex h-full" style={{ width: `${impacts.length * 100}vw` }}>
        {impacts.map((item, i) => (
          <div key={i} className="impact-panel w-[100vw] h-full flex flex-col md:flex-row items-center justify-center p-10 md:p-20 relative">
            
            {/* Cinematic background image overlay simulation */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-black via-[#0A0A0A] to-[#101010]" />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="z-10 flex flex-col items-start max-w-2xl">
              <span className="text-8xl font-serif text-white/10 absolute -top-10 -left-10 select-none">
                0{i + 1}
              </span>
              <h3 className="text-5xl md:text-7xl font-serif italic text-white mb-6 leading-tight">
                {item.title}
              </h3>
              <p className="text-xl text-white/60 font-sans font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
