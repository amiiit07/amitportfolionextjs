import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageSquareQuote, Sparkles, Star, TimerReset } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What clients say about working with me on web development projects.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: `Testimonials | ${siteName}`,
    description: siteDescription,
    url: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-shell py-12 sm:py-16 md:py-20">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-5 shadow-2xl shadow-black/20 sm:rounded-[2.5rem] sm:p-7 md:p-10">
          <div className="mesh-blob mesh-blob-blue -left-20 top-8 h-64 w-64" />
          <div className="mesh-blob mesh-blob-purple bottom-4 right-0 h-56 w-56" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-center">
            <Reveal className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles size={14} />
                Testimonials
              </span>

              <div>
                <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  Client stories are getting a proper spotlight.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                  A polished testimonials wall is coming soon with verified feedback, project context,
                  and outcomes from real collaborations.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-black hover:shadow-lg hover:shadow-accent/30"
                >
                  Start a Project
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-semibold text-white hover:border-white/34 hover:bg-white/12"
                >
                  View Projects
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="surface relative overflow-hidden rounded-[1.8rem] p-5 sm:p-6">
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">Status</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-white">Coming Soon</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/22 bg-accent/10 text-accent">
                    <MessageSquareQuote size={26} />
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  {[
                    { icon: Star, label: "Verified reviews", value: "Collecting" },
                    { icon: TimerReset, label: "Case-linked feedback", value: "Designing" },
                    { icon: Sparkles, label: "Featured highlights", value: "Curating" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-accent">
                            <Icon size={18} />
                          </span>
                          <span className="text-sm font-medium text-white/82">{item.label}</span>
                        </div>
                        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/45">
                          {item.value}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 overflow-hidden rounded-full border border-white/10 bg-black/24 p-1">
                  <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_22px_rgba(59,130,246,0.45)]" />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-white/42">Trust section in progress</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
