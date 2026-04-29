"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

type SiteFooterContentProps = {
  contactEmail: string;
  location: string;
  currentYear: number;
};

export function SiteFooterContent({ contactEmail, location, currentYear }: SiteFooterContentProps) {
  return (
    <footer className="mt-16 py-10 sm:mt-24 sm:py-12 relative overflow-hidden">
      <div className="page-shell">
        {/* Animated background gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 h-96 w-96 bg-accent/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '5s'}} />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 bg-accent-2/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '7s', animationDelay: '1s'}} />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 sm:rounded-[2.5rem] sm:p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/12 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-60 w-60 rounded-full bg-accent-2/12 blur-3xl" />
          <div className="absolute top-1/2 left-0 h-40 w-40 rounded-full bg-accent-3/8 blur-2xl" />
          
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Left section - CTA */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-xl space-y-5 sm:space-y-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-medium text-accent hover:border-accent/70 hover:bg-accent/25 transition-all cursor-default"
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                  <Sparkles size={14} />
                </motion.div>
                Available for Projects
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl leading-tight">
                Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-2 to-accent animate-pulse" style={{animationDuration: '3s'}}>amazing</span> together.
              </h2>
              
              <p className="text-base leading-relaxed text-white/70 sm:text-lg">
                Whether you need a stunning portfolio, a powerful web application, or a complete full-stack solution — I&apos;m here to bring your vision to life.
              </p>
              
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4 pt-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-black transition-all hover:shadow-lg hover:shadow-accent/40 sm:w-auto overflow-hidden group relative"
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center gap-2">
                      Get in Touch
                      <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/projects"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-gradient-to-br from-white/8 to-white/2 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/15 hover:border-white/40 sm:w-auto backdrop-blur-sm group"
                  >
                    <div className="relative flex items-center gap-2">
                      View Projects
                      <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}>
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right section - Footer Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {/* Contact */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="space-y-4 group"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-accent transition-colors">Contact</h3>
                <div className="space-y-3">
                  <motion.a 
                    href={`mailto:${contactEmail}`} 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-accent transition-colors group/link"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 text-accent group-hover/link:scale-110 transition-transform">
                      <Mail size={16} />
                    </div>
                    <span className="truncate">{contactEmail}</span>
                  </motion.a>
                  <motion.div 
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-sm text-white/70 group/link"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-2/20 to-accent-2/10 text-accent-2">
                      <MapPin size={16} />
                    </div>
                    <span className="truncate">{location}</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="space-y-4 group"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-accent transition-colors">Quick Links</h3>
                <div className="space-y-2">
                  {footerLinks.slice(0, 4).map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link 
                        href={link.href}
                        className="block text-sm text-white/70 hover:text-accent transition-colors relative group/nav"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-accent-2 group-hover/nav:w-full transition-all duration-300" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Connect */}
              <motion.div 
                whileHover={{ y: -4 }}
                className="space-y-4 group"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-accent transition-colors">Connect</h3>
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/amiiit07"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white/70 transition-all hover:bg-white/20 hover:border-accent/50 hover:text-accent hover:shadow-lg hover:shadow-accent/20"
                  >
                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/amiiit07/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-white/70 transition-all hover:bg-white/20 hover:border-accent-2/50 hover:text-accent-2 hover:shadow-lg hover:shadow-accent-2/20"
                  >
                    <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row"
        >
          <div className="flex items-center gap-3">
            <span className="brand-mark brand-mark-compact">AMIIIT</span>
            <span className="text-white/30">|</span>
            <p className="text-sm text-white/50">
              &copy; {currentYear} All rights reserved.
            </p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
}
