create extension if not exists "pgcrypto";

create table if not exists public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  title text,
  bio text,
  is_super_admin boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  id text primary key default 'site-settings',
  hero_badge text not null,
  hero_title text not null,
  hero_description text not null,
  availability_text text not null,
  contact_email text not null,
  contact_phone text not null,
  location text not null,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text not null,
  description text not null,
  stack text[] not null default '{}',
  live_url text,
  repo_url text,
  cover_image text,
  featured boolean not null default false,
  status text not null default 'Shipped',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text,
  tags text[] not null default '{}',
  published boolean not null default true,
  featured boolean not null default false,
  reading_time integer not null default 5,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text not null,
  company text not null,
  content text not null,
  rating integer not null default 5,
  avatar_url text,
  featured boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  budget text,
  project_type text,
  message text not null,
  is_read boolean not null default false,
  admin_notes text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity_type text not null,
  entity_id text,
  details text,
  admin_email text,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists admin_profiles_set_updated_at on public.admin_profiles;
create trigger admin_profiles_set_updated_at
before update on public.admin_profiles
for each row
execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

drop trigger if exists blogs_set_updated_at on public.blogs;
create trigger blogs_set_updated_at
before update on public.blogs
for each row
execute function public.set_updated_at();

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
before update on public.testimonials
for each row
execute function public.set_updated_at();

create or replace function public.is_admin_user(user_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = user_id
      and is_super_admin = true
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admin_profiles (id, email, is_super_admin)
  values (new.id, new.email, true)
  on conflict (id) do update
  set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

insert into public.site_settings (
  id,
  hero_badge,
  hero_title,
  hero_description,
  availability_text,
  contact_email,
  contact_phone,
  location
)
values (
  'site-settings',
  'Full-Stack Developer',
  'I build portfolio websites that look premium and work like products.',
  'Next.js frontends, Supabase backends, thoughtful motion, and admin workflows that make the site useful after launch too.',
  'Available for freelance portfolio builds and dashboard projects.',
  'hello@amit.dev',
  '+91 98765 43210',
  'India · Remote'
)
on conflict (id) do nothing;

alter table public.admin_profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.blogs enable row level security;
alter table public.testimonials enable row level security;
alter table public.contacts enable row level security;
alter table public.activity_logs enable row level security;

drop policy if exists "Public can read projects" on public.projects;
create policy "Public can read projects"
on public.projects
for select
to anon, authenticated
using (true);

drop policy if exists "Public can submit contacts" on public.contacts;
create policy "Public can submit contacts"
on public.contacts
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins can read contacts" on public.contacts;
create policy "Admins can read contacts"
on public.contacts
for select
to authenticated
using (public.is_admin_user(auth.uid()));

drop policy if exists "Admins can update contacts" on public.contacts;
create policy "Admins can update contacts"
on public.contacts
for update
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage site settings" on public.site_settings;
create policy "Admins can manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = id or public.is_admin_user(auth.uid()));

drop policy if exists "Admins can manage their profile" on public.admin_profiles;
create policy "Admins can manage their profile"
on public.admin_profiles
for all
to authenticated
using (auth.uid() = id or public.is_admin_user(auth.uid()))
with check (auth.uid() = id or public.is_admin_user(auth.uid()));

drop policy if exists "Admins can manage projects" on public.projects;
create policy "Admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));

drop policy if exists "Public can read blogs" on public.blogs;
create policy "Public can read blogs"
on public.blogs
for select
to anon, authenticated
using (published = true);

drop policy if exists "Admins can manage blogs" on public.blogs;
create policy "Admins can manage blogs"
on public.blogs
for all
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));

drop policy if exists "Public can read testimonials" on public.testimonials;
create policy "Public can read testimonials"
on public.testimonials
for select
to anon, authenticated
using (true);

drop policy if exists "Admins can manage testimonials" on public.testimonials;
create policy "Admins can manage testimonials"
on public.testimonials
for all
to authenticated
using (public.is_admin_user(auth.uid()))
with check (public.is_admin_user(auth.uid()));

drop policy if exists "Admins can read activity logs" on public.activity_logs;
create policy "Admins can read activity logs"
on public.activity_logs
for select
to authenticated
using (public.is_admin_user(auth.uid()));

drop policy if exists "Admins can insert activity logs" on public.activity_logs;
create policy "Admins can insert activity logs"
on public.activity_logs
for insert
to authenticated
with check (public.is_admin_user(auth.uid()));
