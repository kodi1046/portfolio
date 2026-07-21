/* =============================================================================
   PORTFOLIO CONTENT  —  single source of truth
   Edit values here; the site re-renders from this file.
   Articles are managed separately in shared/articles.json + shared/articles/.
   ============================================================================= */

window.PORTFOLIO_DATA = {
  /* ---- Identity ---------------------------------------------------------- */
  name: "Konstantin Dimitriadis Lorenz",
  shortName: "Konstantin",
  initials: "KDL",
  handle: "kodi1046",
  role: "Mathematics · CS · Quantitative Finance",
  location: "Uppsala, Sweden",
  tagline: "Reimagining markets through symmetry.",

  /* ---- About (each string = a paragraph) --------------------------------- */
  about: [
    "I'm drawn to the intersection of markets with math. Analyzing markets through a quantitative lens, using stochastic dynamics and geometry.",
    "That instinct pulls me toward the structure underneath things: the symmetries, invariants, and dynamics that markets and mathematics share. I build the theory, then write the code that puts it to work."
  ],

  /* ---- Quick facts (status / sidebar) ------------------------------------ */
  facts: [
    { label: "Studying", value: "B.S. Computer Science · Uppsala University" },
    { label: "Standing", value: "3.9 / 4.0 CGPA · grad. 2027" },
    { label: "Next", value: "Exchange — University of Tokyo, Oct 2026" },
    { label: "Open to", value: "Quant research internships" }
  ],

  /* ---- Focus areas (grouped tags) ---------------------------------------- */
  focus: [
    { group: "Quant finance", items: ["Time Series Analysis", "Portfolio Management", "Risk Analysis"] },
    { group: "Mathematics", items: ["Probability", "Statistics", "Analysis", "Linear Algebra", "Stochastic Calculus", "Geometry"] },
    { group: "Engineering", items: ["Numerical methods", "Optimization", "Data Analysis", "R&D"] }
  ],

  /* ---- Papers & publications --------------------------------------------- */
  // status: "published" | "submitted" | "preprint" | "working"
  papers: [
    {
      title: "A Single-Asset Statistical Field Theory for Financial Asset Returns",
      subtitle: "",
      authors: "Konstantin Dimitriadis Lorenz",
      venue: "Note",
      status: "Preprint",
      year: "2026",
      abstract: "We construct a single-asset statistical field theory that unifies multifractal volatility cascades and non-reciprocal order-flow dynamics to robustly reproduce Cont's stylized facts across timescales. By exploiting an exact shift symmetry of the log-price, a Ward identity rigorously protects the no-arbitrage condition to all orders in perturbation theory, recovering both classical no-arbitrage pricing and market efficiency as distinct limits.",
      links: [{label: "Paper", href: "https://www.linkedin.com/feed/update/urn:li:activity:7485002818462834688/"}]  
    },
    {
      title: "The Uncertainty Principle in Time-Series Momentum",
      subtitle: "A signal-processing bound on lag, turnover, and regime detection",
      authors: "Konstantin Dimitriadis Lorenz",
      venue: "Preprint",
      status: "preprint",
      year: "2026",
      abstract: "Momentum strategies filter return series to isolate persistent trends from high-frequency noise. We map the Gabor–Heisenberg uncertainty principle onto three operational floors, signal lag, expected turnover, and regime-detection delay, and show they are irreducible consequences of σt·σξ ≥ 1/4π that no adaptive method or higher-frequency data can remove.",
      links: [{ label: "Paper", href: "https://www.linkedin.com/feed/update/urn:li:activity:7462972328633823232/"}]
    },
  ],

  /* ---- Projects (from CV) ------------------------------------------------ */
  // Replace href with specific repo URLs when you have them.
  projects: [
     {
        name: "PBTC5",
        blurb: "Polymarket 5-min crypto market bot, built with Claude Code.",
        tags: ["Trading Bot", "Claude Code"],
        period: "2026",
        href: "https://github.com/kodi1046/PBTC5"
     },
    {
      name: "OnBoard",
      blurb: "Collaborative whiteboard built using WebSockets, and Bun.",
      tags: ["Web Development", "JavaScript"],
      period: "2026",
      href: "https://github.com/OSPP-Haboob/Haboob"
    }, 
    {
      name: "Symbolic Calculator",
      blurb: "A Symbolic Calculator built in Java.",
      tags: ["Parsing", "Java"],
      period: "2025",
      href: "",
    },
    {
      name: "Space Game",
      blurb: "A space-themed 2D single-player story game built in Godot.",
      tags: ["Godot", "Game dev"],
      period: "2024",
      href: ""
    }
  ],

  /* ---- Experience -------------------------------------------------------- */
  experience: [
    {
      role: "Mathematics Tutor",
      org: "StuddyBuddy",
      period: "Summer 2025 — Winter 2026",
      detail: "A tutoring business for high-school students. Taught mathematics across three grade levels, lifting academic performance with tailored lesson plans."
    },
    {
      role: "Software Developer",
      org: "Rookie Startups",
      period: "Summer 2024",
      detail: "Built a React web app to estimate the CO₂ emissions of food products, with dynamic search and data visualization."
    }
  ],

  /* ---- Education --------------------------------------------------------- */
  education: [
    {
      degree: "B.S. Computer Science",
      org: "Uppsala University",
      period: "2024 — 2027 (expected)",
      detail: "3.97 / 4.00 CGPA. Coursework in linear algebra, multivariable calculus, probability theory, OOP, and algorithmic theory (C, Java, Python)."
    },
    {
      degree: "Exchange Semester",
      org: "University of Tokyo",
      period: "Oct 2026 — Mar 2027",
      detail: "Studying mathematics and quantitative methods."
    }
  ],

  /* ---- Skills (grouped) -------------------------------------------------- */
  // "*" in CV meant academic / self-study.
  skills: [
    { group: "Python", items: ["NumPy", "Pandas", "Matplotlib", "PyTorch", "Django"] },
    { group: "JS / TS", items: ["React", "Svelte", "Jest"] },
    { group: "Systems", items: ["C", "C++", "Java", "CUnit", "GDB"] },
    { group: "Tooling", items: ["Linux", "Git", "Make"] }
  ],

  /* ---- Spoken languages (CEFR) ------------------------------------------- */
  languages: [
    { lang: "Swedish", level: "C2" },
    { lang: "English", level: "C1/C2 · IELTS 8" },
    { lang: "German", level: "C1" },
    { lang: "Spanish", level: "C1" },
    { lang: "Japanese", level: "B2" }
  ],

  /* ---- LinkedIn posts / infographics ------------------------------------ */
  // Each entry is a LinkedIn embed. To add one: open a post on LinkedIn →
  // "…" menu → "Embed this post" → paste the iframe's src below.
  // Native iframe size is 504×668; the layout scales it responsively.
  posts: [
    {
      embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7468804869844336640?collapsed=1",
      caption: "The geometric meaning of Expected Value & Variance"
    },
    {
       embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7470770625888845824?collapsed=1",
       caption: "What is Geometric Deep Leaning"
    },
    {
       embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7471559938520199169?collapsed=1",
       caption: "The Martingale Representation Theorem & Replicating Strategies"
    },
    {
       embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7472704336909881345?collapsed=1",
       caption: "The Radon-Nikodym Theorem for Probability"
    },
    {
       embed: "https://www.linkedin.com/embed/feed/update/urn:li:share:7475352431648915456?collapsed=1" ,
       caption: "What is Alpha & Beta"
    }
  ],

  /* ---- Contact & links --------------------------------------------------- */
  email: "boid@tutamail.com",
  resumeHref: "https://www.linkedin.com/in/konstantin-dimitriadis-lorenz-1684a2391/overlay/1781092858322/single-media-viewer/?profileId=ACoAAGBbuGABskb7TNf5k7KvpREZeT7frNWlOOw",
  links: [
    { label: "GitHub", href: "https://github.com/kodi1046", handle: "@kodi1046" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/konstantin-dimitriadis-lorenz-1684a2391/", handle: "Konstantin D. Lorenz" },
    { label: "Email", href: "mailto:boid@tutamail.com", handle: "boid@tutamail.com" }
  ]
};
