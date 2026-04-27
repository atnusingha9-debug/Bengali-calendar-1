import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist/public");
const ssrEntry = resolve(__dirname, "dist/ssr/entry-server.mjs");
const templatePath = join(distDir, "index.html");

if (!existsSync(templatePath)) {
  console.error(`prerender: template not found at ${templatePath}`);
  process.exit(1);
}
if (!existsSync(ssrEntry)) {
  console.error(`prerender: SSR bundle not found at ${ssrEntry}`);
  process.exit(1);
}

const template = readFileSync(templatePath, "utf-8");
const { renderRoute, buildRoutes } = await import(ssrEntry);

const routes = buildRoutes();
const sitemapEntries = [];

for (const route of routes) {
  if (route.path === "*") continue;

  const { html: rawHtml, head } = renderRoute(route.path);

  // React 19 emits <title>/<meta>/<link>/<script application/ld+json> as
  // ordinary children in the body. Hoist them to <head> so search engines
  // (which only inspect head metadata) see them.
  const hoisted = [];
  const stripPattern =
    /<(title|meta|link)\b[^>]*?(?:\/>|><\/\1>)|<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi;
  const html = rawHtml.replace(stripPattern, (m) => {
    hoisted.push(m);
    return "";
  });

  let page = template.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  page = page.replace(/<meta\s+name="description"[\s\S]*?\/>\s*/i, "");
  page = page.replace(
    "</head>",
    `    ${head}\n    ${hoisted.join("\n    ")}\n  </head>`,
  );
  page = page.replace(
    '<div id="root"></div>',
    `<div id="root">${html}</div>`,
  );

  const outPath =
    route.path === "/"
      ? join(distDir, "index.html")
      : join(distDir, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page, "utf-8");
  sitemapEntries.push(route.path);
  console.log(`✓ ${route.path}`);
}

writeFileSync(
  join(distDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml\n`,
);

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemapEntries
    .map(
      (p) =>
        `  <url><loc>${p}</loc><lastmod>${today}</lastmod><changefreq>${
          p === "/" ? "daily" : "weekly"
        }</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(distDir, "sitemap.xml"), sitemap);

console.log(`\nPrerendered ${sitemapEntries.length} routes.`);
