// Where the emailed sign-in link lands. Two shapes arrive here:
//  - ?token_hash=…&type=email — from the customised email template in
//    docs/forum.md. Works even when the link is opened on a different device
//    from the one that asked for it (desk computer → phone), which is common.
//  - ?code=… — Supabase's default PKCE link, which only works in the same
//    browser that requested it. Kept as a fallback.
import type { APIRoute } from "astro";
import type { EmailOtpType } from "@supabase/supabase-js";

export const prerender = false;

export const GET: APIRoute = async ({ url, locals, redirect }) => {
  const { supabase } = locals;
  if (!supabase) return redirect("/forum");

  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");

  const { error } = tokenHash && type
    ? await supabase.auth.verifyOtp({ token_hash: tokenHash, type })
    : code
      ? await supabase.auth.exchangeCodeForSession(code)
      : { error: new Error("missing token") };

  return redirect(error ? "/forum/login?expired=1" : "/forum");
};
