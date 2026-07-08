"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, Mail, Sparkles } from "lucide-react";

export function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="page-container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-flex" aria-label="AMIIIT home">
              <span className="brand-mark brand-mark-footer">AMIIIT</span>
            </Link>
            <p className="text-sm text-[#B4B4B4] leading-relaxed max-w-xs">
              Crafting premium digital experiences with modern web technologies and meticulous attention to detail.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: "github", href: "https://github.com/amiiit07", label: "GitHub" },
                { icon: "linkedin", href: "https://www.linkedin.com/in/amiiit07/", label: "LinkedIn" },
                { icon: "mail", href: "mailto:akverma7295@gmail.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
                  aria-label={social.label}
                >
                  {social.icon === "github" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ) : social.icon === "linkedin" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ) : (
                    <Mail size={16} />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Work", href: "/projects" },
                { label: "About", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Insights", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#B4B4B4] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider">Get in Touch</h4>
            <div className="glass rounded-2xl p-5 space-y-3">
              <p className="text-sm text-[#B4B4B4]">
                Have a project in mind? Let&apos;s build something exceptional together.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-sm text-[#4F8CFF] font-medium hover:underline"
              >
                Start a Conversation
                <Sparkles size={12} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#B4B4B4]">
            © {new Date().getFullYear()} Amit Kumar. Crafted with care.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-2.5 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
