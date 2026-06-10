/* Direction 2 — Terminal (v2): render from data + wire fluid motion */
(function () {
  "use strict";
  const D = window.PORTFOLIO_DATA;
  const M = window.Motion;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const renumberNav = () => document.querySelectorAll("nav.idx a .n").forEach((n, i) => { n.textContent = String(i + 1).padStart(2, "0"); });

  document.title = D.name + " — " + D.role;

  const ICONS = {
    GitHub: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5A10.5 10.5 0 0 0 8.7 22c.5.1.7-.2.7-.5v-1.7c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-1-.6 0-.6 0-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.2-4.7-5.1 0-1.1.4-2 1-2.7 0-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5z"/></svg>',
    LinkedIn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 5.9V21H19v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>',
    Email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    "Google Scholar": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3 1 9l11 6 9-4.9V17h2V9zM5 13.2V17l7 3.8 7-3.8v-3.8l-7 3.8z"/></svg>'
  };

  /* ---- sidebar ---- */
  $("#side-handle").innerHTML = esc(D.handle) + '<span class="car"></span>';
  $("#side-name").textContent = D.name;
  $("#side-role").textContent = D.role;
  $("#side-tag").innerHTML = '<b>&gt;</b> ' + esc(D.tagline);
  $("#side-socials").innerHTML = D.links.filter(l => ICONS[l.label]).map(l =>
    `<a href="${esc(l.href)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}" title="${esc(l.label)}">${ICONS[l.label]}</a>`).join("");
  $("#side-loc").textContent = D.location;

  /* ---- hero ---- */
  const heroName = $("#hero-name");
  heroName.textContent = D.name;
  $("#hero-line").textContent = D.tagline;
  $("#hero-intro").textContent = D.about[0];
  const f = (l) => D.facts.find(x => x.label === l)?.value || "";
  $("#hero-meta").innerHTML =
    `<span><b>loc</b> ${esc(D.location)}</span>` +
    `<span><b>edu</b> ${esc(f("Studying"))}</span>` +
    `<span><b>status</b> ${esc(f("Open to"))}</span>`;
  const paperHref = (D.papers[0] && D.papers[0].links[0] && D.papers[0].links[0].href) || "#";
  $("#hero-cta").innerHTML =
    `<a class="btn solid magnetic" href="${esc(paperHref)}" target="_blank" rel="noopener">Read the paper</a>` +
    `<a class="btn magnetic" href="#contact">Get in touch</a>` +
    `<a class="btn magnetic" href="${esc(D.resumeHref)}" target="_blank" rel="noopener">CV ↗</a>`;

  /* ---- about ---- */
  $("#about-body").innerHTML = '<div class="about">' + D.about.map(p => `<p>${esc(p)}</p>`).join("") + "</div>";

  /* ---- focus ---- */
  $("#focus-body").innerHTML = '<div class="focus-grid flow">' + D.focus.map(g => `
    <div class="focus-col"><div class="g">${esc(g.group)}</div>
      <div class="chips">${g.items.map(i => `<span>${esc(i)}</span>`).join("")}</div></div>`).join("") + "</div>";

  /* ---- papers ---- */
  $("#papers-count").textContent = D.papers.length + " entries";
  $("#papers-body").innerHTML = '<div class="papers-list flow">' + D.papers.map((p, i) => `
    <article class="paper${i === 0 ? " feat" : ""}">
      <div class="top">
        <span class="badge ${esc(p.status)}">${esc(p.status)}</span>
        <span class="yr">${esc(p.year)} · ${esc(p.venue)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      ${p.subtitle ? `<div class="sub">${esc(p.subtitle)}</div>` : ""}
      <div class="authors">${esc(p.authors)}</div>
      <p class="abs">${esc(p.abstract)}</p>
      <div class="lnks">${p.links.map(l => l.href === "#"
        ? `<span class="lnk-dim">${esc(l.label)}</span>`
        : `<a href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>
    </article>`).join("") + "</div>";

  /* ---- projects ---- */
  $("#projects-count").textContent = D.projects.length + " repos";
  $("#projects-body").innerHTML = '<div class="projects flow">' + D.projects.map(p => `
    <a class="proj" href="${esc(p.href)}"${p.href !== "#" ? ' target="_blank" rel="noopener"' : ""}>
      <div class="ptop"><h3>${esc(p.name)}</h3><span class="per">${esc(p.period || "")}</span></div>
      <p>${esc(p.blurb)}</p>
      <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
    </a>`).join("") + "</div>";

  /* ---- timelines ---- */
  const tl = (it, edu) => `
    <div class="tl"><div class="period">${esc(it.period)}</div>
      <div><h3>${esc(edu ? it.degree : it.role)}</h3><div class="org">${esc(it.org)}</div>
      <p class="det">${esc(it.detail)}</p></div></div>`;
  $("#experience-body").innerHTML = '<div class="timeline flow">' + D.experience.map(e => tl(e, false)).join("") + "</div>";
  $("#education-body").innerHTML = '<div class="timeline flow">' + D.education.map(e => tl(e, true)).join("") + "</div>";

  /* ---- skills + languages ---- */
  $("#skills-body").innerHTML = `
    <div class="sl-grid">
      <div class="skill-col"><div class="g">Technical</div>
        ${D.skills.map(s => `<div class="skill-row"><span class="lbl">${esc(s.group)}</span>
          <div class="chips">${s.items.map(i => `<span>${esc(i)}</span>`).join("")}</div></div>`).join("")}
      </div>
      <div class="lang-col"><div class="g">Languages</div>
        <div class="langs">${D.languages.map(l => `<div class="lg"><span class="l">${esc(l.lang)}</span><span class="v">${esc(l.level)}</span></div>`).join("")}</div>
      </div>
    </div>`;

  /* ---- contact ---- */
  $("#contact-body").innerHTML =
    '<div class="contact-grid flow">' + D.links.map(l =>
      `<a href="${esc(l.href)}" target="_blank" rel="noopener"><div class="cl">${esc(l.label)}</div><div class="ch">${esc(l.handle)}</div></a>`).join("") + "</div>" +
    `<div class="cta-row">
      <a class="btn solid magnetic" href="mailto:${esc(D.email)}">$ ./contact</a>
      <a class="btn magnetic" href="${esc(D.resumeHref)}" target="_blank" rel="noopener">download CV.pdf</a></div>`;

  /* ---- posts (LinkedIn embeds) — hide section entirely when none ---- */
  (function renderPosts() {
    const posts = (D.posts || []).filter(p => p && p.embed);
    if (!posts.length) {
      const sec = $("#posts"); if (sec) sec.remove();
      const nav = document.querySelector('nav.idx a[href="#posts"]'); if (nav) nav.remove();
      renumberNav();
      return;
    }
    const LI = '<svg class="ic" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 5.9V21H19v-5.5c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>';
    $("#posts-count").textContent = posts.length + (posts.length === 1 ? " embed" : " embeds");
    $("#posts-body").innerHTML = '<div class="posts-grid flow">' + posts.map(p => `
      <div class="post-card">
        <div class="pc-head">${LI}<span class="cap">${esc(p.caption || "LinkedIn post")}</span><span class="ext">linkedin.com</span></div>
        <div class="pc-frame"><iframe src="${esc(p.embed)}" loading="lazy" frameborder="0" allowfullscreen title="Embedded LinkedIn post"></iframe></div>
      </div>`).join("") + "</div>";
  })();

  /* ---- articles (hide the Writing section entirely when there are none) ---- */
  const al = $("#articles-body");
  ArticleEngine.getArticles("../shared").then(list => {
    if (!list.length) {
      const sec = $("#writing"); if (sec) sec.remove();
      const nav = document.querySelector('nav.idx a[href="#writing"]'); if (nav) nav.remove();
      renumberNav();
      return;
    }
    $("#articles-count").textContent = list.length + " notes";
    al.innerHTML = '<div class="articles-list">' + list.map(a => `
      <a class="art-item" href="article.html?slug=${encodeURIComponent(a.slug)}">
        <h3>${esc(a.title)}</h3><span class="date">${ArticleEngine.fmtDate(a.date)}</span>
        <p>${esc(a.summary)}</p>
        <div class="tags">${(a.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </a>`).join("") + "</div>";
    M.initReveal();
  }).catch(err => { al.innerHTML = '<p class="article-error">Could not load articles. Serve over http(s).</p>'; console.error(err); });

  /* ====================== COLOR SYSTEM ====================== */
  const PAL = { mint: "#5fe3a1", blue: "#5cb8ff", gold: "#f3b14e", pink: "#ff6fae", violet: "#b08cff" };
  const SECCOL = { about: PAL.mint, focus: PAL.blue, papers: PAL.gold, posts: PAL.violet, writing: PAL.pink, projects: PAL.mint, experience: PAL.blue, education: PAL.gold, skills: PAL.violet, contact: PAL.pink };
  document.querySelectorAll("section.block[id]").forEach(s => { const c = SECCOL[s.id]; if (c) s.style.setProperty("--sec", c); });
  document.querySelectorAll("nav.idx a[href^='#']").forEach(a => { const c = SECCOL[a.getAttribute("href").slice(1)]; if (c) a.style.setProperty("--lc", c); });
  const focusPal = [PAL.mint, PAL.blue, PAL.gold, PAL.violet, PAL.pink];
  document.querySelectorAll("#focus-body .focus-col").forEach((el, i) => el.style.setProperty("--chip", focusPal[i % focusPal.length]));
  const skillPal = [PAL.mint, PAL.gold, PAL.blue, PAL.violet];
  document.querySelectorAll("#skills-body .skill-row").forEach((el, i) => el.style.setProperty("--chip", skillPal[i % skillPal.length]));
  document.querySelectorAll("#skills-body .langs .lg .v").forEach(v => {
    const t = v.textContent;
    v.style.color = t.startsWith("C2") ? PAL.mint : t.startsWith("C1") ? PAL.blue : PAL.gold;
  });

  /* ====================== MATH MOTIFS ====================== */
  if (window.katex) {
    const tex = (s, d) => { try { return katex.renderToString(s, { displayMode: !!d, throwOnError: false, strict: false }); } catch (e) { return ""; } };

    // hero chalkboard — real research equations, faint & scattered
    const HERO_EQS = [
      { t: "\\sigma_t\\,\\sigma_\\xi \\ge \\tfrac{1}{4\\pi}",                                  x: 5,  y: 9,  s: 1.55, r: -4, o: .85 },
      { t: "dS_t = \\mu S_t\\,dt + \\sigma S_t\\,dW_t",                                       x: 53, y: 6,  s: 1.2,  r: 3,  o: .6 },
      { t: "(f*g)(t)=\\int f(\\tau)g(t-\\tau)\\,d\\tau",                                      x: 2,  y: 23, s: 1.05, r: 4,  o: .5 },
      { t: "C(k)=\\frac{e^{-\\alpha k}}{\\pi}\\int_0^\\infty e^{-ivk}\\,\\psi(v)\\,dv",          x: 31, y: 21, s: 1.0,  r: -2, o: .5 },
      { t: "[\\hat x,\\hat p]=i\\hbar",                                                      x: 71, y: 29, s: 1.6,  r: 5,  o: .72 },
      { t: "\\hat f(\\xi)=\\int_{-\\infty}^{\\infty} f(t)\\,e^{-2\\pi i\\xi t}\\,dt",            x: 3,  y: 41, s: 1.15, r: 0,  o: .58 },
      { t: "W_{t+\\Delta}-W_t\\sim\\mathcal N(0,\\Delta)",                                   x: 57, y: 43, s: 1.1,  r: 2,  o: .55 },
      { t: "df=\\left(f_t+\\mu f_S+\\tfrac12\\sigma^2 f_{SS}\\right)dt+\\sigma f_S\\,dW",      x: 45, y: 55, s: 1.0,  r: -3, o: .42 },
      { t: "\\mathbb E\\!\\left[e^{\\sigma W_t}\\right]=e^{\\sigma^2 t/2}",                     x: 65, y: 67, s: 1.2,  r: 4,  o: .6 },
      { t: "\\frac{\\partial V}{\\partial t}+\\tfrac12\\sigma^2 S^2\\frac{\\partial^2 V}{\\partial S^2}+rS\\frac{\\partial V}{\\partial S}-rV=0", x: 6, y: 71, s: .95, r: 2, o: .48 },
      { t: "dv_t=\\kappa(\\theta-v_t)\\,dt+\\xi\\sqrt{v_t}\\,dW_t",                            x: 38, y: 87, s: 1.1,  r: -2, o: .55 },
      { t: "\\mathcal H\\psi_n=E_n\\psi_n",                                                  x: 12, y: 90, s: 1.3,  r: 3,  o: .6 },
      { t: "\\sum_i \\mathrm{RC}_i=\\sigma_p",                                              x: 76, y: 85, s: 1.25, r: -3, o: .6 }
    ];
    const layer = $("#hero-math");
    if (layer) layer.innerHTML = HERO_EQS.map((e, i) =>
      `<div class="eq" style="left:${e.x}%;top:${e.y}%;--o:${e.o};font-size:${e.s}em;transform:rotate(${e.r}deg);animation-delay:${120 + i * 65}ms">${tex(e.t)}</div>`).join("");

    // small live equation in each section divider
    const SECEQ = {
      about: "[\\hat x,\\hat p]=i\\hbar",
      focus: "\\sigma_t\\sigma_\\xi\\ge\\tfrac{1}{4\\pi}",
      papers: "\\hat f(\\xi)=\\!\\int\\! f\\,e^{-2\\pi i\\xi t}dt",
      posts: "\\textstyle\\sum_k a_k\\,e^{i\\omega k}",
      writing: "\\partial_t f=\\Delta f",
      projects: "dS_t=\\mu S_t\\,dt+\\sigma S_t\\,dW_t",
      experience: "t\\to\\infty",
      education: "\\nabla\\mathcal L=0",
      skills: "\\partial_\\theta\\mathcal L",
      contact: "f:\\,A\\to B"
    };
    document.querySelectorAll("section.block[id]").forEach(s => {
      const t = SECEQ[s.id], head = s.querySelector(".sec-head");
      if (!t || !head) return;
      const span = document.createElement("span");
      span.className = "sec-math"; span.setAttribute("aria-hidden", "true");
      span.innerHTML = tex(t); head.appendChild(span);
    });
  }

  // hero entrance — stagger children into place on load
  const heroEl = $(".hero");
  if (heroEl) {
    [...heroEl.children].filter(c => !c.classList.contains("hero-math")).forEach((c, i) => c.style.setProperty("--i", i));
    requestAnimationFrame(() => requestAnimationFrame(() => heroEl.classList.add("lit")));
  }

  /* ====================== MOTION WIRING ====================== */
  M.initSmoothScroll(".bg-grid");
  M.initReveal();
  M.initScrollSpy("nav.idx");
  M.initMagnetic(".magnetic", 0.35);

  // hero name scramble on load
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => M.scramble(heroName, D.name, { speed: 1.1 }));
  else M.scramble(heroName, D.name, { speed: 1.1 });

  // interactive chart
  const cv = $("#price-canvas");
  if (cv && window.InteractiveChart) {
    InteractiveChart(cv, {
      onReadout: (r) => {
        $("#px-last").textContent = r.price.toFixed(2);
        const ch = $("#px-chg");
        ch.textContent = (r.ret >= 0 ? "+" : "") + r.ret.toFixed(2) + "%";
        ch.style.color = r.ret >= 0 ? "var(--accent)" : "#e0726a";
        $("#px-day").textContent = "t+" + r.day + "d";
      }
    });
  }

  // live clock (Uppsala)
  const clk = $("#side-clock");
  function tick() {
    try {
      clk.textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Europe/Stockholm" }).format(new Date());
    } catch (e) { clk.textContent = ""; }
  }
  tick(); setInterval(tick, 1000);

  // sound toggle + click ticks
  const snd = $("#snd-toggle");
  function paintSnd() { snd.textContent = "snd: " + (M.sound.on ? "on" : "off"); }
  paintSnd();
  snd.addEventListener("click", () => { M.sound.on ? M.sound.disable() : M.sound.enable(); paintSnd(); M.sound.tick(880); });
  document.addEventListener("click", (e) => { if (e.target.closest("a, .btn, nav.idx a")) M.sound.tick(660); });
  document.querySelectorAll("nav.idx a").forEach(a => a.addEventListener("mouseenter", () => M.sound.tick(520, 0.025)));
})();
