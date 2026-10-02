// Resolves the signed-in firefighter for /forum requests only. Every other
// page is prerendered at build time and never reaches this at runtime.
import { defineMiddleware } from "astro:middleware";
import { forumClient, type Member } from "./lib/forum";

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.supabase = null;
  ctx.locals.user = null;
  ctx.locals.member = null;

  if (!ctx.url.pathname.startsWith("/forum")) return next();

  // Every forum write is a form POST carrying the session cookie, so refuse
  // any that another site submitted (CSRF). Astro's security.checkOrigin does
  // the same in production; this makes it explicit and holds in dev too.
  if (ctx.request.method !== "GET" && ctx.request.headers.get("origin") !== ctx.url.origin) {
    return new Response("Cross-site form submissions are not accepted.", { status: 403 });
  }

  const supabase = forumClient(ctx.request, ctx.cookies);
  if (!supabase) return next();
  ctx.locals.supabase = supabase;

  // getUser() checks the token with Supabase rather than trusting the cookie.
  const { data } = await supabase.auth.getUser();
  ctx.locals.user = data.user;
  if (data.user) {
    const { data: member } = await supabase
      .from("members")
      .select("*")
      .eq("id", data.user.id)
      .maybeSingle<Member>();
    ctx.locals.member = member;
  }

  const res = await next();
  // Pages here depend on who is looking; never let a CDN share them.
  try {
    res.headers.set("Cache-Control", "private, no-store");
  } catch {
    // Some redirect responses have immutable headers; they carry no content.
  }
  return res;
});
