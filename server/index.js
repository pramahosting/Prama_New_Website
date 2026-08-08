import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { initSchema } from "./src/db.js";
import contactRouter from "./src/routes/contact.js";
import chatRouter from "./src/routes/chat.js";
import { staticRoutes, findMeta, buildHeadTags, DOMAIN_URL } from "./src/seoMeta.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "client", "dist");
const INDEX_HTML_PATH = path.join(DIST_DIR, "index.html");
const PORT = process.env.PORT || 8787;

const app = express();
app.disable("x-powered-by");
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "200kb" }));

// ---------- API ----------
app.use("/api", contactRouter);
app.use("/api", chatRouter);
app.get("/api/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

// ---------- SEO: sitemap.xml ----------
app.get("/sitemap.xml", (_req, res) => {
  const urls = staticRoutes
    .map(
      (r) => `  <url>
    <loc>${DOMAIN_URL}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.type("application/xml").send(xml);
});

// ---------- Static assets ----------
let indexHtmlTemplate = "";
try {
  indexHtmlTemplate = fs.readFileSync(INDEX_HTML_PATH, "utf-8");
} catch {
  console.warn("[server] client/dist/index.html not found — run `npm run build` in /client first.");
}

function renderIndex(req, res) {
  if (!indexHtmlTemplate) {
    return res.status(503).send("Site is building — please try again shortly.");
  }

  const meta = findMeta(req.path);
  let html = indexHtmlTemplate;

  if (meta) {
    const headTags = buildHeadTags(meta);
    html = html.replace(/<!--app-head-->[\s\S]*?<!--app-head-end-->/, headTags);
  }

  res.set("Content-Type", "text/html").send(html);
}

// Handle the root and any extensionless (page) route as an SSR-lite index render
// BEFORE static, so requesting "/" doesn't hit static's directory-404 error path.
app.get("/", renderIndex);

app.use(
  express.static(DIST_DIR, {
    index: false, // we handle index.html manually to inject per-route SEO tags
    maxAge: "1y",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
    },
  })
);

// ---------- SSR-lite: inject per-route <head> tags, then hand off to the SPA ----------
app.get("/*splat", renderIndex);

// ---------- Start ----------
initSchema().finally(() => {
  app.listen(PORT, () => {
    console.log(`[server] Prama AI site running on port ${PORT}`);
  });
});
