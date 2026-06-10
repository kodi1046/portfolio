/* =============================================================================
   chart.js — interactive GBM price path with hover crosshair + scrub readout
   window.InteractiveChart(canvas, { onReadout })
   ============================================================================= */
(function () {
  "use strict";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function InteractiveChart(canvas, opts) {
    opts = opts || {};
    const ctx = canvas.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const accent = (css.getPropertyValue("--accent") || "#5fe3a1").trim();
    const blue = (css.getPropertyValue("--blue") || "#5cb8ff").trim();
    const grid = (css.getPropertyValue("--border") || "#212a27").trim();
    const dim = (css.getPropertyValue("--dim") || "#50605a").trim();
    const down = "#ff6f8f";

    const N = 180, MU = 0.08, SIG = 0.22, DT = 1 / 252;
    let W, H, dpr, prices, hoverX = null, paused = false, raf, lastTs = 0, acc = 0;

    function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
    function seed() { prices = []; let p = 100; for (let i = 0; i < N; i++) { prices.push(p); p *= Math.exp((MU - 0.5 * SIG * SIG) * DT + SIG * Math.sqrt(DT) * gauss()); } }
    function step() { let p = prices[prices.length - 1] * Math.exp((MU - 0.5 * SIG * SIG) * DT + SIG * Math.sqrt(DT) * gauss()); prices.push(p); if (prices.length > N) prices.shift(); }

    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const PADX = 0, PADY = 14;
    function xOf(i) { return PADX + (i / (N - 1)) * (W - PADX * 2); }
    function iOfX(x) { return Math.max(0, Math.min(N - 1, Math.round(((x - PADX) / (W - PADX * 2)) * (N - 1)))); }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const min = Math.min(...prices), max = Math.max(...prices), pad = (max - min) * 0.14 || 1;
      const lo = min - pad, hi = max + pad;
      const yOf = (p) => PADY + (1 - (p - lo) / (hi - lo)) * (H - PADY * 2);

      // grid
      ctx.strokeStyle = grid; ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) { const y = PADY + (g / 4) * (H - PADY * 2); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      const up = prices[prices.length - 1] >= prices[0];
      const col = up ? accent : down;

      // area
      ctx.beginPath(); ctx.moveTo(xOf(0), yOf(prices[0]));
      prices.forEach((p, i) => ctx.lineTo(xOf(i), yOf(p)));
      ctx.lineTo(xOf(N - 1), H); ctx.lineTo(xOf(0), H); ctx.closePath();
      const grd = ctx.createLinearGradient(0, 0, 0, H);
      const rgb = up ? "95,227,161" : "255,111,143";
      grd.addColorStop(0, `rgba(${rgb},0.20)`); grd.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grd; ctx.fill();

      // line (blue→mint gradient when up, solid pink when down)
      ctx.beginPath(); ctx.moveTo(xOf(0), yOf(prices[0]));
      prices.forEach((p, i) => ctx.lineTo(xOf(i), yOf(p)));
      if (up) { const lg = ctx.createLinearGradient(0, 0, W, 0); lg.addColorStop(0, blue); lg.addColorStop(1, accent); ctx.strokeStyle = lg; }
      else ctx.strokeStyle = down;
      ctx.lineWidth = 1.8; ctx.lineJoin = "round"; ctx.stroke();

      // last point
      const lx = xOf(N - 1), ly = yOf(prices[N - 1]);
      ctx.beginPath(); ctx.arc(lx, ly, 3, 0, 7); ctx.fillStyle = col; ctx.fill();

      // crosshair
      if (hoverX != null) {
        const i = iOfX(hoverX), x = xOf(i), y = yOf(prices[i]);
        ctx.strokeStyle = dim; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(x, y, 4.5, 0, 7); ctx.fillStyle = col; ctx.fill();
        ctx.strokeStyle = (css.getPropertyValue("--bg") || "#0b0e0d").trim(); ctx.lineWidth = 2; ctx.stroke();
      }

      // readout
      if (opts.onReadout) {
        const i = hoverX != null ? iOfX(hoverX) : N - 1;
        opts.onReadout({
          price: prices[i],
          ret: (prices[i] / prices[0] - 1) * 100,
          day: i,
          up
        });
      }
    }

    function loop(ts) {
      if (!lastTs) lastTs = ts; acc += ts - lastTs; lastTs = ts;
      if (!paused && acc > 90) { step(); acc = 0; }
      draw(); raf = requestAnimationFrame(loop);
    }

    // interaction
    canvas.addEventListener("mousemove", (e) => { const r = canvas.getBoundingClientRect(); hoverX = e.clientX - r.left; paused = true; if (reduce) draw(); });
    canvas.addEventListener("mouseleave", () => { hoverX = null; paused = false; });
    canvas.addEventListener("touchmove", (e) => { const r = canvas.getBoundingClientRect(); hoverX = e.touches[0].clientX - r.left; paused = true; if (reduce) draw(); }, { passive: true });
    canvas.addEventListener("touchend", () => { hoverX = null; paused = false; });

    function start() {
      resize(); seed(); draw();
      if (!reduce) { cancelAnimationFrame(raf); lastTs = 0; raf = requestAnimationFrame(loop); }
    }
    addEventListener("resize", () => { clearTimeout(canvas._r); canvas._r = setTimeout(start, 180); });
    start();
    return { reseed: () => { seed(); draw(); } };
  }

  window.InteractiveChart = InteractiveChart;
})();
