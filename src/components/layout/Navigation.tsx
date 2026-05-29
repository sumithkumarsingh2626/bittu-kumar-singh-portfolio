"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const links = [
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState("");

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 4 }} // Wait for intro loader
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div 
        className="flex items-center gap-1 p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-[30px] shadow-2xl relative"
      >
        {links.map((link) => (
          <MagneticButton key={link.name}>
            <Link 
              href={link.href}
              onMouseEnter={() => setHovered(link.name)}
              onMouseLeave={() => setHovered("")}
              onClick={() => setActive(link.name)}
              className="relative px-5 py-2 text-sm font-medium transition-colors"
            >
              <span className={`relative z-10 ${active === link.name || hovered === link.name ? 'text-white' : 'text-white/50'}`}>
                {link.name}
              </span>
              
              {hovered === link.name && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/10 blur-[2px]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {active === link.name && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/20 border border-white/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          </MagneticButton>
        ))}
      </div>
    </motion.nav>
  );
}

function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="relative rounded-full"
    >
      {children}
    </motion.div>
  );
}
