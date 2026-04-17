"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle className="md:hidden" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2 md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="mt-2 flex flex-col gap-2 rounded-[1.8rem] border border-white/10 bg-black/80 p-4 md:hidden backdrop-blur-xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link rounded-full px-4 py-3 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="primary-cta mt-2 rounded-full px-4 py-3 text-center text-sm font-semibold"
            >
              Hire Me
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
