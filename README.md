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
```

3. In Supabase SQL editor, run [supabase/schema.sql](/d:/amit%20react%20portfolio/supabase/schema.sql:1)

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
3. Add the same Supabase environment variables in Vercel
4. Redeploy

## Notes

- If Supabase env vars are missing, public pages still render with fallback content.
- Contact submissions and admin actions require Supabase to be configured.
- The admin dashboard expects Supabase Auth sessions and the SQL schema/policies from `supabase/schema.sql`.
- The admin seed script uses `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`.

