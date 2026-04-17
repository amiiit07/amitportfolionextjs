import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";
import { Sparkles, ArrowRight, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 py-12">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8 md:p-12">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-60 w-60 rounded-full bg-accent-2/10 blur-3xl" />
          <div className="absolute top-1/2 left-0 h-40 w-40 rounded-full bg-accent-3/5 blur-2xl" />
          
          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
                <Sparkles size={14} />
                Available for Projects
              </div>
              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Let&apos;s build something <span className="text-accent">amazing</span> together.
              </h2>
              <p className="text-lg leading-relaxed text-white/60">
                Whether you need a stunning portfolio, a powerful web application, or a complete full-stack solution — I&apos;m here to bring your vision to life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-accent/30 hover:scale-105"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Contact</h3>
                <div className="space-y-3">
                  <a href={`mailto:${settings.contact_email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      <Mail size={14} />
                    </div>
                    {settings.contact_email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                      <MapPin size={14} />
                    </div>
                    {settings.location}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Quick Links</h3>
                <div className="space-y-2">
                  {footerLinks.slice(0, 4).map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className="block text-sm text-white/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">Connect</h3>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/amiiit07"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:border-accent/30 hover:text-accent"
                  >
                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/amiiit07/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:border-accent/30 hover:text-accent"
                  >
                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="brand-mark brand-mark-compact">AMIIIT</span>
            <span className="text-white/30">|</span>
            <p className="text-sm text-white/50">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>Built with Next.js</span>
            <span>&bull;</span>
            <span>Tailwind CSS</span>
            <span>&bull;</span>
            <span>Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}