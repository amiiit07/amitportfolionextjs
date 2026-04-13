import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-24 py-10">
      <div className="page-shell">
        <div className="header-shell flex flex-col gap-6 rounded-[2rem] px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="space-y-3">
            <p className="eyebrow">Professional Portfolio</p>
            <h2 className="max-w-2xl text-3xl font-semibold text-white md:text-4xl">
              Clean design, strong frontend execution, and scalable backend thinking.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted">
              Built with Next.js, Tailwind CSS, Framer Motion, and a production-ready full-stack workflow.
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted">
            <p>{settings.location}</p>
            <p>{settings.contact_email}</p>
            <div className="flex gap-4">
              <Link href="/projects" className="font-medium text-white hover:text-accent">
                Projects
              </Link>
              <Link href="/contact" className="font-medium text-white hover:text-accent">
                Contact
              </Link>
              <Link href="/admin" className="font-medium text-white hover:text-accent">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
