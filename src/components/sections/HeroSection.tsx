"use client";

import { useRef, useState, useEffect } from "react";


import Scene from "@/components/3d/Scene";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Ambient spotlight motion (already present)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  // Background pull effect state
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=200%",
      pin: canvasContainerRef.current,
      scrub: 1,
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);

      if (isDragging) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Reset offset with a smooth transition
      setOffset({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, isDragging]);

  // Compute filter based on drag offset
  const filterStyle = isDragging
    ? `hue-rotate(${offset.x * 0.05}deg) saturate(${1 + Math.abs(offset.y) / 300})`
    : "";

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] w-full"
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ filter: filterStyle, transition: isDragging ? "none" : "filter 0.5s ease-out" }}
    >
      <div
        ref={canvasContainerRef}
        className="absolute top-0 left-0 w-full h-[100vh] overflow-hidden"
      >
        {/* Ambient Mouse Tracking Spotlight */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-[#7FA4D6] rounded-full blur-[150px] opacity-10 mix-blend-screen pointer-events-none"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        />

        <Scene />

        {/* Subtle foreground noise overlay to blend with 3D */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220%200%20200%20200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-70 pointer-events-none">
        <p className="text-xs md:text-sm font-mono tracking-widest uppercase mb-4 text-white text-center">
          Scroll down to explore the resume
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
        />
      </div>
    </section>
  );
}
