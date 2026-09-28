import { RevealObserver } from "@/components/RevealObserver";
import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Gap } from "@/components/sections/Gap";
import { Uniqueness } from "@/components/sections/Uniqueness";
import { Playbook } from "@/components/sections/Playbook";
import { Execution } from "@/components/sections/Execution";
import { CyberTeaser } from "@/components/sections/CyberTeaser";
import { Team } from "@/components/sections/Team";
import { Resolution } from "@/components/sections/Resolution";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <RevealObserver />
      <Hero />
      <Vision />
      <Gap />
      <Uniqueness />
      <Playbook />
      <Execution />
      <CyberTeaser />
      <Team />
      <Resolution />
      <Contact />
    </main>
  );
}
