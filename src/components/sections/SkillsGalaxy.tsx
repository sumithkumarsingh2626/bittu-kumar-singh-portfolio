"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { createParticleField } from "@/lib/createParticleField";

const skills = [
  { name: "JavaScript", type: "stack", x: 12, y: 18, size: 120 },
  { name: "React", type: "stack", x: 72, y: 14, size: 110 },
  { name: "Node.js", type: "stack", x: 32, y: 60, size: 120 },
  { name: "Express.js", type: "stack", x: 84, y: 70, size: 125 },
  { name: "MongoDB", type: "stack", x: 48, y: 38, size: 130 },
  { name: "HTML/CSS", type: "web", x: 18, y: 82, size: 110 },
  { name: "Java", type: "lang", x: 68, y: 52, size: 100 },
  { name: "English", type: "lang", x: 22, y: 52, size: 92 },
  { name: "Telugu", type: "lang", x: 80, y: 18, size: 90 },
  { name: "Hindi", type: "lang", x: 8, y: 74, size: 88 },
  { name: "AWS", type: "cloud", x: 86, y: 34, size: 95 },
  { name: "Docker", type: "tool", x: 45, y: 82, size: 100 },
  { name: "Git & GitHub", type: "tool", x: 15, y: 44, size: 100 },
  { name: "MS Excel", type: "tool", x: 62, y: 20, size: 95 },
  { name: "Bootstrap", type: "web", x: 78, y: 86, size: 105 },
  { name: "WebRTC", type: "stack", x: 88, y: 53, size: 95 },
  { name: "Socket.io", type: "stack", x: 30, y: 12, size: 90 },
];

type CursorPoint = { x: number; y: number } | null;

export default function SkillsGalaxy() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [cursor, setCursor] = useState<CursorPoint>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const stars = createParticleField(120, 180);

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

  const handleSectionMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursor({ x, y });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center"
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={() => {
        setCursor(null);
        setHoveredSkill(null);
      }}
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
        <h2 className="text-5xl font-serif italic text-white/20">Skill Galaxy</h2>
      </div>

      <div className="relative w-full max-w-6xl aspect-video md:aspect-square lg:aspect-video mx-auto">
        {skills.map((skill, i) => {
          const isHovered = hoveredSkill === skill.name;
          const isDimmed = hoveredSkill !== null && !isHovered;
          const floatY = [0, -15, 0, 15, 0];
          const floatX = [0, 10, 0, -10, 0];

          const repel = getRepelOffset(skill.x, skill.y, cursor);

          return (
            <motion.div
              key={skill.name}
              className="absolute flex items-center justify-center"
              style={{
                left: `${skill.x}%`,
                top: `${skill.y}%`,
                width: skill.size,
                height: skill.size,
                zIndex: isHovered ? 50 : 10,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              animate={{
                x: repel.x,
                y: repel.y,
                scale: isHovered ? 1.12 : isDimmed ? 0.85 : 1,
                opacity: isDimmed ? 0.3 : 1,
              }}
              transition={{
                x: { type: "spring", stiffness: 160, damping: 16 },
                y: { type: "spring", stiffness: 160, damping: 16 },
                scale: { duration: 0.25 },
                opacity: { duration: 0.25 },
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                className="relative cursor-pointer flex items-center justify-center rounded-full backdrop-blur-md transition-colors duration-300 w-full h-full"
                style={{
                  backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)",
                  border: isHovered ? "1px solid rgba(167, 199, 255, 0.5)" : "1px solid rgba(255,255,255,0.1)",
                }}
                animate={{
                  y: floatY,
                  x: floatX,
                }}
                transition={{
                  y: { duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <div className="text-center p-4">
                  <p className={`font-mono text-xs mb-1 ${isHovered ? "text-[#A7C7FF]" : "text-white/40"}`}>
                    {skill.type.toUpperCase()}
                  </p>
                  <p className={`font-medium leading-tight ${isHovered ? "text-white" : "text-white/80"}`}>
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function getRepelOffset(x: number, y: number, cursor: CursorPoint) {
  if (!cursor) return { x: 0, y: 0 };

  const dx = x - cursor.x;
  const dy = y - cursor.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const threshold = 18;

  if (distance >= threshold || distance === 0) {
    return { x: 0, y: 0 };
  }

  const strength = (threshold - distance) / threshold;
  const push = strength * 22;
  const nx = dx / distance;
  const ny = dy / distance;

  return {
    x: nx * push,
    y: ny * push,
  };
}
