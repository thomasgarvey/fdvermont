// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
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

// Redirect sources as patterns (`/towns/[slug]` matches any one segment), so
// the sitemap can leave out URLs that only redirect.
const redirectPatterns = Object.keys(redirects).map(
  (r) => new RegExp(`^${r.replace(/\[\w+\]/g, '[^/]+')}/?$`),
);
const isRedirect = (path) => redirectPatterns.some((re) => re.test(path));
const withoutTrailingSlash = (url) => {
  const u = new URL(url);
  if (u.pathname !== '/') u.pathname = u.pathname.replace(/\/+$/, '');
  return u.href;
};

// https://astro.build/config
export default defineConfig({
  // Absolute URLs for canonical tags, link previews and the sitemap.
  site: 'https://www.fdvermont.org',
  // Everything stays prerendered and static, as before. Only the forum pages
  // opt out (`export const prerender = false`) and run as Vercel functions,
  // because they depend on who is signed in.
  output: 'hybrid',
  adapter: vercel(),
  // Rejects cross-site form POSTs to the on-demand pages (CSRF).
  security: { checkOrigin: true },
  redirects,
  integrations: [
    preact(),
    // The forum is members-only and noindex, so it stays out.
    // Redirect sources (old /towns and /stations URLs) are left out, and the
    // trailing slash is dropped to match each page's canonical tag.
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !path.startsWith('/forum') && !isRedirect(path);
      },
      serialize: (item) => ({ ...item, url: withoutTrailingSlash(item.url) }),
    }),
  ],
  vite: {
    plugins: [{
      name: 'vite-plugin-geojson',
      transform(src, id) {
        if (id.endsWith('.geojson')) return { code: `export default ${src}`, map: null };
      },
    }],
  },
});