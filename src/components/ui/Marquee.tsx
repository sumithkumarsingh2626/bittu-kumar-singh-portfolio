"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const text = "PROBLEM SOLVER • COMMUNICATOR • LEARNER • BUILDER • ";
  
  return (
    <footer className="relative z-50 w-full bg-[#050505] overflow-hidden py-6 border-t border-white/10">
      <div className="relative flex whitespace-nowrap">
        <motion.div 
          className="flex whitespace-nowrap text-[#7FA4D6] font-mono text-xl tracking-[0.2em]"
          animate={{ x: [0, -1035] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {/* Repeat text multiple times to ensure continuous flow */}
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </motion.div>
      </div>
    </footer>
  );
}
