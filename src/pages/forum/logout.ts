import type { APIRoute } from "astro";

export const prerender = false;

// POST only, so a link or prefetch can't sign someone out.
export const POST: APIRoute = async ({ locals, redirect }) => {
  await locals.supabase?.auth.signOut();
  return redirect("/forum/login");
};
