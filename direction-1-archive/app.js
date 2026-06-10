/* Direction 1 — Archive : render homepage from PORTFOLIO_DATA */
(function () {
  "use strict";
  const D = window.PORTFOLIO_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  /* ---- identity ---- */
  $("#brand").innerHTML = D.name + '<span class="dot">.</span>';
  document.title = D.name + " — " + D.role;
  $("#hero-name").innerHTML = "I’m " + esc(D.name.split(" ")[0]) + ",<br>a <em>quant-minded</em> mathematician.";
  $("#hero-lede").textContent = D.tagline;
  $("#hero-meta").innerHTML = [
    ["Field", D.role.split(" · ")[0]],
    ["Based", D.location],
    ["Status", D.facts.find(f => f.label === "Currently")?.value || ""]
  ].map(([k, v]) => `<span><b>${esc(k)}</b> &nbsp;${esc(v)}</span>`).join("");

  /* ---- about ---- */
  $("#about-body").innerHTML =
    '<div class="about">' + D.about.map(p => `<p>${esc(p)}</p>`).join("") + "</div>" +
    '<div class="facts">' + D.facts.map(f =>
      `<div><div class="k">${esc(f.label)}</div><div class="v">${esc(f.value)}</div></div>`).join("") + "</div>";

  /* ---- papers ---- */
  $("#papers-body").innerHTML = D.papers.map(p => `
    <article class="paper">
      <div class="yr">${esc(p.year)} · ${esc(p.venue)}</div>
      <h3>${esc(p.title)}</h3>
      <div class="authors">${esc(p.authors)}</div>
      <p class="abs">${esc(p.abstract)}</p>
      <div class="lnks">${p.links.map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}</div>
    </article>`).join("");

  /* ---- projects ---- */
  $("#projects-body").innerHTML =
    '<div class="projects">' + D.projects.map(p => `
      <a class="proj" href="${esc(p.href)}">
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.blurb)}</p>
        <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </a>`).join("") + "</div>";

  /* ---- experience + education timelines ---- */
  const tl = (item, isEdu) => `
    <div class="tl">
      <div class="period">${esc(item.period)}</div>
      <div>
        <h3>${esc(isEdu ? item.degree : item.role)}</h3>
        <div class="org">${esc(item.org)}</div>
        <p class="det">${esc(item.detail)}</p>
      </div>
    </div>`;
  $("#experience-body").innerHTML = '<div class="timeline">' + D.experience.map(e => tl(e, false)).join("") + "</div>";
  $("#education-body").innerHTML = '<div class="timeline">' + D.education.map(e => tl(e, true)).join("") + "</div>";

  /* ---- contact ---- */
  $("#contact-body").innerHTML =
    '<div class="contact-grid">' + D.links.map(l =>
      `<a href="${esc(l.href)}" target="_blank" rel="noopener">
         <div class="cl">${esc(l.label)}</div><div class="ch">${esc(l.handle)}</div>
       </a>`).join("") + "</div>" +
    `<div class="cta-row">
       <a class="btn solid" href="mailto:${esc(D.email)}">Get in touch</a>
       <a class="btn" href="${esc(D.resumeHref)}" target="_blank" rel="noopener">Download CV (PDF)</a>
     </div>`;

  /* ---- articles (from manifest) ---- */
  const al = $("#articles-body");
  ArticleEngine.getArticles("../shared").then(list => {
    if (!list.length) { al.innerHTML = "<p>No articles yet.</p>"; return; }
    al.innerHTML = '<div class="articles-list">' + list.map(a => `
      <a class="art-item" href="article.html?slug=${encodeURIComponent(a.slug)}">
        <h3>${esc(a.title)}</h3>
        <span class="date">${ArticleEngine.fmtDate(a.date)}</span>
        <p>${esc(a.summary)}</p>
        <div class="tags">${(a.tags || []).map(t => `<span>${esc(t)}</span>`).join("")}</div>
      </a>`).join("") + "</div>";
  }).catch(err => {
    al.innerHTML = '<p class="article-error">Could not load articles. Serve over http (not file://).</p>';
    console.error(err);
  });

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  /* ---- hero: faint geometric Brownian motion paths (quant nod) ---- */
  const cv = $("#hero-canvas");
  if (cv && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = cv.getContext("2d");
    let W, H, dpr, paths, t0;
    const N = 7, STEPS = 240;
    function rnd() { return Math.random() * 2 - 1; }
    function build() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paths = [];
      for (let i = 0; i < N; i++) {
        const pts = []; let v = 0.5 + (i / N - 0.5) * 0.5;
        for (let s = 0; s <= STEPS; s++) { v += 0.012 * rnd() + 0.0007; pts.push(v); }
        paths.push(pts);
      }
      t0 = performance.now();
    }
    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      const prog = Math.min(1, (now - t0) / 2600);
      const ease = 1 - Math.pow(1 - prog, 3);
      ctx.lineWidth = 1;
      paths.forEach((pts, i) => {
        ctx.beginPath();
        const shown = Math.floor(ease * STEPS);
        for (let s = 0; s <= shown; s++) {
          const x = (s / STEPS) * W;
          const y = H * (0.92 - (pts[s] - 0.3) * 0.6);
          s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(138,43,34,${0.05 + i * 0.012})`;
        ctx.stroke();
      });
      if (prog < 1) requestAnimationFrame(draw);
    }
    const start = () => { build(); requestAnimationFrame(draw); };
    addEventListener("resize", () => { clearTimeout(cv._r); cv._r = setTimeout(start, 200); });
    start();
  }
})();
