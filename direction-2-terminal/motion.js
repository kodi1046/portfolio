/* =============================================================================
   motion.js — fluid interaction layer for the Terminal direction
   Exposes window.Motion = { scramble, initMagnetic, initReveal, initScrollSpy,
                             initSmoothScroll, sound }
   ============================================================================= */
(function () {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>=*+-_$#%".split("");

  /* ---- text scramble / decode ------------------------------------------- */
  function scramble(el, finalText, opts) {
    finalText = finalText != null ? finalText : el.textContent;
    const o = Object.assign({ speed: 1, settle: 0.55 }, opts || {});
    if (reduce) { el.textContent = finalText; return Promise.resolve(); }
    const chars = finalText.split("");
    const start = performance.now();
    const dur = (260 + finalText.length * 26) / o.speed;
    el.classList.add("scrambling");
    return new Promise((resolve) => {
      function frame(now) {
        const p = Math.min(1, (now - start) / dur);
        let out = "";
        for (let i = 0; i < chars.length; i++) {
          const ch = chars[i];
          if (ch === " " || ch === "\n") { out += ch; continue; }
          const reveal = p * chars.length;
          if (i < reveal - 1) out += ch;
          else if (i < reveal + 3) out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
          else out += (Math.random() < 0.5 ? GLYPHS[(Math.random() * GLYPHS.length) | 0] : " ");
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(frame);
        else { el.textContent = finalText; el.classList.remove("scrambling"); resolve(); }
      }
      requestAnimationFrame(frame);
    });
  }

  /* ---- magnetic elements ------------------------------------------------- */
  function initMagnetic(selector, strength) {
    if (reduce || matchMedia("(pointer: coarse)").matches) return;
    strength = strength || 0.4;
    document.querySelectorAll(selector).forEach((el) => {
      const inner = el.querySelector(".mag-inner") || el;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px, ${y}px)`;
        inner.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
        inner.style.transform = "";
      });
    });
  }

  /* ---- reveal on scroll (+ scramble headings, + stagger children) ------- */
  function initReveal() {
    // assign stagger indices to every .flow container's direct children
    document.querySelectorAll(".flow").forEach((c) => {
      [...c.children].forEach((ch, i) => ch.style.setProperty("--i", i));
    });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        const s = e.target.querySelector("[data-scramble]");
        if (s && !s.dataset.done) { s.dataset.done = "1"; scramble(s, s.dataset.scramble || s.textContent); }
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* ---- scroll spy -------------------------------------------------------- */
  function initScrollSpy(navSelector) {
    const links = [...document.querySelectorAll(navSelector + " a[href^='#']")];
    const map = new Map();
    links.forEach((a) => { const id = a.getAttribute("href").slice(1); const sec = document.getElementById(id); if (sec) map.set(sec, a); });
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const a = map.get(e.target); if (a) a.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    map.forEach((_a, sec) => io.observe(sec));
  }

  /* ---- smooth momentum scroll (Lenis) + parallax ------------------------ */
  function initSmoothScroll(parallaxSelector) {
    let lenis = null;
    if (!reduce && window.Lenis) {
      try {
        lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
        function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
        // anchor links
        document.addEventListener("click", (e) => {
          const a = e.target.closest('a[href^="#"]');
          if (!a) return;
          const id = a.getAttribute("href");
          if (id.length < 2) return;
          const t = document.querySelector(id);
          if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -28 }); }
        });
        // parallax
        const px = parallaxSelector ? [...document.querySelectorAll(parallaxSelector)] : [];
        lenis.on("scroll", ({ scroll }) => {
          px.forEach((el) => { const d = parseFloat(el.dataset.depth || "0.1"); el.style.transform = `translateY(${scroll * d}px)`; });
        });
      } catch (err) { console.warn("Lenis init failed", err); lenis = null; }
    }
    if (!lenis) {
      // graceful fallback: native smooth anchors
      document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a || a.getAttribute("href").length < 2) return;
        const t = document.querySelector(a.getAttribute("href"));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }
      });
    }
    return lenis;
  }

  /* ---- subtle sound + haptics (off by default) -------------------------- */
  const sound = {
    on: false, ctx: null,
    enable() { this.on = true; try { this.ctx = this.ctx || new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} },
    disable() { this.on = false; },
    tick(freq, vol) {
      if (navigator.vibrate && matchMedia("(pointer: coarse)").matches) navigator.vibrate(6);
      if (!this.on || !this.ctx) return;
      const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = "sine"; o.frequency.value = freq || 660;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol || 0.04, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      o.connect(g); g.connect(this.ctx.destination); o.start(t); o.stop(t + 0.1);
    }
  };

  window.Motion = { scramble, initMagnetic, initReveal, initScrollSpy, initSmoothScroll, sound, reduce };
})();
