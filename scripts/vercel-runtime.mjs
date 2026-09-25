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
