// @astrojs/vercel 7 only knows Node 18 and 20, and falls back to the retired
// nodejs18.x for anything else — including the Node that Vercel builds with.
// Pin the forum function to a supported runtime after the build instead of
// upgrading the whole site to Astro 5 just for this.
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";

const RUNTIME = "nodejs22.x";
const dir = ".vercel/output/functions";
if (existsSync(dir)) {
  for (const fn of readdirSync(dir)) {
    const file = `${dir}/${fn}/.vc-config.json`;
    if (!existsSync(file)) continue;
    const cfg = JSON.parse(readFileSync(file, "utf8"));
    cfg.runtime = RUNTIME;
    writeFileSync(file, JSON.stringify(cfg, null, 2));
    console.log(`${fn}: runtime → ${RUNTIME}`);
  }
}

// Photographs were served with `max-age=0`, so a returning visitor re-checked
// every one. A day's cache is safe even when a photo is replaced in Airtable
// under the same record id: the change shows within a day of the next deploy.
// Vercel reads routes from the adapter's config.json, not vercel.json, so the
// header goes in here, ahead of the adapter's own routes.
const configFile = ".vercel/output/config.json";
if (existsSync(configFile)) {
  const config = JSON.parse(readFileSync(configFile, "utf8"));
  const route = {
    src: "^/photos/(.*)$",
    headers: { "cache-control": "public, max-age=86400" },
    continue: true,
  };
  if (!config.routes.some((r) => r.src === route.src)) {
    config.routes.unshift(route);
    writeFileSync(configFile, JSON.stringify(config, null, 2));
    console.log("photos: cache-control → public, max-age=86400");
  }
}
