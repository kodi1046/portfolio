/* =============================================================================
   ARTICLE ENGINE  —  shared across all design directions
   -----------------------------------------------------------------------------
   - getArticles(base)        -> Promise<Array> of manifest entries (newest first)
   - renderArticlePage(opts)  -> loads ?slug=, renders Markdown + LaTeX math
   Requires (loaded via CDN on the page):
     marked, katex, katex auto-render (renderMathInElement)
   ============================================================================= */
(function () {
  "use strict";

  function manifestURL(base) { return base.replace(/\/$/, "") + "/articles.json"; }
  function articleURL(base, file) { return base.replace(/\/$/, "") + "/articles/" + file; }

  async function getArticles(base) {
    const res = await fetch(manifestURL(base), { cache: "no-cache" });
    if (!res.ok) throw new Error("Could not load articles.json (" + res.status + ")");
    const data = await res.json();
    const list = (data.articles || []).slice();
    list.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
    return list;
  }

  // Protect math from the Markdown parser, then restore + typeset after.
  function renderMarkdownWithMath(md, targetEl) {
    const store = [];
    // Display math $$...$$  (also \[ ... \])
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      store.push({ display: true, tex });
      return "\uE000" + (store.length - 1) + "\uE001";
    });
    // Inline math $...$  (single line, not currency-ish "$5 and $6")
    md = md.replace(/(?<!\\)\$(?!\s)([^\n$]+?)(?<!\s)\$/g, (_, tex) => {
      store.push({ display: false, tex });
      return "\uE000" + (store.length - 1) + "\uE001";
    });

    let html = marked.parse(md, { mangle: false, headerIds: true });

    html = html.replace(/\uE000(\d+)\uE001/g, (_, i) => {
      const m = store[+i];
      try {
        return katex.renderToString(m.tex, {
          displayMode: m.display,
          throwOnError: false,
          strict: false
        });
      } catch (e) {
        return '<code class="math-error">' + m.tex + "</code>";
      }
    });

    targetEl.innerHTML = html;
  }

  function fmtDate(iso) {
    try {
      return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
        year: "numeric", month: "long", day: "numeric"
      });
    } catch (e) { return iso; }
  }

  async function renderArticlePage(opts) {
    const o = Object.assign({
      base: "../shared",
      titleEl: "#article-title",
      metaEl: "#article-meta",
      bodyEl: "#article-body",
      tagsEl: "#article-tags",
      listHref: "index.html#articles"
    }, opts || {});

    const $ = (s) => document.querySelector(s);
    const body = $(o.bodyEl);
    const params = new URLSearchParams(location.search);
    const slug = params.get("slug");

    if (!slug) {
      body.innerHTML = '<p>No article selected. <a href="' + o.listHref + '">Back to all articles →</a></p>';
      return;
    }

    try {
      const list = await getArticles(o.base);
      const entry = list.find((a) => a.slug === slug);
      if (!entry) throw new Error("Article not found: " + slug);

      if ($(o.titleEl)) $(o.titleEl).textContent = entry.title;
      document.title = entry.title;
      if ($(o.metaEl)) $(o.metaEl).textContent = fmtDate(entry.date);
      if ($(o.tagsEl) && entry.tags) {
        $(o.tagsEl).innerHTML = entry.tags
          .map((t) => '<span class="tag">' + t + "</span>").join("");
      }

      const res = await fetch(articleURL(o.base, entry.file), { cache: "no-cache" });
      if (!res.ok) throw new Error("Could not load " + entry.file);
      let md = await res.text();
      // Strip a leading top-level "# Title" — it's already shown as the page title.
      md = md.replace(/^\uFEFF?\s*#\s+.*(?:\r?\n)+/, "");
      renderMarkdownWithMath(md, body);

      // KaTeX already rendered inline; this catches any leftover delimiters.
      if (window.renderMathInElement) {
        renderMathInElement(body, {
          delimiters: [
            { left: "$$", right: "$$", display: true },
            { left: "$", right: "$", display: false }
          ],
          throwOnError: false
        });
      }
    } catch (err) {
      body.innerHTML =
        '<p class="article-error">Could not load this article.<br><small>' +
        (err && err.message ? err.message : err) +
        '</small></p><p><a href="' + o.listHref + '">← Back to all articles</a></p>';
      console.error(err);
    }
  }

  window.ArticleEngine = { getArticles, renderArticlePage, fmtDate };
})();
