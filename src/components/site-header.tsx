import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export async function SiteHeader() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 pt-5">
      <div className="page-shell">
        <div className="header-shell flex items-center justify-between gap-4 rounded-[1.8rem] px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <p className="brand-mark">AMIIIT</p>
              <div className="brand-line mt-2" />
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link rounded-full px-4 py-2 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={`mailto:${settings.contact_email}`}
            className="secondary-cta rounded-full px-4 py-2.5 text-sm font-semibold text-white"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
