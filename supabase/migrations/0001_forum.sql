-- Firefighters' forum: members, threads and posts.
--
-- Every rule that matters lives here, in row-level security, not in the page
-- code. The site talks to Supabase with the public anon key and the member's
-- own session, so a page bug can show the wrong thing but cannot let anyone
-- read or write what these policies refuse.
--
-- Membership: anyone with a verified email can *request* an account. It stays
-- 'pending' until an admin approves it. Only approved members can read or post.

create table public.members (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 2 and 60),
  department   text not null check (char_length(btrim(department)) between 2 and 120),
  role         text not null check (char_length(btrim(role)) between 2 and 60),
  status       text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected', 'suspended')),
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now(),
  reviewed_at  timestamptz,
  reviewed_by  uuid references public.members (id)
);

create table public.threads (
  id             bigint generated always as identity primary key,
  author_id      uuid not null references public.members (id),
  title          text not null check (char_length(btrim(title)) between 3 and 140),
  created_at     timestamptz not null default now(),
  last_posted_at timestamptz not null default now(),
  post_count     integer not null default 0
);

create table public.posts (
  id         bigint generated always as identity primary key,
  thread_id  bigint not null references public.threads (id) on delete cascade,
  author_id  uuid not null references public.members (id),
  body       text not null check (char_length(btrim(body)) between 1 and 10000),
  created_at timestamptz not null default now(),
  edited_at  timestamptz,
  removed    boolean not null default false
);

create index posts_thread_idx on public.posts (thread_id, created_at);
create index threads_recent_idx on public.threads (last_posted_at desc);

-- Helpers. SECURITY DEFINER so policies on members can consult members
-- without recursing into their own policy.
create function public.is_approved() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.members
    where id = auth.uid() and status = 'approved'
  );
$$;

create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.members
    where id = auth.uid() and status = 'approved' and is_admin
  );
$$;

-- A member may edit their own name, department and role, but never their own
-- status or admin flag, and never back-date a review. Column privileges can't
-- express "admins may, others may not", so a trigger does.
create function public.guard_member_update() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then
    if new.status is distinct from old.status
       or new.is_admin is distinct from old.is_admin
       or new.reviewed_at is distinct from old.reviewed_at
       or new.reviewed_by is distinct from old.reviewed_by then
      raise exception 'only an admin can change membership status';
    end if;
  elsif new.id = auth.uid() and new.is_admin is distinct from old.is_admin then
    -- Stops the last admin locking everyone out by accident.
    raise exception 'admins cannot change their own admin flag';
  end if;
  new.id := old.id;
  new.created_at := old.created_at;
  return new;
end;
$$;

create trigger members_guard before update on public.members
  for each row execute function public.guard_member_update();

-- Keep the thread list's counters and ordering right without trusting clients.
create function public.bump_thread() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  update public.threads
     set post_count = post_count + 1,
         last_posted_at = new.created_at
   where id = new.thread_id;
  return new;
end;
$$;

create trigger posts_bump after insert on public.posts
  for each row execute function public.bump_thread();

-- Creating a thread and its opening post in one call, so a thread never
-- exists without a first post.
create function public.start_thread(p_title text, p_body text) returns bigint
language plpgsql security invoker set search_path = '' as $$
declare
  t_id bigint;
begin
  insert into public.threads (author_id, title)
    values (auth.uid(), btrim(p_title))
    returning id into t_id;
  insert into public.posts (thread_id, author_id, body)
    values (t_id, auth.uid(), p_body);
  return t_id;
end;
$$;

alter table public.members enable row level security;
alter table public.threads enable row level security;
alter table public.posts   enable row level security;

-- members ------------------------------------------------------------------
create policy "see yourself" on public.members for select
  using (id = auth.uid());
create policy "approved members see approved members" on public.members for select
  using (public.is_approved() and status = 'approved');
create policy "admins see everyone" on public.members for select
  using (public.is_admin());

create policy "request membership for yourself" on public.members for insert
  with check (id = auth.uid() and status = 'pending' and not is_admin
              and reviewed_at is null and reviewed_by is null);

create policy "edit your own profile" on public.members for update
  using (id = auth.uid()) with check (id = auth.uid());
create policy "admins review members" on public.members for update
  using (public.is_admin()) with check (public.is_admin());

-- threads ------------------------------------------------------------------
create policy "members read threads" on public.threads for select
  using (public.is_approved());
create policy "members start threads" on public.threads for insert
  with check (public.is_approved() and author_id = auth.uid()
              and post_count = 0);
create policy "admins manage threads" on public.threads for delete
  using (public.is_admin());

-- posts --------------------------------------------------------------------
-- Removed posts stay in the table (so a thread still reads in order) but
-- their text is hidden by the page; admins can see what was removed.
create policy "members read posts" on public.posts for select
  using (public.is_approved());
create policy "members reply" on public.posts for insert
  with check (public.is_approved() and author_id = auth.uid()
              and not removed and edited_at is null);
create policy "admins moderate posts" on public.posts for update
  using (public.is_admin()) with check (public.is_admin());

-- Only what the policies above permit; nothing for anonymous visitors.
revoke all on public.members, public.threads, public.posts from anon;
grant select, insert, update on public.members to authenticated;
grant select, insert, delete on public.threads to authenticated;
grant select, insert, update on public.posts   to authenticated;
revoke execute on function public.start_thread(text, text) from public, anon;
grant execute on function public.start_thread(text, text) to authenticated;
