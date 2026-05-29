"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";

const skills = [
  { name: "Microsoft Excel", type: "tech", x: 10, y: 20, size: 100 },
  { name: "Communication", type: "soft", x: 70, y: 15, size: 120 },
  { name: "Problem Solving", type: "soft", x: 30, y: 60, size: 140 },
  { name: "Cyber Security", type: "tech", x: 80, y: 70, size: 130 },
  { name: "Leadership", type: "soft", x: 50, y: 35, size: 110 },
  { name: "Customer Resolution", type: "soft", x: 20, y: 85, size: 115 },
  { name: "English", type: "lang", x: 65, y: 50, size: 90 },
  { name: "Hindi", type: "lang", x: 85, y: 35, size: 80 },
  { name: "Telugu", type: "lang", x: 45, y: 80, size: 85 },
  { name: "Bhojpuri", type: "lang", x: 15, y: 45, size: 80 },
];

export default function SkillsGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  // generate star field data once
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      const size = Math.random() * 2 + 1; // 1-3px
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
    const handleMouseMove = (e: MouseEvent) => {
      if (!starsRef.current) return;
      const { innerWidth, innerHeight } = window;
      const moveX = (e.clientX / innerWidth) * 20 - 10; // -10 to 10
      const moveY = (e.clientY / innerHeight) * 20 - 10;
      starsRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="skills" className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center">
      {/* Cosmic star field background */}
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
        <h2 className="text-5xl font-serif italic text-white/20">Skill Galaxy</h2>
      </div>

      <div className="relative w-full max-w-6xl aspect-video md:aspect-square lg:aspect-video mx-auto">
        {skills.map((skill, i) => {
          const isHovered = hoveredSkill === skill.name;
          const isDimmed = hoveredSkill !== null && !isHovered;
          const floatY = [0, -15, 0, 15, 0];
          const floatX = [0, 10, 0, -10, 0];
          return (
            <motion.div
              key={skill.name}
              className="absolute cursor-pointer flex items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                width: skill.size,
                height: skill.size,
                backgroundColor: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: isHovered ? '1px solid rgba(167, 199, 255, 0.5)' : '1px solid rgba(255,255,255,0.1)',
                zIndex: isHovered ? 50 : 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                y: floatY,
                x: floatX,
                scale: isHovered ? 1.2 : isDimmed ? 0.8 : 1,
                opacity: isDimmed ? 0.3 : 1,
              }}
              transition={{
                y: { duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut" },
                x: { duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="text-center p-4">
                <p className={`font-mono text-xs mb-1 ${isHovered ? 'text-[#A7C7FF]' : 'text-white/40'}`}>
                  {skill.type.toUpperCase()}
                </p>
                <p className={`font-medium leading-tight ${isHovered ? 'text-white' : 'text-white/80'}`}>
                  {skill.name}
                </p>
              </div>
              {isHovered && (
                <motion.div
                  className="absolute inset-[-20%] rounded-full border border-dashed border-[#A7C7FF]/30 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
