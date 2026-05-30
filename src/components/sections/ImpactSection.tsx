"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createParticleField } from "@/lib/createParticleField";

const panels = [
  { title: "MERN Stack", desc: "Building full-stack web apps with React, Node.js, Express.js, and MongoDB." },
  { title: "AWS Cloud", desc: "Learning cloud fundamentals through the AWS Cloud Internship from Data Pro." },
  { title: "Java + DSA", desc: "Strengthening problem-solving with Data Structure with Java." },
  { title: "Real-time Apps", desc: "Working on interactive apps like the MERN video call platform with WebRTC." },
];

export default function ImpactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 160);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const panelsEls = gsap.utils.toArray<HTMLElement>(".impact-panel");
    if (panelsEls.length === 0) return;

    const totalScrollDistance = (panelsEls.length - 1) * window.innerWidth;

    gsap.to(panelsEls, {
      xPercent: -100 * (panelsEls.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panelsEls.length - 1),
        end: () => "+=" + totalScrollDistance,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

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
    <section
      id="links"
      ref={containerRef}
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center"
    >
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
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
        <h2 className="text-xl font-mono text-[#7FA4D6] uppercase tracking-[0.3em]">Core Focus</h2>
      </div>

      <div className="flex h-full" style={{ width: `${panels.length * 100}vw` }}>
        {panels.map((item, i) => (
          <div
            key={i}
            className="impact-panel w-[100vw] h-full flex flex-col md:flex-row items-center justify-center p-10 md:p-20 relative"
          >
            <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-black via-[#0A0A0A] to-[#101010]" />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="z-10 flex flex-col items-start max-w-2xl">
              <span className="text-8xl font-serif text-white/10 absolute -top-10 -left-10 select-none">
                0{i + 1}
              </span>
              <h3 className="text-5xl md:text-7xl font-serif italic text-white mb-6 leading-tight">
                {item.title}
              </h3>
              <p className="text-xl text-white/60 font-sans font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
