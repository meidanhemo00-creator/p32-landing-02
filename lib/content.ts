// All copy below is reproduced verbatim from the approved P32 brief.
// Nothing here is invented: no clients, partners, metrics, or capabilities
// have been added. Per the client's explicit instruction, every em/en dash
// originally in this file has been normalized to a plain hyphen.

export const vision = {
  headline: "DEFENSE SOLUTION ARCHITECTS that will make your MISSION POSSIBLE",
  body: "Trusted by nations and intelligence agencies around the globe to bridge the gap between complex operational needs and cutting-edge execution.",
};

// Superseded hierarchy/copy, supplied directly by the client to replace the
// original threefold-list presentation below. The `context` line per point
// is the one piece of copy on this page NOT supplied by the client -- it
// was written to satisfy an explicit "supporting context becomes visible"
// interaction requirement with nothing to elaborate with. It stays strictly
// a restatement of the pressure itself (no new P32 capability, client, or
// metric claims) and should be flagged for the client's review/replacement.
export const gap = {
  label: "THE GAP IN MODERN DEFENSE",
  headline: "THREE PRESSURES DEFINE THE MODERN OPERATIONAL GAP.",
  points: [
    {
      statement: "AN EVOLVING TECHNOLOGICAL LANDSCAPE.",
      context: "Requirements shift as fast as the technology does - yesterday's platform is rarely tomorrow's answer.",
    },
    {
      statement: "FRICTION BETWEEN DISPARATE SYSTEMS.",
      context: "Independently built systems rarely speak the same language, and integrating them after the fact costs time no mission can spare.",
    },
    {
      statement: "THE SECURITY RISK OF EXPOSING SENSITIVE NEEDS TO THE OPEN MARKET.",
      context: "Describing a sensitive requirement to the open market can itself become the exposure - the search for a solution becoming the vulnerability.",
    },
  ],
};

export const uniqueness = {
  headline: "As an objective & Trusted Executor, P32 operates without conflict of interest.",
  body: "We manage the entire lifecycle: from scouting and development - to integration - to ensure an unfair advantage in the field.",
  lifecycle: ["Scouting", "Development", "Integration"],
};

export const playbook = [
  {
    index: "01",
    title: "Mission Deconstruction",
    statement:
      "We don't just look at the problem; we reverse-engineer it to its core components.",
    expanded:
      "We break massive, seemingly impossible operational challenges down into distinct, solvable blocks. It is about understanding the 'what' and the 'how' at a granular level so that no detail is left to chance.",
  },
  {
    index: "02",
    title: "Technological Identification",
    statement:
      "Scanning the global landscape for Deep Tech and existing innovations that fit the gap.",
    expanded:
      "We continuously scout the global landscape - from defense innovations to cyber capabilities - to pinpoint the exact tools that match your specific mission gaps.",
  },
  {
    index: "03",
    title: "Custom Development",
    statement:
      "When the market falls short, we build. From AI architectures to specialized hardware.",
    expanded:
      "We shift from curators to creators, engineering purpose-built technologies from the ground up when existing solutions aren't enough.",
  },
  {
    index: "04",
    title: "Orchestration & Integration",
    statement:
      "Turning disparate systems into a single, unified, and frictionless organism.",
    expanded:
      "A pile of advanced technology is useless without synergy. We connect custom code, hardware, and sensors so they operate as one seamless, unified entity.",
  },
];

export const execution = {
  lineOne: "We deliver defense. We execute.",
  lineTwo: "From high-level architecture to the red button.",
};

export const team = {
  headline: "The world sees the outcome. It almost never sees the people who built it.",
  bodyOne:
    "Our team combines elite operational command experience with decades of proven technological innovation.",
  bodyTwo:
    "We come from the units that faced these challenges, and we bring the track record of scaling ideas into successful war capabilities based on advanced technology.",
};

export const contact = {
  address: "HaNechoshet 3, Tel Aviv",
  email: "info@p32.ltd",
  phone: "+972 3 653 0997",
  phoneHref: "tel:+97236530997",
  emailHref: "mailto:info@p32.ltd",
};

export const hero = {
  lineOne: "Deconstructing Challenges.",
  lineTwo: "Reconstructing Solutions.",
};

// Organizational structure. Names and roles are the client's authoritative
// list from the September 2026 brief -- it supersedes the older names/titles
// printed in the source team deck (p32 (14).pdf). Roles are split on the
// client's own "|" separators so each part can set on its own line. No
// biographies were approved, so none are shown.
export type Person = {
  name: string;
  roles: string[];
  portrait: string;
};

export const personnel = {
  title: "Organizational Structure & Key Personnel",
  supportOne:
    "With a foundation built on expertise and innovation, our team of industry veterans and visionary engineers is dedicated to pushing the boundaries of defense technology.",
  supportTwo:
    "From artificial intelligence to cybersecurity, we explore every avenue to ensure our solutions are not just innovative, but also effective and reliable.",
  groups: [
    {
      id: "advisory-board",
      title: "Advisory Board",
      people: [
        { name: "Liron Parche", roles: ["CEO", "Director", "Co-Founder"], portrait: "liron-parche" },
        { name: "Boris Shaglov", roles: ["VP Business Development", "Director", "Co-Founder"], portrait: "boris-shaglov" },
        { name: "Daniel Goldberg", roles: ["COO", "Director", "Co-Founder"], portrait: "daniel-goldberg" },
        { name: "Guy Parche", roles: ["CGO, USA, Canada & Australia", "Co-Founder"], portrait: "guy-parche" },
        { name: "Boris Plis", roles: ["CTO", "Co-Founder"], portrait: "boris-plis" },
      ] satisfies Person[],
    },
    {
      id: "cyber-leadership",
      title: "Cyber Leadership & Strategic Advisory",
      people: [
        { name: "Dana Toren", roles: ["VP Cyber & NORTH GATE Solutions"], portrait: "dana-toren" },
        { name: "Yuval Segev", roles: ["Senior Advisor, National-Level Cyber Strategy"], portrait: "yuval-segev" },
      ] satisfies Person[],
    },
  ],
};

// Cyber Intelligence & Exposure -- all copy verbatim from the approved
// one-pager (P32_One-Pager-2.pdf). The only structural words added are the
// engagement ownership-scale labels, which restate the Handover stage.
export const cyber = {
  label: "Cyber Intelligence & Exposure",
  headline: "Intelligence that ends in a decision.",
  intro:
    "P32 works with governments, national cyber agencies and critical-sector operators. We track the adversaries that target you, test whether they can actually reach you, and tell you what to do first. Then we build that capability inside your organization, so you can run it yourself.",
  problem: {
    title: "The Problem",
    lead: "Most organizations already pay for threat intelligence. They get feeds, indicators and actor reports. What they don't get is an answer to three questions:",
    questions: [
      "Which of these threats can actually reach us?",
      "What do we fix, block or test first?",
      "Can we do this ourselves next year?",
    ],
  },
  different: {
    title: "How P32 Is Different",
    typicalLabel: "Typical CTI Provider",
    p32Label: "P32",
    rows: [
      ["Feeds and reports", "A prioritized list of actions"],
      ["Generic threat picture", "Mapped to your assets, sector and geography"],
      ["Risk stays on paper", "Risk tested through hunting, attack-path analysis and red teaming"],
      ["Its own data source", "Technical, dark-web, OSINT, partner and sector sources combined"],
      ["Proprietary platform, annual licence", "A system built on open-source tools, customized for you and owned by you"],
      ["Permanent dependence", "A defined path to running it in-house"],
    ] as const,
  },
  whoWeAre: {
    title: "Who We Are",
    lead: "Our team built and led national CERTs, SOCs and incident response operations.",
    body: "We know how attackers choose targets, build infrastructure and move inside networks. We also know how a defender turns that knowledge into action under pressure.",
  },
  howWeWork: {
    title: "How We Work",
    stages: [
      { name: "Collect", detail: "from multiple sources" },
      { name: "Map", detail: "threats to your assets and mission" },
      { name: "Prioritize", detail: "by intent, exploitability and asset criticality" },
      { name: "Validate", detail: "with hunting and red teaming" },
      { name: "Act", detail: "what to block, patch, hunt, escalate, and what to brief to leadership" },
    ],
  },
  deliver: {
    title: "What We Deliver",
    groups: [
      {
        name: "Know the adversary",
        items: [
          "Threat actor tracking and profiling",
          "Attack infrastructure tracking and attribution (hosting, location, ownership)",
          "Monitoring of leaks, influence operations and hostile narratives",
        ],
      },
      {
        name: "Know your exposure",
        items: ["External attack surface mapping", "Continuous threat exposure management (CTEM)"],
      },
      {
        name: "Test and fix",
        items: [
          "Threat hunting",
          "Penetration testing, red teaming and attack-path analysis",
          "Action lists for SOC and IT teams",
          "Executive briefings",
        ],
      },
      {
        name: "Be ready",
        items: ["DDoS preparedness", "Incident response and crisis exercises", "Advisory for national cyber programs"],
      },
    ],
  },
  engagement: {
    title: "Engagement Path",
    stages: [
      { name: "Foundation", detail: "Map needs, assets and attack surface. Select tools. Set up collection." },
      { name: "Fusion", detail: "Connect sources, build actor profiles, detect recurring attack patterns." },
      { name: "Operation", detail: "Integrate with your SOC and CERT workflows. Run continuous testing and automation." },
      { name: "Handover", detail: "Train your team and transfer methods and tools until you run it on your own." },
    ],
    scaleStart: "Built with P32",
    scaleEnd: "Run by your team",
  },
};
