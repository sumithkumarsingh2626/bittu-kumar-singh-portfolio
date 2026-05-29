// ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Link as LinkIcon, Phone } from "lucide-react";

export default function ContactSection() {
  // Ref for star field container to apply subtle cursor‑parallax
  const starsRef = useRef<HTMLDivElement>(null);

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
    <section id="contact" className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Animated Star Field Background */}
      <div ref={starsRef} className="absolute inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 1.5 + 1 + "px",
              height: Math.random() * 1.5 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: Math.random() * 4 + 3 + "s",
              animationDelay: Math.random() * 5 + "s",
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 text-center">
        {/* Quote Section */}
        <div className="mb-32">
          <div className="overflow-hidden pb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-white/80 leading-tight"
            >
              "The strongest systems
            </motion.h2>
          </div>
          <div className="overflow-hidden pb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-white/80 leading-tight"
            >
              are built around people."
            </motion.h2>
          </div>
        </div>

        <div className="overflow-hidden mb-16 pb-2">
          <motion.h3
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-white uppercase"
          >
            Let's build something together
          </motion.h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <MagneticContactCard
            icon={<Mail className="w-8 h-8" />}
            label="Email"
            value="bittukumarsingh200214@gmail.com"
            href="mailto:bittukumarsingh200214@gmail.com"
          />
          <MagneticContactCard
            icon={<LinkIcon className="w-8 h-8" />}
            label="LinkedIn"
            value="linkedin.com/in/bittu-kumar-singh-"
            href="https://www.linkedin.com/in/bittu-kumar-singh-"
          />
          <MagneticContactCard
            icon={<Phone className="w-8 h-8" />}
            label="Phone"
            value="+91 8106616728"
            href="tel:+918106616728"
          />
        </div>
      </div>
    </section>
  );
}

function MagneticContactCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleClick = () => {
    if (href.startsWith("http")) {
      window.open(href, "_blank");
    } else {
      window.location.href = href;
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={handleClick}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: isHovered ? position.y * -0.5 : 0,
        rotateY: isHovered ? position.x * 0.5 : 0,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative w-full md:w-72 p-8 rounded-3xl border transition-colors duration-300 backdrop-blur-md flex flex-col items-center gap-4 cursor-pointer transform-gpu ${isHovered ? 'bg-white/10 border-[#A7C7FF]/50 shadow-[0_0_40px_rgba(167,199,255,0.2)]' : 'bg-black/40 border-white/10'}`}
      style={{ perspective: 1000 }}
    >
      <div className={`p-4 rounded-full ${isHovered ? 'bg-[#7FA4D6] text-black' : 'bg-white/5 text-white'}`}>{icon}</div>
      <div className="text-center">
        <p className="sr-only" aria-label={label}>{label}</p>
        <p className="sr-only" aria-label={value}>{value}</p>
      </div>
    </motion.div>
  );
}
