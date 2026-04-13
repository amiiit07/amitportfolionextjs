import Link from "next/link";
import type { ReactNode } from "react";
import { adminLinks } from "@/lib/site-data";
import type { AdminProfile } from "@/lib/types";

type AdminShellProps = {
  profile: AdminProfile;
  children: ReactNode;
  signOutAction: () => Promise<void>;
};

export function AdminShell({ profile, children, signOutAction }: AdminShellProps) {
  return (
    <div className="page-shell grid gap-6 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="surface h-fit rounded-[2rem] p-5">
        <div className="hero-panel rounded-[1.5rem] p-5 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-white/65">Admin Console</p>
          <h1 className="mt-3 text-2xl font-semibold">{profile.full_name ?? "Admin"}</h1>
          <p className="mt-1 text-sm text-white/75">{profile.title ?? profile.email}</p>
        </div>

        <nav className="mt-5 flex flex-col gap-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-muted hover:bg-white hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form action={signOutAction} className="mt-6">
          <button
            type="submit"
            className="neon-button-secondary w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white"
          >
            Sign Out
          </button>
        </form>
      </aside>

      <main className="space-y-6">{children}</main>
    </div>
  );
}

