// The articles in /insights, newest first. Each lives in src/pages/insights/<slug>.astro
// and is built from the site's own data at build time, so the numbers cannot drift
// from the department and station pages.
export interface Insight {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO
}

export const insights: Insight[] = [
  {
    slug: "ground-per-station",
    title: "How much ground does one Vermont fire station cover?",
    dek: "Land area per station, town by town: where one building watches over 70 square miles, and where five share a few.",
    date: "2026-11-17",
  },
];
