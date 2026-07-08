import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What clients say about working with me on web development projects.",
  alternates: { canonical: "/testimonials" },
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
      <main className="pt-28 pb-16">
        <div className="page-container">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <Reveal className="lg:col-span-3 space-y-6">
              <span className="eyebrow">Testimonials</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                Client stories coming soon.
              </h1>
              <p className="text-[#B4B4B4] leading-relaxed max-w-xl">
                A polished testimonials wall is on its way with verified feedback, project context,
                and outcomes from real collaborations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4F8CFF] text-white font-medium text-sm hover:bg-[#4F8CFF]/90 transition-all">
                  Start a Project
                  <ArrowUpRight size={14} />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all text-sm">
                  View Projects
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-2">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">Status</p>
                    <p className="text-xl font-semibold text-white mt-1">Coming Soon</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#4F8CFF]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#4F8CFF]" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Verified reviews", status: "Collecting" },
                    { label: "Case-linked feedback", status: "Designing" },
                    { label: "Featured highlights", status: "Curating" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
                      <span className="text-sm text-white/80">{item.label}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[#B4B4B4]">{item.status}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#7B61FF]" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
