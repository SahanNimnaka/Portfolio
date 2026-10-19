#!/usr/bin/env node
import { spawn } from "node:child_process";
import process from "node:process";

const port = process.env.SMOKE_PORT ?? "3471";
const base = `http://127.0.0.1:${port}`;
const failures = [];
const passes = [];

function check(name, condition, detail = "") {
  if (condition) {
    passes.push(name);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function decode(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x2F;/g, "/");
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)="([^"]*)"/g)) {
    result[match[1].toLowerCase()] = decode(match[2]);
  }
  return result;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) =>
    attributes(match[0]),
  );
}

function meta(html, key, value = key) {
  return tags(html, "meta").find(
    (tag) => tag[key] === value || tag[key] === value.toLowerCase(),
  )?.content;
}

function canonicalPath(html) {
  const href = tags(html, "link").find((tag) => tag.rel === "canonical")?.href;
  if (!href) return null;
  try {
    return new URL(href, base).pathname;
  } catch {
    return null;
  }
}

function jsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  return blocks.map((match) => {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  });
}

async function fetchPage(path, options = {}) {
  const response = await fetch(base + path, {
    redirect: "manual",
    ...options,
    headers: { "cache-control": "no-cache", ...(options.headers ?? {}) },
  });
  const body = await response.text();
  return { response, body };
}

async function waitForServer(child) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (child.exitCode !== null) return false;
    try {
      const response = await fetch(base + "/", { cache: "no-store" });
      await response.text();
      if (response.status === 200) return true;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return false;
}

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", port, "-H", "127.0.0.1"],
  {
    cwd: process.cwd(),
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);

let serverOutput = "";
child.stdout.on("data", (data) => {
  serverOutput += data.toString();
});
child.stderr.on("data", (data) => {
  serverOutput += data.toString();
});

try {
  const ready = await waitForServer(child);
  check("production server starts", ready, serverOutput.trim().slice(-500));
  if (!ready) throw new Error("Server did not become ready");

  const home = await fetchPage("/");
  const homeHtml = home.body;

  check("home responds with 200", home.response.status === 200, String(home.response.status));
  check("home has no x-powered-by header", !home.response.headers.has("x-powered-by"));
  check("home title names Sahan", /<title>[^<]*Sahan Nimnaka/i.test(homeHtml));
  check(
    "home description is present",
    (meta(homeHtml, "name", "description") ?? "").length >= 60,
  );
  check("home canonical is /", canonicalPath(homeHtml) === "/");
  check(
    "home Open Graph metadata is absolute and complete",
    Boolean(meta(homeHtml, "property", "og:title")) &&
      Boolean(meta(homeHtml, "property", "og:description")) &&
      /^https?:\/\//.test(meta(homeHtml, "property", "og:image") ?? ""),
  );
  check(
    "home Twitter card metadata is present",
    Boolean(meta(homeHtml, "name", "twitter:card")) &&
      /^https?:\/\//.test(meta(homeHtml, "name", "twitter:image") ?? ""),
  );

  const icons = tags(homeHtml, "link").filter(
    (tag) => tag.rel === "icon" || tag.rel === "apple-touch-icon",
  );
  check("icon links are present", icons.length >= 2, `${icons.length} found`);

  const structured = jsonLd(homeHtml);
  check(
    "home structured data parses",
    structured.length > 0 && structured.every(Boolean),
    `${structured.length} block(s)`,
  );
  const graph = structured.flatMap((entry) => entry?.["@graph"] ?? []);
  check(
    "structured data identifies the person and website",
    graph.some((entry) => entry["@type"] === "Person") &&
      graph.some((entry) => entry["@type"] === "WebSite"),
  );

  const ogImageUrl = meta(homeHtml, "property", "og:image");
  if (ogImageUrl) {
    const imagePath = new URL(ogImageUrl, base).pathname;
    const image = await fetch(base + imagePath);
    const bytes = (await image.arrayBuffer()).byteLength;
    check(
      "Open Graph image is served",
      image.status === 200 &&
        (image.headers.get("content-type") ?? "").includes("image/png") &&
        bytes > 10_000,
      `${image.status}, ${bytes} bytes`,
    );
  }

  for (const icon of icons) {
    if (!icon.href || !icon.href.startsWith("/")) continue;
    const iconResponse = await fetch(base + icon.href);
    check(`icon ${icon.rel} is served`, iconResponse.status === 200, String(iconResponse.status));
  }

  const sitemap = await fetchPage("/sitemap.xml");
  check("sitemap responds with 200", sitemap.response.status === 200);
  check(
    "sitemap is XML",
    (sitemap.response.headers.get("content-type") ?? "").includes("xml"),
  );
  const locations = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    decode(match[1]),
  );
  check("sitemap lists every route", locations.length === 5, `${locations.length} URLs`);
  check(
    "sitemap URLs are absolute",
    locations.every((location) => /^https?:\/\//.test(location)),
  );

  const robots = await fetchPage("/robots.txt");
  check("robots.txt responds with 200", robots.response.status === 200);
  check("robots.txt links the sitemap", /Sitemap:\s*https?:\/\//i.test(robots.body));

  const homeHrefs = tags(homeHtml, "a")
    .map((tag) => tag.href)
    .filter(Boolean);
  const hashTargets = new Set(
    homeHrefs
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1)),
  );
  for (const id of hashTargets) {
    check(`home anchor target #${id} exists`, new RegExp(`id="${id}"`).test(homeHtml));
  }

  const internalPaths = new Set(
    homeHrefs
      .filter((href) => href.startsWith("/"))
      .map((href) => {
        const [path, hash] = href.split("#");
        return { path: path || "/", hash };
      })
      .filter(({ path }) => !path.startsWith("/_next/") && path !== "/resume.pdf")
      .map(({ path }) => path),
  );

  for (const path of internalPaths) {
    const page = await fetchPage(path);
    check(`internal link ${path} responds`, page.response.status < 400, String(page.response.status));
  }

  for (const location of locations) {
    const path = new URL(location).pathname;
    const page = await fetchPage(path);
    check(`sitemap route ${path} responds`, page.response.status === 200, String(page.response.status));
    check(`sitemap route ${path} has a canonical`, canonicalPath(page.body) === path);
    check(
      `sitemap route ${path} has Open Graph metadata`,
      Boolean(meta(page.body, "property", "og:title")),
    );

    if (path !== "/") {
      check(
        `case study ${path} uses article Open Graph type`,
        meta(page.body, "property", "og:type") === "article",
      );
      check(
        `case study ${path} has an Open Graph image`,
        /^https?:\/\//.test(meta(page.body, "property", "og:image") ?? ""),
      );
      check(
        `case study ${path} has a Twitter image`,
        /^https?:\/\//.test(meta(page.body, "name", "twitter:image") ?? ""),
      );
      const pageHrefs = tags(page.body, "a").map((tag) => tag.href).filter(Boolean);
      for (const href of pageHrefs.filter((value) => value.startsWith("#"))) {
        check(
          `case study ${path} anchor target ${href} exists`,
          new RegExp(`id="${href.slice(1)}"`).test(page.body),
        );
      }
    }
  }

  const missing = await fetchPage("/this-page-should-not-exist");
  check("unknown route returns 404", missing.response.status === 404, String(missing.response.status));
  check("unknown route has a title", /<title>[^<]+<\/title>/i.test(missing.body));
  check(
    "unknown route is not marked indexable",
    !/name="robots"[^>]*content="index, follow"/i.test(missing.body),
  );
} catch (error) {
  failures.push(`smoke run failed — ${error.message}`);
} finally {
  if (child.exitCode === null) {
    child.kill();
    await new Promise((resolve) => {
      const timer = setTimeout(resolve, 3000);
      child.once("close", () => {
        clearTimeout(timer);
        resolve();
      });
    });
  }
}

console.log(`\nSmoke checks: ${passes.length} passed, ${failures.length} failed`);
if (failures.length > 0) {
  console.error("\nFailures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Smoke suite passed.");
}
