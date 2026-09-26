"use client";

import { useCallback, useState } from "react";
import { Entrance } from "@/components/entrance/Entrance";
import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Gap } from "@/components/sections/Gap";
import { Uniqueness } from "@/components/sections/Uniqueness";
import { Playbook } from "@/components/sections/Playbook";
import { Execution } from "@/components/sections/Execution";
import { Team } from "@/components/sections/Team";
import { Resolution } from "@/components/sections/Resolution";
import { Contact } from "@/components/sections/Contact";
import { MotionRefresh } from "@/components/MotionRefresh";

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  const onEntranceComplete = useCallback(() => setHeroReady(true), []);

  return (
    <>
      <Entrance onComplete={onEntranceComplete} />
      {/* Inert while the entrance gate is up: a keyboard or screen-reader
          visitor must not be able to reach Nav/section content hidden
          behind the opaque overlay. */}
      <main inert={!heroReady}>
        <Hero montageReady={heroReady} />
        <Vision />
        <Gap />
        <Uniqueness />
        <Playbook />
        <Execution />
        <Team />
        <Resolution />
        <Contact />
        <MotionRefresh />
      </main>
    </>
  );
}
