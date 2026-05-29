"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect } from "react";
import type { ComponentProps, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      {children as ComponentProps<typeof ReactLenis>["children"]}
    </ReactLenis>
  );
}
