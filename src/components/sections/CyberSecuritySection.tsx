"use client";

import { useRef, useEffect } from "react";
import { createParticleField } from "@/lib/createParticleField";

const certifications = [
  "AWS Cloud Internship - Data Pro",
  "MERN Stack Web Development",
  "Data Structure with Java",
];

export default function CyberSecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 120);

  useEffect(() => {
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
    <section
      id="certifications"
      ref={containerRef}
      className="relative py-40 px-6 bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden"
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

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#2C3E50] rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#1EA7E0] rounded-full blur-[150px] opacity-20 mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-center">
        <p className="text-sm font-mono text-[#1EA7E0] tracking-[0.45em] uppercase mb-6">
          Certifications and objective
        </p>
        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8 leading-tight">
          Learning with intent.
          <br />
          <span className="text-[#1EA7E0]">Building with purpose.</span>
        </h2>

        <div className="mt-12 inline-block bg-black/60 border border-[#1EA7E0]/30 backdrop-blur-md p-8 md:p-12 rounded-2xl text-left shadow-[0_0_30px_rgba(30,167,224,0.15)] relative overflow-hidden group max-w-3xl">
          <p className="text-[#1EA7E0] font-mono text-sm tracking-widest mb-4">CAREER OBJECTIVE</p>
          <p className="text-white/70 leading-relaxed max-w-2xl">
            To apply my IT expertise to help achieve business goals by optimizing workflows and enhancing skills, while actively seeking opportunities to grow both personally and professionally.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {certifications.map((item) => (
              <span
                key={item}
                className="px-4 py-1.5 border border-[#1EA7E0]/40 rounded-full text-xs font-mono text-[#1EA7E0]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
