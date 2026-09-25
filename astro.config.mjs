// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import vercel from '@astrojs/vercel/serverless';
import { readFileSync } from 'node:fs';

// With an adapter, Vercel serves the adapter's routing table, so the redirects
// in vercel.json have to be handed to Astro to survive. vercel.json stays the
// one list to edit; `:slug` becomes Astro's `[slug]`.
const redirects = Object.fromEntries(
  JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8')).redirects.map(
    (r) => [
      r.source.replace(/:(\w+)/g, '[$1]'),
      { status: r.permanent ? 301 : 302, destination: r.destination.replace(/:(\w+)/g, '[$1]') },
    ],
  ),
);

// https://astro.build/config
export default defineConfig({
  // Everything stays prerendered and static, as before. Only the forum pages
  // opt out (`export const prerender = false`) and run as Vercel functions,
  // because they depend on who is signed in.
  output: 'hybrid',
  adapter: vercel(),
  // Rejects cross-site form POSTs to the on-demand pages (CSRF).
  security: { checkOrigin: true },
  redirects,
  integrations: [preact()],
  vite: {
    plugins: [{
      name: 'vite-plugin-geojson',
      transform(src, id) {
        if (id.endsWith('.geojson')) return { code: `export default ${src}`, map: null };
      },
    }],
  },
});