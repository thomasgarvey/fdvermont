// Forum plumbing shared by the middleware and the /forum pages. The rules
// themselves (who may read, post, approve) live in the database — see
// supabase/migrations/0001_forum.sql — so this file only wires up sessions.
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { AstroCookies } from "astro";

export interface Member {
  id: string;
  display_name: string;
  department: string;
  role: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  is_admin: boolean;
  created_at: string;
}

// Both values are public by design (they ship to every visitor's browser on
// any Supabase site), so they sit here as defaults and Vercel needs no setup.
// Env vars still win, for pointing a local build at a different project.
const url = import.meta.env.PUBLIC_SUPABASE_URL || "https://dqsadliehajbdxmgccsf.supabase.co";
const key =
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_NpbgOXWxvwpugCoSg6JsBA_jj2mDofm";

/** False until the Supabase values are set; the forum then shows a notice. */
export const forumConfigured = Boolean(url && key);

export function forumClient(request: Request, cookies: AstroCookies) {
  if (!forumConfigured) return null;
  return createServerClient(url, key, {
    cookies: {
      getAll: () =>
        parseCookieHeader(request.headers.get("Cookie") ?? "").map(({ name, value }) => ({
          name,
          value: value ?? "",
        })),
      setAll: (list) =>
        list.forEach(({ name, value, options }) => cookies.set(name, value, options)),
    },
  });
}

/** Form field as a trimmed string; missing fields become "". */
export const field = (form: FormData, name: string) =>
  String(form.get(name) ?? "").trim();

export const when = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
