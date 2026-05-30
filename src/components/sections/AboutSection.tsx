"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createParticleField } from "@/lib/createParticleField";

const quote = "I build practical web experiences with clarity and care.";
const objective =
  "To apply my IT expertise to help achieve business goals by optimizing workflows and enhancing skills, while actively growing both personally and professionally.";

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const particles = createParticleField(20, 20);

  useEffect(() => {
    if (!textRef.current || !subRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const words = textRef.current.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "center center",
        scrub: 1,
      },
    });

    tl.fromTo(
      words,
      { opacity: 0, y: 50, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.1, duration: 1, ease: "power2.out" }
    );

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "+=0.5"
    );
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-32 px-6 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Particle Background (CSS simulated for performance) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full z-10 text-center flex flex-col items-center gap-10">
        <h2 ref={textRef} className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
          {quote.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-3 md:mr-5 opacity-0">
              {word}
            </span>
          ))}
        </h2>

        <div
          ref={subRef}
          className="max-w-3xl flex flex-col items-center gap-6 text-sm md:text-base font-mono uppercase tracking-widest text-[#7FA4D6] opacity-0"
        >
          <p className="text-white/70 normal-case tracking-normal leading-relaxed max-w-2xl">
            {objective}
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[#7FA4D6]">
            <span>B.Sc Computer Science</span>
            <span className="hidden md:inline">|</span>
            <span>MERN Stack Developer</span>
            <span className="hidden md:inline">|</span>
            <span>AWS and Java Learner</span>
          </div>
        </div>
      </div>
    </section>
  );
}
