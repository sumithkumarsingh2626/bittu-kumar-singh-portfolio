"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const FULL_NAME = "BITTU KUMAR SINGH";
const SUBTITLE = "MERN STACK PORTFOLIO";
const TOTAL_DURATION = 5200;

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const linesLeftRef = useRef<HTMLDivElement>(null);
  const linesRightRef = useRef<HTMLDivElement>(null);
  const topDoorRef = useRef<HTMLDivElement>(null);
  const bottomDoorRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const cornerTLRef = useRef<HTMLDivElement>(null);
  const cornerBRRef = useRef<HTMLDivElement>(null);
  const uiLayerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // ── Letter Decode Effect ──
  const startLetterDecode = useCallback(() => {
    if (!nameRef.current) return;
    const spans = nameRef.current.querySelectorAll<HTMLSpanElement>(".char");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    spans.forEach((span, i) => {
      const target = span.dataset.char || "";
      if (target === " ") {
        span.textContent = "\u00A0";
        span.style.opacity = "1";
        return;
      }

      const delay = i * 80;
      const scrambleDuration = 1200 + Math.random() * 600;
      let startTime = 0;

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
        startTime = performance.now();

        const scramble = (now: number) => {
          const elapsed = now - startTime;
          const p = Math.min(elapsed / scrambleDuration, 1);

          if (p < 1) {
            if (Math.random() > p * 0.7) {
              span.textContent = chars[Math.floor(Math.random() * chars.length)];
              const cyan = Math.floor((1 - p) * 200);
              span.style.color = `rgb(${180 + cyan * 0.3}, ${220 + cyan * 0.15}, 255)`;
            } else {
              span.textContent = target;
              span.style.color = "";
            }
            requestAnimationFrame(scramble);
          } else {
            span.textContent = target;
            span.style.color = "";
            span.style.textShadow = "0 0 20px rgba(30,167,224,0.9)";
            setTimeout(() => {
              span.style.textShadow = "";
            }, 200);
          }
        };
        requestAnimationFrame(scramble);
      }, delay);
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ═══ PHASE 0 — BOOT SEQUENCE (0 – 0.8s) ═══
      tl.fromTo(scanLineRef.current,
        { top: "-2px", opacity: 0 },
        { top: "100%", opacity: 1, duration: 0.8, ease: "power1.inOut" },
        0
      );
      tl.fromTo(gridRef.current,
        { opacity: 0 },
        { opacity: 0.04, duration: 0.6, ease: "power2.out" },
        0.2
      );
      tl.fromTo([cornerTLRef.current, cornerBRRef.current],
        { opacity: 0, scale: 1.3 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.1 },
        0.3
      );

      // ═══ PHASE 1 — LETTER DECODE (0.8s – 2.8s) ═══
      tl.call(() => startLetterDecode(), [], 0.8);

      tl.fromTo(linesLeftRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        1.0
      );
      tl.fromTo(linesRightRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        1.0
      );

      // ═══ PHASE 2 — SUBTITLE & GLOW (2.8s – 4.0s) ═══
      tl.fromTo(subtitleRef.current,
        { opacity: 0, letterSpacing: "0.8em", y: 8 },
        { opacity: 1, letterSpacing: "0.5em", y: 0, duration: 0.8, ease: "power2.out" },
        2.8
      );
      tl.to(nameRef.current, {
        textShadow: "0 0 40px rgba(30,167,224,0.6), 0 0 80px rgba(30,167,224,0.3), 0 0 120px rgba(30,167,224,0.1)",
        duration: 0.6,
        ease: "power2.out",
      }, 3.0);

      // ═══ PHASE 3 — BLAST DOOR REVEAL (4.0s – 5.2s) ═══
      // Flash
      tl.to(flashRef.current, {
        opacity: 0.7, duration: 0.08, ease: "power4.in",
      }, 4.0);
      tl.to(flashRef.current, {
        opacity: 0, duration: 0.4, ease: "power2.out",
      }, 4.08);

      // All UI dissolves
      tl.to(uiLayerRef.current, {
        opacity: 0,
        scale: 0.96,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power3.in",
      }, 4.0);

      // Progress bar dissolves
      tl.to(progressBarRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 4.0);

      // Doors open — fire onComplete NOW so hero mounts behind doors
      tl.to(topDoorRef.current, {
        y: "-100%",
        duration: 1.0,
        ease: "power4.inOut",
      }, 4.2);
      tl.to(bottomDoorRef.current, {
        y: "100%",
        duration: 1.0,
        ease: "power4.inOut",
      }, 4.2);
      tl.call(() => {
        document.body.style.overflow = "auto";
        onCompleteRef.current();
      }, [], 5.2);

    }, containerRef);

    // Progress counter
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(Math.floor(((now - start) / TOTAL_DURATION) * 100), 100);
      setProgress(p);
      if (progressRef.current) {
        progressRef.current.textContent = String(p).padStart(3, "0");
      }
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [startLetterDecode]);

  // Build letter spans
  const letterElements = FULL_NAME.split("").map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      data-char={char}
      style={{
        opacity: 0,
        transform: "translateY(8px)",
        transition: "transform 0.3s ease",
        minWidth: char === " " ? "0.35em" : undefined,
      }}
    >
      {char === " " ? "\u00A0" : "_"}
    </span>
  ));

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100]">

      {/* ── GRAIN TEXTURE (lowest layer) ── */}
      <div
        className="absolute inset-0 z-[101] pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: "grainShift 0.3s steps(4) infinite",
        }}
      />

      {/* ── GRID ── */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-[102] pointer-events-none"
        style={{
          opacity: 0,
          backgroundImage: `
            linear-gradient(rgba(30,167,224,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,167,224,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── SCAN LINE ── */}
      <div
        ref={scanLineRef}
        className="absolute left-0 w-full h-[1px] z-[108] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, #1EA7E0 20%, #1EA7E0 80%, transparent)",
          boxShadow: "0 0 20px 3px rgba(30,167,224,0.5), 0 0 60px 8px rgba(30,167,224,0.2)",
          opacity: 0,
        }}
      />

      {/* ── TOP DOOR ── */}
      <div
        ref={topDoorRef}
        className="absolute top-0 left-0 h-1/2 w-full bg-[#050505] z-[105]"
        style={{
          borderBottom: "1px solid rgba(30,167,224,0.2)",
          boxShadow: "inset 0 -24px 40px rgba(0,0,0,0.45)",
          willChange: "transform",
        }}
      />

      {/* ── BOTTOM DOOR ── */}
      <div
        ref={bottomDoorRef}
        className="absolute bottom-0 left-0 h-1/2 w-full bg-[#050505] z-[105]"
        style={{
          borderTop: "1px solid rgba(30,167,224,0.2)",
          boxShadow: "inset 0 24px 40px rgba(0,0,0,0.45)",
          willChange: "transform",
        }}
      />

      {/* ── ALL UI CONTENT (above doors) ── */}
      <div ref={uiLayerRef} className="absolute inset-0 z-[110] pointer-events-none select-none">

        {/* Corner bracket — top-left */}
        <div ref={cornerTLRef} className="absolute top-8 left-8" style={{ opacity: 0 }}>
          <div className="w-8 h-8 border-l-[1.5px] border-t-[1.5px] border-[#1EA7E0]/60" />
          <span className="absolute top-10 left-0 font-mono text-[9px] text-[#1EA7E0]/40 tracking-[0.3em] whitespace-nowrap">SYS.INIT</span>
        </div>

        {/* Corner bracket — bottom-right */}
        <div ref={cornerBRRef} className="absolute bottom-8 right-8" style={{ opacity: 0 }}>
          <div className="w-8 h-8 border-r-[1.5px] border-b-[1.5px] border-[#1EA7E0]/60 ml-auto" />
          <span className="absolute bottom-10 right-0 font-mono text-[9px] text-[#1EA7E0]/40 tracking-[0.3em] whitespace-nowrap">v1.0.25</span>
        </div>

        {/* Left decorative lines */}
        <div ref={linesLeftRef} className="absolute left-[8%] md:left-[12%] top-1/2 -translate-y-1/2 flex flex-col gap-[3px]" style={{ opacity: 0 }}>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#1EA7E0]/50" />
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#1EA7E0]/30" />
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#1EA7E0]/40" />
        </div>

        {/* Right decorative lines */}
        <div ref={linesRightRef} className="absolute right-[8%] md:right-[12%] top-1/2 -translate-y-1/2 flex flex-col items-end gap-[3px]" style={{ opacity: 0 }}>
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#1EA7E0]/50" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#1EA7E0]/30" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#1EA7E0]/40" />
        </div>

        {/* ── THE NAME ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            ref={nameRef}
            className="font-serif italic text-white text-[10vw] md:text-[7vw] lg:text-[6vw] leading-[1.1] tracking-[0.12em] whitespace-nowrap"
          >
            {letterElements}
          </div>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="font-mono text-[10px] md:text-xs text-[#1EA7E0]/60 uppercase mt-6"
            style={{ opacity: 0 }}
          >
            {SUBTITLE}
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR (above doors) ── */}
      <div ref={progressBarRef} className="absolute bottom-8 left-8 z-[110] font-mono text-[10px] tracking-[0.4em] text-white/25 flex items-center gap-3">
        <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-[#1EA7E0]/50 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span ref={progressRef}>000</span>
      </div>

      {/* ── FLASH OVERLAY (topmost) ── */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-[120] bg-white pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Grain animation keyframes */}
      <style>{`
        @keyframes grainShift {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-2%, 3%); }
          50% { transform: translate(3%, -1%); }
          75% { transform: translate(-1%, -3%); }
          100% { transform: translate(2%, 1%); }
        }
      `}</style>
    </div>
  );
}
