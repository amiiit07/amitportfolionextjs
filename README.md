# Amit Portfolio

A professional full-stack portfolio website rebuilt with:

- `Frontend`: Next.js App Router
- `Backend`: Supabase
- `Styling`: Tailwind CSS
- `Hosting`: Vercel

It includes public portfolio pages plus an admin dashboard for managing projects, contact inquiries, settings, and activity logs.

## Features

- Modern homepage, about, projects, and contact pages
- Supabase-backed contact form with honeypot spam protection
- Admin login using Supabase Auth
- Dashboard overview with contact and project metrics
- Contact/message management
- Project create, update, and delete workflows
- Site settings and profile editing
- Admin activity logging
- Responsive UI with a polished portfolio-first design

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase Auth + Postgres
- Vercel deployment

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change_this_to_a_strong_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. In Supabase SQL editor, run `supabase/schema.sql`.

4. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`.

5. Run `npm run seed:admin` to create or update the Supabase Auth admin user and matching `admin_profiles` row.

6. Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin Routes

- `/admin/login`
- `/admin/dashboard`
- `/admin/contacts`
- `/admin/messages`
- `/admin/projects`
- `/admin/settings`
- `/admin/activity`

## Deployment

Deploy directly on Vercel:

1. Push the project to GitHub
2. Import the repo into Vercel
3. In Vercel Project Settings > Environment Variables, add:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	- `SUPABASE_SERVICE_ROLE_KEY`
	- `ADMIN_EMAIL`
	- `ADMIN_PASSWORD`
	- `NEXT_PUBLIC_SITE_URL` (set this to your production domain, e.g. `https://yourdomain.com`)
4. Set these variables for `Production` (and `Preview` if needed).
5. Redeploy.
6. Optional after first deploy: run `npm run seed:admin` locally once (with production env values) to ensure admin user/profile are created.

## Notes

- If Supabase env vars are missing, public pages still render with fallback content.
- Contact submissions and admin actions require Supabase to be configured.
- The admin dashboard expects Supabase Auth sessions and the SQL schema/policies from `supabase/schema.sql`.
- The admin seed script uses `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`.

