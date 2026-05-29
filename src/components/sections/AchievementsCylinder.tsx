"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const achievements = [
  "Secured 98% Customer Satisfaction",
  "Resolved 500+ Complex Issues",
  "Led Technical Resolution Team",
  "NSS Volunteer Leader",
  "Organized Health Camp",
  "Certified in Cyber Security basics",
  "Implemented New Logging System",
  "Top Performer Q3 2024",
];

export default function AchievementsCylinder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rotate the cylinder infinitely based on scroll
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(cylinderRef.current, {
      rotateX: -360,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });
  }, []);

  const radius = 300; // translateZ distance

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-[#050505] flex items-center justify-center overflow-hidden">
      
      <div className="absolute top-20 left-0 w-full text-center z-10 pointer-events-none">
        <h2 className="text-4xl font-mono text-[#7FA4D6] tracking-[0.5em] uppercase opacity-50">Achievements</h2>
      </div>

      <div className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center" style={{ perspective: '1000px' }}>
        
        <div 
          ref={cylinderRef} 
          className="relative w-full h-[100px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {achievements.map((text, i) => {
            // Calculate angle for each item to form a cylinder (rotating on X axis this time for a horizontal drum, or Y for vertical drum)
            // The prompt says "massive rotating cylinder, wraps around it, scroll rotates". 
            // A horizontal drum (rotateX) feels very cinematic when scrolling down.
            const angle = (360 / achievements.length) * i;
            
            return (
              <div 
                key={i}
                className="absolute w-full text-center backface-hidden"
                style={{
                  transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden',
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
