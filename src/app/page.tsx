"use client";

import { useState } from "react";
import IntroLoader from "@/components/ui/IntroLoader";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TimelineSection from "@/components/sections/TimelineSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CyberSecuritySection from "@/components/sections/CyberSecuritySection";
import SkillsGalaxy from "@/components/sections/SkillsGalaxy";
import AchievementsCylinder from "@/components/sections/AchievementsCylinder";
import ImpactSection from "@/components/sections/ImpactSection";
import ContactSection from "@/components/sections/ContactSection";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative bg-[#050505] text-white">
      <>
        <Navigation />
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ExperienceSection />
        <CyberSecuritySection />
        <SkillsGalaxy />
        <AchievementsCylinder />
        <ImpactSection />
        <ContactSection />
        <Marquee />
      </>

      {loading && <IntroLoader onComplete={() => setLoading(false)} />}
    </main>
  );
}
