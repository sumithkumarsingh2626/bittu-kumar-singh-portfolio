"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const highlights = [
  "B.Sc Computer Science | CGPA 8.3",
  "Intermediate | CGPA 8.9",
  "AWS Cloud Internship",
  "MERN Stack Web Development",
  "Data Structure with Java",
  "Zerodha Clone",
  "MERN Video Call App",
  "GitHub: BittuSingh143",
];

export default function AchievementsCylinder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(cylinderRef.current, {
      rotateX: -360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const radius = 300;

  return (
    <section
      ref={containerRef}
      className="relative h-[160vh] bg-[#050505] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-20 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-4xl font-mono text-[#7FA4D6] tracking-[0.5em] uppercase opacity-50">
          Achievements
        </h2>
      </div>

      <div
        className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center px-6"
        style={{ perspective: "1000px" }}
      >
        <div
          ref={cylinderRef}
          className="relative w-full h-[100px] flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {highlights.map((text, i) => {
            const angle = (360 / highlights.length) * i;

            return (
              <div
                key={text}
                className="absolute w-full text-center backface-hidden"
                style={{
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <h3 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-white whitespace-nowrap opacity-80 mix-blend-screen">
                  {text}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
