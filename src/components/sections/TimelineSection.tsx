"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createParticleField } from "@/lib/createParticleField";

const milestones = [
  { label: "MPC Intermediate", detail: "Sri Chaitanya Junior College, Visakhapatnam | CGPA 8.9" },
  { label: "B.Sc Computer Science", detail: "Aditya Degree College, Visakhapatnam | CGPA 8.3" },
  { label: "AWS Cloud Internship", detail: "Data Pro" },
  { label: "MERN Stack Web Development", detail: "Certification" },
  { label: "Data Structure with Java", detail: "Certification" },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 200);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.to(lineRef.current, { height: "100%", ease: "none" }, 0);

    nodesRef.current.forEach((node, index) => {
      if (!node) return;
      const progress = index / (milestones.length - 1);

      tl.to(
        node,
        {
          color: "#FFFFFF",
          textShadow: "0 0 20px rgba(167,199,255,0.8)",
          duration: 0.1,
        },
        progress
      );

      const texts = node.querySelectorAll(".timeline-text");
      tl.to(
        texts,
        {
          y: "0%",
          duration: 0.1,
        },
        progress
      );

      const dot = node.querySelector(".timeline-dot");
      tl.to(
        dot,
        {
          backgroundColor: "#A7C7FF",
          boxShadow: "0 0 20px 5px rgba(167,199,255,0.5)",
          scale: 1.2,
          duration: 0.1,
        },
        progress
      );
    });
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
      id="education"
      ref={containerRef}
      className="relative py-40 px-6 bg-[#050505] overflow-hidden"
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

      <div className="max-w-3xl mx-auto relative flex flex-col items-center">
        <div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 text-xs md:text-sm font-mono tracking-[0.45em] uppercase text-[#7FA4D6]/70">
          Education
        </div>

        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-white/10" />
        <div
          ref={lineRef}
          className="absolute top-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#7FA4D6] to-[#A7C7FF] h-0 shadow-[0_0_15px_#7FA4D6]"
        />

        <div className="w-full flex flex-col gap-32 pt-24">
          {milestones.map((node, i) => (
            <div
              key={node.label}
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              className={`relative flex items-center w-full text-white/40 transition-colors ${
                i % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div className="timeline-dot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white/20 bg-black z-10 transition-all duration-300" />

              <div className={`w-1/2 ${i % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                <div className="overflow-hidden mb-2 py-1">
                  <h3 className="timeline-text text-4xl md:text-5xl font-serif italic translate-y-full">
                    {node.label}
                  </h3>
                </div>
                <div className="overflow-hidden py-1">
                  <p className="timeline-text text-sm md:text-base font-mono uppercase tracking-widest translate-y-full">
                    {node.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
