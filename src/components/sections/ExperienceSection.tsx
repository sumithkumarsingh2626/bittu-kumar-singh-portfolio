"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceSection() {
  const [hovered, setHovered] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      const size = Math.random() * 2 + 1;
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
    <section id="experience" className="relative py-40 px-6 bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden">
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
      {/* Background Holographic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7FA4D6] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div 
        layout
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative z-10 w-full max-w-3xl rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl p-8 md:p-12 cursor-pointer overflow-hidden transition-all duration-700 ${hovered ? 'shadow-[0_0_50px_rgba(127,164,214,0.3)]' : ''}`}
      >
        {/* Holographic Scanline Effect on Hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A7C7FF] to-transparent opacity-50 z-0"
            />
          )}
        </AnimatePresence>

        <motion.div layout className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <motion.p layout className="text-sm font-mono text-[#7FA4D6] mb-2 uppercase tracking-widest">Panel 01</motion.p>
            <motion.h3 layout className="text-4xl md:text-6xl font-serif italic text-white">Concentrix</motion.h3>
          </div>
          <div className="text-left md:text-right">
            <motion.p layout className="text-xl text-white font-medium">Email Advisor</motion.p>
            <motion.p layout className="text-white/50">2 Years</motion.p>
          </div>
        </motion.div>

        <AnimatePresence>
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="pt-8 overflow-hidden relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Responsibilities</h4>
                  <ul className="space-y-3 text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#A7C7FF] mt-1">✦</span>
                      Delivered exceptional customer experience through written communication.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#A7C7FF] mt-1">✦</span>
                      Resolved complex technical problems before they escalated.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#A7C7FF] mt-1">✦</span>
                      Maintained high satisfaction ratings and strict SLA compliance.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-white">Communication Metrics</h4>
                  <div className="space-y-6">
                    <MetricBar label="Resolution Rate" value={98} />
                    <MetricBar label="Customer Satisfaction" value={95} />
                    <MetricBar label="SLA Compliance" value={100} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function MetricBar({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-white/70">{label}</span>
        <span className="font-mono text-[#A7C7FF]">{value}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#7FA4D6] to-[#A7C7FF]"
        />
      </div>
    </div>
  );
}
