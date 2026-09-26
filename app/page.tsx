import { Hero } from "@/components/sections/Hero";
import { Vision } from "@/components/sections/Vision";
import { Gap } from "@/components/sections/Gap";
import { Uniqueness } from "@/components/sections/Uniqueness";
import { Playbook } from "@/components/sections/Playbook";
import { Execution } from "@/components/sections/Execution";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";
import { MotionRefresh } from "@/components/MotionRefresh";

export default function Home() {
  return (
    <main>
      <Hero />
      <Vision />
      <Gap />
      <Uniqueness />
      <Playbook />
      <Execution />
      <Team />
      <Contact />
      <MotionRefresh />
    </main>
  );
}
