import type { Metadata } from "next";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
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
      <main className="page-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
                <Sparkles size={14} />
                Get In Touch
              </div>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                Let&apos;s build something <span className="text-accent">amazing</span>
              </h1>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">
                Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can work together.
              </p>
            </div>

            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/30">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Email</p>
                    <a href={`mailto:${settings.contact_email}`} className="text-sm font-medium text-white hover:text-accent transition-colors">
                      {settings.contact_email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/30">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Phone</p>
                    <a href={`tel:${settings.contact_phone}`} className="text-sm font-medium text-white hover:text-accent transition-colors">
                      {settings.contact_phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/30">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40">Location</p>
                    <p className="text-sm font-medium text-white">
                      {settings.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {success && (
              <div className="relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
                <div className="absolute top-0 right-0 h-20 w-20 bg-emerald-500/20 blur-2xl" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-200">Message sent successfully!</p>
                    <p className="text-sm text-emerald-200/70">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="relative overflow-hidden rounded-2xl border border-amber-400/30 bg-amber-500/10 p-5">
                <div className="absolute top-0 right-0 h-20 w-20 bg-amber-500/20 blur-2xl" />
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-amber-200">Something went wrong</p>
                    <p className="text-sm text-amber-200/70">
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