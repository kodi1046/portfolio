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
    "I love exploring and understanding the world through a quantitative lens — whether it's a language, a financial market, or behavior, I want to understand it from fundamental principles.",
    "That instinct pulls me toward the structure underneath things: the symmetries, invariants, and dynamics that markets and mathematics share. I build the theory, then write the code that puts it to work."
  ],

  /* ---- Quick facts (status / sidebar) ------------------------------------ */
  facts: [
    { label: "Studying", value: "B.S. Computer Science · Uppsala University" },
    { label: "Standing", value: "3.97 / 4.00 CGPA · grad. 2027" },
    { label: "Next", value: "Exchange — University of Tokyo, Oct 2026" },
    { label: "Open to", value: "Quant research internships" }
  ],

  /* ---- Focus areas (grouped tags) ---------------------------------------- */
  focus: [
    { group: "Quant finance", items: ["Momentum strategies", "Market symmetries", "Portfolio optimization", "Dynamic risk budgeting"] },
    { group: "Mathematics", items: ["Functional analysis", "Group theory", "Differential geometry", "Stochastic calculus", "Machine learning"] },
    { group: "Engineering", items: ["Numerical methods", "High-performance C++", "Research → implementation"] }
  ],

  /* ---- Papers & publications --------------------------------------------- */
  // status: "published" | "submitted" | "preprint" | "working"
  papers: [
    {
      title: "The Uncertainty Principle in Time-Series Momentum",
      subtitle: "A signal-processing bound on lag, turnover, and regime detection",
      authors: "Konstantin Dimitriadis Lorenz",
      venue: "Preprint",
      status: "preprint",
      year: "2026",
      abstract: "Momentum strategies filter return series to isolate persistent trends from high-frequency noise. I map the Gabor–Heisenberg uncertainty principle onto three operational floors — signal lag, expected turnover, and regime-detection delay — and show they are irreducible consequences of σt·σξ ≥ 1/4π that no adaptive method or higher-frequency data can remove.",
      links: [{ label: "PDF", href: "shared/papers/uncertainty-principle-tsmom.pdf" }]
    },
    {
      title: "A Metaplectic Momentum Filter",
      authors: "Konstantin Dimitriadis Lorenz",
      venue: "Working paper",
      status: "working",
      year: "2026",
      abstract: "In progress. A momentum-detection filter built on the metaplectic representation — exploiting phase-space symmetry to separate trend from noise. A numerical validation notebook accompanies the derivation.",
      links: [{ label: "Validation notebook", href: "shared/papers/metaplectic_filter_validation.ipynb" }]
    },
    {
      title: "Dynamic Risk Budgeting through Control",
      authors: "Konstantin Dimitriadis Lorenz",
      venue: "Working paper",
      status: "working",
      year: "2026",
      abstract: "In progress. Treating a portfolio's risk budget as a controlled process, and solving for allocation policies that adapt to changing market regimes.",
      links: [{ label: "Coming soon", href: "#" }]
    }
  ],

  /* ---- Projects (from CV) ------------------------------------------------ */
  // Replace href with specific repo URLs when you have them.
  projects: [
    {
      name: "HVol",
      blurb: "A Heston stochastic-volatility simulator in C++ for option pricing: the Carr–Madan quasi-closed-form for European options, Monte-Carlo for vanilla and exotic payoffs, a radix-2 DIT FFT, and Heston parameter calibration.",
      tags: ["C++", "FFT", "Monte Carlo", "Calibration"],
      period: "2026 — present",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Quant.py",
      blurb: "A modular Python backtesting engine for trading strategies and option portfolios — pluggable pricing engines (Black–Scholes, Monte Carlo), GBM and jump-diffusion simulation, delta hedging, Greeks, and portfolio tracking over historical or synthetic data.",
      tags: ["Python", "Backtesting", "Options", "Greeks"],
      period: "2026 — present",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Reference-counting Garbage Collector",
      blurb: "A reference-counting garbage collector implemented in C (joint project).",
      tags: ["C", "Memory management"],
      period: "2025 — 2026",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Symbolic Calculator",
      blurb: "A symbolic calculator in Java using Pratt parsing and the visitor pattern for AST traversal (two-person project).",
      tags: ["Java", "Parsing", "AST"],
      period: "2025",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Minesweeper",
      blurb: "A terminal-based Minesweeper game written in TypeScript (joint project).",
      tags: ["TypeScript", "CLI"],
      period: "2025",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Chat App",
      blurb: "A real-time chat application built in Django with WebSockets (two-person project).",
      tags: ["Python", "Django", "WebSockets"],
      period: "2024",
      href: "https://github.com/kodi1046"
    },
    {
      name: "Space Game",
      blurb: "A space-themed 2D single-player story game built in Godot.",
      tags: ["Godot", "Game dev"],
      period: "2024",
      href: "https://github.com/kodi1046"
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
  resumeHref: "shared/resume.pdf",
  links: [
    { label: "GitHub", href: "https://github.com/kodi1046", handle: "@kodi1046" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/konstantin-dimitriadis-lorenz-1684a2391/", handle: "Konstantin D. Lorenz" },
    { label: "Email", href: "mailto:boid@tutamail.com", handle: "boid@tutamail.com" }
  ]
};
