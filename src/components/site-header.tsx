"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ensure drawer closes after navigation on mobile.
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`sticky top-0 z-50 pt-3 transition-all duration-300 sm:pt-4 ${scrolled ? 'pt-2' : 'pt-3 sm:pt-4'}`}>
      <div className="page-shell">
        <div 
          className={`header-shell flex items-center justify-between gap-3 rounded-[1.5rem] px-4 py-3 sm:gap-4 sm:rounded-[2rem] sm:px-5 sm:py-3.5 md:px-8 transition-all duration-300 ${
            scrolled 
              ? 'bg-black/70 backdrop-blur-xl border-white/10 shadow-2xl shadow-accent/5' 
              : 'bg-black/50 backdrop-blur-lg'
          }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="brand-mark text-[1.45rem] sm:text-[2rem]">AMIIIT</span>
              <div className="brand-line mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-1 -right-1 sm:-right-2">
                <Sparkles className="h-3 w-3 text-accent animate-pulse" />
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
                className={`nav-link rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "bg-white/12 text-white"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link 
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-5 py-2.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-105"
            >
              Hire Me
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-full p-2 md:hidden hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="mt-2 flex flex-col gap-2 rounded-[1.4rem] border border-white/10 bg-black/90 p-4 md:hidden backdrop-blur-xl shadow-2xl">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActiveLink(link.href) ? "page" : undefined}
                className={`rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  isActiveLink(link.href)
                    ? "bg-white/14 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 py-3.5 text-center text-sm font-semibold text-black"
            >
              <Sparkles size={16} />
              Hire Me
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}