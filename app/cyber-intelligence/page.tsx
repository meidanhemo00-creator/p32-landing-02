import type { Metadata } from "next";
import { RevealObserver } from "@/components/RevealObserver";
import {
  CyberHero,
  CyberProblem,
  CyberDifferent,
  CyberWhoWeAre,
  CyberHowWeWork,
  CyberDeliver,
  CyberEngagement,
  CyberClosing,
} from "@/components/cyber/CyberSections";
import { Contact } from "@/components/sections/Contact";

const description =
  "P32 works with governments, national cyber agencies and critical-sector operators. We track the adversaries that target you, test whether they can actually reach you, and tell you what to do first.";

export const metadata: Metadata = {
  title: "Cyber Intelligence & Exposure | P32",
  description,
  openGraph: { title: "Cyber Intelligence & Exposure | P32", description, url: "/cyber-intelligence" },
};

export default function CyberIntelligencePage() {
  return (
    <main>
      <RevealObserver />
      <CyberHero />
      <CyberProblem />
      <CyberDifferent />
      <CyberWhoWeAre />
      <CyberHowWeWork />
      <CyberDeliver />
      <CyberEngagement />
      <CyberClosing />
      <Contact page="cyber" />
    </main>
  );
}
