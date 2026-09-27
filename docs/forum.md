# Firefighters' forum

A members-only forum at `/forum`. Firefighters sign in with an emailed link,
say which department they serve, and wait for a moderator to approve them.
Only approved members can read or post. Nothing in the forum is public.

## How it fits the site

The rest of the site is still prerendered static files. The forum pages are the
only ones that run on demand: they set `export const prerender = false`, and
`output: 'hybrid'` with `@astrojs/vercel` makes them a single Vercel function.
[`architecture.md`](./architecture.md) values the site not depending on live
services. That still holds: if Supabase is down, only `/forum` breaks.

| Piece | Where |
|---|---|
| Tables, access rules, triggers | `supabase/migrations/0001_forum.sql` |
| Session and member lookup | `src/middleware.ts`, `src/lib/forum.ts` |
| Pages | `src/pages/forum/` (login, join, threads, thread, admin) |
| Shared chrome and styles | `src/components/forum/ForumPage.astro` |

**The rules live in the database.** Pages connect with the public anon key
under the member's own session, and Postgres row-level security decides what
each person can do. A pending member cannot read threads, a member cannot
approve themselves, and nobody can post as someone else, whatever the page code
does. These rules were checked against a local Postgres before this shipped.

## One-time setup

1. **Create a Supabase project** at supabase.com (free tier is fine; region
   `us-east-1`).
2. **Run the migration.** Paste `supabase/migrations/0001_forum.sql` into
   SQL Editor → Run.
3. **Auth → URL Configuration.** Set Site URL to `https://www.fdvermont.org`.
   Add these redirect URLs: `https://www.fdvermont.org/forum/auth/confirm` and
   `http://localhost:8745/forum/auth/confirm`.
4. **Auth → Email Templates → Magic Link.** Replace the link so it works when
   someone asks on one device and opens the email on another:
   ```html
   <h2>Sign in to the Vermont Fire Stations forum</h2>
   <p><a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Sign in</a></p>
   <p>This link works once and expires in an hour. If you didn't ask for it, ignore this email.</p>
   ```
   Make the same change to the **Confirm signup** template, since a first-time
   email gets that one instead. Subject for both: "Your sign-in link for the
   Vermont Fire Stations forum". `{{ .RedirectTo }}` is the confirm URL the
   login page asked for, so the link returns to whichever site started the
   sign-in (live, or localhost while testing). `{{ .SiteURL }}` would always
   send it to the live site.
5. **Custom SMTP (required before launch).** Supabase's built-in mailer only
   sends to the project's own team members and only a few emails an hour.
   Firefighters would never receive their links. Under Auth → SMTP Settings,
   connect a sender such as Resend or Postmark, sending from something like
   `forum@fdvermont.org`. The sending domain needs SPF/DKIM records added at
   Namecheap, which hosts DNS for fdvermont.org.
6. **Environment variables** from Settings → API, in Vercel (Production and
   Preview) and in a local `.env` (see `.env.example`):
   `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`.
   Never use the `service_role` key here.
7. **Make the first moderator.** Sign in at `/forum`, fill in the join form,
   then in SQL Editor:
   ```sql
   update members set status = 'approved', is_admin = true
   where id = (select id from auth.users where email = 'YOU@example.com');
   ```
   After that, approve others at `/forum/admin`. To make JA or NJ moderators,
   run the same statement with their email (admins can't grant admin from the
   page, by design).

## Moderating

- `/forum/admin` lists pending requests first, with name, department and role.
  Check them against the department however you like. Approve or reject.
- Suspending a member stops them reading and posting immediately. Their old
  posts stay up, credited to "Former member".
- Admins see **Remove post** under every post. The text is hidden from members
  but kept in the database, and can be restored.
- Nobody is emailed when a request arrives. Check `/forum/admin`, or add a
  Supabase database webhook on `members` insert later.

## Deliberately left out of v1

Editing and deleting your own posts, notifications of replies, categories,
search, attachments and images, markdown. Posts are plain text, so there is no
way to inject markup.

## Deployment notes

- `@astrojs/vercel` 7 only knows Node 18 and 20 and falls back to the retired
  Node 18. `scripts/vercel-runtime.mjs` runs after `astro build` and pins the
  function to `nodejs22.x`. Upgrading to Astro 5 would make the script
  unnecessary.
- With an adapter, Vercel uses the adapter's routing table, so the redirects
  in `vercel.json` are passed through `astro.config.mjs`. Keep editing
  `vercel.json`; the config reads it.
- Build output is now `.vercel/output/` rather than `dist/`. Vercel detects this
  automatically for Astro.
