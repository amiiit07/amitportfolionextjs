import type { Metadata } from "next";
import { Mail, MapPin, Sparkles, Clock } from "lucide-react";
import { submitContactAction } from "@/app/actions/contact";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about your portfolio, dashboard, or full-stack web app and I'll respond with a practical build approach.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${siteName}`,
    description: siteDescription,
    url: "/contact",
  },
};

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);
  const success = getParam(params.success);
  const error = getParam(params.error);

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-10 sm:py-14 md:py-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-1/4 h-64 w-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '4s'}} />
          <div className="absolute bottom-1/3 left-1/4 h-48 w-48 bg-accent-2/10 rounded-full blur-3xl animate-pulse" style={{animationDuration: '6s', animationDelay: '1s'}} />
        </div>
        
        <div className="relative z-10 grid gap-8 lg:gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-6 sm:space-y-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent hover:border-accent/60 hover:bg-accent/20 transition-all">
                <Sparkles size={14} />
                Get In Touch
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Let&apos;s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-2 to-accent">amazing</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-white/60">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can work together.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {/* Email Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -inset-32 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 group-hover:animate-pulse" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                    <Mail size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Email</p>
                    <a href={`mailto:${settings.contact_email}`} className="text-sm font-medium text-white hover:text-accent transition-colors truncate">
                      {settings.contact_email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-accent-2/40 hover:shadow-lg hover:shadow-accent-2/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-2/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-2/20 to-accent-2/10 text-accent-2 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Location</p>
                    <p className="text-sm font-medium text-white truncate">
                      {settings.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-accent-3/40 hover:shadow-lg hover:shadow-accent-3/20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-3/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-3/20 to-accent-3/10 text-accent-3 group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{animationDuration: '2s'}}>
                    <Clock size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-white/40 font-semibold">Response Time</p>
                    <p className="text-sm font-medium text-white">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {success && (
              <div className="relative overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -inset-32 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative flex items-start gap-3 sm:items-center">
                  <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 animate-pulse" style={{animationDuration: '2s'}}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-200 text-sm sm:text-base">Message sent successfully! 🎉</p>
                    <p className="text-xs sm:text-sm text-emerald-200/70">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 to-amber-500/5 p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="absolute -inset-32 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                <div className="relative flex items-start gap-3 sm:items-center">
                  <div className="flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-200 text-sm sm:text-base">Something went wrong</p>
                    <p className="text-xs sm:text-sm text-amber-200/70">
                      {error === "config"
                        ? "Please email me directly instead."
                        : "Please try again or email me directly."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm action={submitContactAction} returnTo="/contact" />
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}