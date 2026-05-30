"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createParticleField } from "@/lib/createParticleField";

const projects = [
  {
    id: "01",
    title: "Zerodha Clone",
    type: "Full-Stack Trading UI",
    stack: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    summary:
      "A MERN clone that demonstrates scalable portfolio views, transaction history handling, and responsive market data presentation.",
    bullets: [
      "Built the interface with React, JavaScript, HTML, and CSS for intuitive navigation.",
      "Designed and managed MongoDB data for portfolios, transactions, and market activity.",
      "Focused on clean data flow and responsive layouts for practical usability.",
    ],
  },
  {
    id: "02",
    title: "MERN Stack Video Call App",
    type: "Real-Time Communication",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "WebRTC", "Socket.io"],
    summary:
      "A secure video conferencing platform with peer-to-peer streaming, signaling, chat, authentication, and screen sharing.",
    bullets: [
      "Implemented Socket.io signaling for fast call setup and live messaging.",
      "Integrated screen sharing and camera toggles through browser media streams.",
      "Built sign-up and login flows with a responsive React and CSS interface.",
    ],
  },
];

export default function ExperienceSection() {
  const [hovered, setHovered] = useState<string | null>(projects[0].id);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = createParticleField(120, 140);

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
      id="projects"
      className="relative min-h-screen py-40 px-6 bg-[#050505] overflow-hidden flex items-center justify-center"
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

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7FA4D6] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="mb-14 text-center md:text-left">
          <p className="text-sm font-mono text-[#7FA4D6] mb-3 uppercase tracking-[0.45em]">
            Featured Projects
          </p>
          <h2 className="text-5xl md:text-7xl font-serif italic text-white leading-tight">
            Built to show how I think, ship, and refine.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => {
            const isActive = hovered === project.id;

            return (
              <motion.article
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(projects[0].id)}
                className={`relative rounded-[2rem] border overflow-hidden p-8 md:p-10 backdrop-blur-xl transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "border-[#A7C7FF]/40 bg-white/10 shadow-[0_0_50px_rgba(127,164,214,0.3)]"
                    : "border-white/10 bg-black/40"
                }`}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ top: "-10%" }}
                      animate={{ top: "110%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A7C7FF] to-transparent opacity-50"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <p className="text-sm font-mono text-[#7FA4D6] mb-2 uppercase tracking-widest">
                        Project {project.id}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-serif italic text-white">
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-right max-w-[12rem]">
                      <p className="text-white font-medium">{project.type}</p>
                      <p className="text-white/50 text-sm">Hover to expand</p>
                    </div>
                  </div>

                  <div className="pt-6 flex-1 flex flex-col gap-6">
                    <p className="text-white/70 leading-relaxed max-w-xl">{project.summary}</p>

                    <div className="flex flex-wrap gap-3">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-white/80"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                          className="overflow-hidden pt-2"
                        >
                          <ul className="space-y-3 text-white/70">
                            {project.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-3">
                                <span className="text-[#A7C7FF] mt-1">■</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
