/* Direction 3 — Index : render homepage, dark toggle, animated hero curve */
(function () {
  "use strict";
  const D = window.PORTFOLIO_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  document.title = D.name + " — " + D.role;

  /* ---- theme toggle ---- */
  const root = document.documentElement;
  const saved = localStorage.getItem("idx-theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  const tbtn = $("#theme-toggle");
  function paintToggle() { tbtn.innerHTML = root.getAttribute("data-theme") === "dark" ? sun : moon; }
  paintToggle();
  tbtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); localStorage.setItem("idx-theme", next); paintToggle();
  });

  /* ---- identity ---- */
  $("#brand").innerHTML = '<span class="badge">' + esc(D.initials) + '</span>' + esc(D.name);
  const fn = D.name.split(" ")[0], ln = D.name.split(" ").slice(1).join(" ");
  $("#hero-name").innerHTML = esc(fn) + '<br><span class="accent">' + esc(ln || "") + '</span>';
  $("#hero-role").textContent = D.role;
  $("#hero-lede").textContent = D.tagline;
  $("#hero-cta").innerHTML =
    `<a class="btn solid" href="#contact">Get in touch</a>
     <a class="btn" href="${esc(D.resumeHref)}" target="_blank" rel="noopener">Resume ↓</a>`;

  /* ---- about ---- */
  $("#about-body").innerHTML =
    '<div class="about-grid"><div class="about">' + D.about.map(p => `<p>${esc(p)}</p>`).join("") + "</div>" +
    '<div class="facts">' + D.facts.map(f => `<div><div class="k">${esc(f.label)}</div><div class="v">${esc(f.value)}</div></div>`).join("") + "</div></div>";

  /* ---- papers ---- */
  $("#papers-count").textContent = D.papers.length + " items";
  $("#papers-body").innerHTML = D.papers.map(p => `
    <article class="paper">
      <div class="top"><span class="pill">${esc(p.year)}</span><span>${esc(p.venue)}</span></div>
      <h3>${esc(p.title)}</h3>
      <div class="authors">${esc(p.authors)}</div>
      <p class="abs">${esc(p.abstract)}</p>
      <div class="lnks">${p.links.map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}</div>
    </article>`).join("");

  /* ---- projects ---- */
  $("#projects-body").innerHTML = '<div class="projects">' + D.projects.map(p => `
    <a class="proj" href="${esc(p.href)}">
      <span class="arrow">↗</span>
      <h3>${esc(p.name)}</h3><p>${esc(p.blurb)}</p>
      <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
    </a>`).join("") + "</div>";

  /* ---- timelines ---- */
  const tl = (it, edu) => `
    <div class="tl"><div class="period">${esc(it.period)}</div>
      <div><h3>${esc(edu ? it.degree : it.role)}</h3><div class="org">${esc(it.org)}</div>
      <p class="det">${esc(it.detail)}</p></div></div>`;
  $("#experience-body").innerHTML = '<div class="timeline">' + D.experience.map(e => tl(e, false)).join("") + "</div>";
  $("#education-body").innerHTML = '<div class="timeline">' + D.education.map(e => tl(e, true)).join("") + "</div>";

  /* ---- contact ---- */
  $("#contact-body").innerHTML =
    '<div class="contact-grid">' + D.links.map(l =>
      `<a href="${esc(l.href)}" target="_blank" rel="noopener"><div class="cl">${esc(l.label)}</div><div class="ch">${esc(l.handle)}</div></a>`).join("") + "</div>" +
    `<div class="cta-row"><a class="btn solid" href="mailto:${esc(D.email)}">Email me</a>
      <a class="btn" href="${esc(D.resumeHref)}" target="_blank" rel="noopener">Download CV</a></div>`;

  /* ---- articles ---- */
  const al = $("#articles-body");
  ArticleEngine.getArticles("../shared").then(list => {
    al.innerHTML = '<div class="articles-list">' + list.map(a => `
      <a class="art-item" href="article.html?slug=${encodeURIComponent(a.slug)}">
        <h3>${esc(a.title)}</h3><span class="date">${ArticleEngine.fmtDate(a.date)}</span>
        <p>${esc(a.summary)}</p>
        <div class="tags">${(a.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </a>`).join("") + "</div>";
  }).catch(err => { al.innerHTML = '<p class="article-error">Could not load articles. Serve over http(s).</p>'; console.error(err); });

  /* ---- reveal ---- */
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---- hero motif: animated "efficient frontier" curve drawing in ---- */
  const svg = $("#hero-svg");
  if (svg) {
    const NS = "http://www.w3.org/2000/svg";
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // a smooth concave frontier curve
    const pts = [];
    for (let i = 0; i <= 60; i++) {
      const x = i / 60;
      const y = 1 - Math.sqrt(x) * 0.92;           // concave frontier
      pts.push([40 + x * 320, 40 + y * 320]);
    }
    const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
    // axes
    const ax = document.createElementNS(NS, "path");
    ax.setAttribute("d", "M40 40 V360 H360");
    ax.setAttribute("fill", "none"); ax.setAttribute("stroke", "var(--line)"); ax.setAttribute("stroke-width", "2");
    svg.appendChild(ax);
    // frontier
    const path = document.createElementNS(NS, "path");
    path.setAttribute("d", d); path.setAttribute("fill", "none");
    path.setAttribute("stroke", "var(--accent)"); path.setAttribute("stroke-width", "3");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
    const len = path.getTotalLength();
    if (!reduce) {
      path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
      path.style.transition = "stroke-dashoffset 1.8s cubic-bezier(.6,0,.2,1)";
      requestAnimationFrame(() => requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; }));
    }
    // scattered "portfolios" below the frontier
    const dots = [[120, 250], [180, 210], [250, 290], [300, 230], [210, 300], [150, 320], [280, 320]];
    dots.forEach((p, i) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p[0]); c.setAttribute("cy", p[1]); c.setAttribute("r", "5");
      c.setAttribute("fill", "var(--accent)"); c.setAttribute("opacity", "0");
      svg.appendChild(c);
      if (reduce) { c.setAttribute("opacity", ".35"); return; }
      c.style.transition = "opacity .5s ease " + (0.9 + i * 0.12) + "s, transform .5s ease " + (0.9 + i * 0.12) + "s";
      c.style.transformOrigin = p[0] + "px " + p[1] + "px";
      c.style.transform = "scale(0)";
      requestAnimationFrame(() => requestAnimationFrame(() => { c.setAttribute("opacity", ".4"); c.style.transform = "scale(1)"; }));
    });
    // the optimal point on the frontier
    const opt = document.createElementNS(NS, "circle");
    const op = pts[18];
    opt.setAttribute("cx", op[0]); opt.setAttribute("cy", op[1]); opt.setAttribute("r", "7");
    opt.setAttribute("fill", "var(--accent)"); opt.setAttribute("stroke", "var(--bg)"); opt.setAttribute("stroke-width", "3");
    opt.setAttribute("opacity", "0");
    svg.appendChild(opt);
    if (reduce) opt.setAttribute("opacity", "1");
    else { opt.style.transition = "opacity .5s ease 2.4s"; requestAnimationFrame(() => requestAnimationFrame(() => opt.setAttribute("opacity", "1"))); }
  }
})();
