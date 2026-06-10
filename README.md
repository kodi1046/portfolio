# Portfolio website

Three complete, hostable design directions for a personal portfolio
(mathematics · computer science · quantitative finance). All three share **one
content file** and **one Markdown + LaTeX article engine** — only the design
differs. Open `index.html` to compare them.

```
.
├── index.html                  ← landing page: choose a direction
├── shared/                     ← shared by ALL directions (edit once)
│   ├── data.js                 ← YOUR content: bio, papers, projects, CV, links
│   ├── reader.js               ← Markdown + KaTeX rendering engine
│   ├── articles.json           ← list of articles (manifest)
│   ├── articles/               ← your articles, as .md files
│   │   ├── brownian-bridge-variance-reduction.md
│   │   └── notes-on-spectral-gaps.md
│   └── resume.pdf              ← (add your own) linked by the "Download CV" buttons
├── direction-1-archive/        ← editorial / serif / warm
├── direction-2-terminal/       ← technical / mono / dark
├── direction-3-index/          ← modern / sans / light+dark toggle
└── build-articles.mjs          ← optional: auto-update articles.json
```

Each `direction-*/` folder has its own `index.html`, `article.html`, `theme.css`
and `app.js`, but they all read from `../shared/`.

---

## Editing your content

**Bio, papers, projects, experience, education, links** → edit **`shared/data.js`**.
It is one well-commented object. Change it once and all three sites update.

**Your resume** → drop a `resume.pdf` into `shared/` (or change `resumeHref` in
`data.js` to point anywhere).

---

## Adding an article

1. Write a Markdown file and save it in **`shared/articles/`**, e.g.
   `shared/articles/my-new-post.md`. Math works with `$inline$` and `$$display$$`
   LaTeX, plus code blocks, tables, blockquotes.
2. Tell the site about it. Either:
   - **Run the helper:** `node build-articles.mjs` — it scans the folder and adds
     any new files to `shared/articles.json` automatically (existing entries are
     preserved). Optionally put frontmatter at the top of the `.md` for a custom
     title/date/summary/tags:
     ```
     ---
     title: My New Post
     date: 2026-06-01
     summary: A one-line description shown in the list.
     tags: [Quant, Probability]
     ---
     ```
   - **Or edit by hand:** add one entry to the `articles` array in
     `shared/articles.json`.
3. Done — the article appears in the "Writing" section of all three designs.

---

## Running locally

The article engine uses `fetch()`, which browsers block on `file://`. So **don't
just double-click `index.html`** — serve the folder over HTTP:

```bash
# any one of these, from the project root:
python3 -m http.server 8000      # then open http://localhost:8000
npx serve .
```

---

## Deploying

This is a 100% static site — no build step required (the article helper is
optional). Pick one:

### GitHub Pages
1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` / `root`.
3. Your site goes live at `https://<user>.github.io/<repo>/`.
   (Links here are all relative, so it works in a subfolder.)

### Vercel
1. Push to GitHub and **Import Project** in Vercel (or run `vercel` in this folder).
2. Framework preset: **Other**. No build command. Output directory: project root.
3. Deploy.

### Picking one direction
Once you've chosen, you can keep just that `direction-*/` folder plus `shared/`,
and either move its files to the root or set the chosen folder's `index.html` as
your entry point. Tell me which one and I'll wire it up cleanly.

---

## Notes
- Fonts load from Google Fonts; KaTeX and the Markdown parser load from a CDN.
  All can be vendored locally later if you want a fully offline/self-hosted build.
- Replace the sample (Lorem Ipsum) content in `shared/data.js` with your own.
