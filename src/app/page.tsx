import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Layers, Sparkles } from "lucide-react";
import { ConversationCard } from "@/components/conversation-card";
import { HeroVisual } from "@/components/hero-visual";
import { LiquidButton } from "@/components/liquid-button";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { TechStackGrid } from "@/components/tech-stack-grid";
import { aboutHighlights } from "@/lib/site-data";
import { siteDescription, siteName } from "@/lib/site";
import { getFeaturedProjects, getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Frontend Engineer Portfolio",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: "/",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function HomePage() {
  const [settings, projects] = await Promise.all([getSiteSettings(), getFeaturedProjects()]);

  return (
    <>
      <SiteHeader />
      <main className="relative pb-16 pt-8 md:pb-24 md:pt-12">
        <section className="page-shell relative overflow-hidden rounded-[2.25rem] border border-white/10 px-5 py-10 sm:px-7 md:px-10 md:py-14 lg:px-12">
          <div className="mesh-blob mesh-blob-blue mesh-spin -left-16 top-8 h-56 w-56" />
          <div className="mesh-blob mesh-blob-purple right-8 top-0 h-48 w-48" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal className="space-y-7" direction="up">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70">
                <Sparkles size={14} className="text-[#8b5cf6]" />
                Frontend Engineer
              </p>

              <h1 className="font-display text-balance text-5xl font-bold leading-[0.94] text-white sm:text-6xl lg:text-7xl">
                Engineering pixel-perfect
                <span className="gradient-flow-text block pt-2">React experiences.</span>
              </h1>

              <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                I design and build high-end frontend products using React, Tailwind CSS v4, and Framer Motion with a
                strong focus on speed, interaction quality, and production-ready architecture.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <LiquidButton href="#contact" label="Start a Conversation" />
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/10"
                >
                  Selected Works
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        <section className="page-shell mt-16 md:mt-20">
          <Reveal>
            <SectionHeading
              label="About"
              title="Building premium interfaces with clear systems, polished motion, and maintainable architecture."
              description="I approach frontend engineering as product design plus performance engineering, so every section feels intentional and fast."
            />
          </Reveal>

          <div className="mt-9 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="glass-shell rounded-[2rem] p-6 md:p-8">
                <h3 className="font-display text-3xl font-semibold text-white">How I engineer frontend products.</h3>
                <p className="mt-4 text-sm leading-8 text-muted md:text-base">
                  Every interface is built with a design-system mindset, so it stays visually consistent, scalable, and easy to maintain in production.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="subtle-tag flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                      <Code2 size={16} />
                      Reusable Component Architecture
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">Scale</span>
                  </div>
                  <div className="subtle-tag flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                      <Layers size={16} />
                      Motion + Accessibility Balance
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">UX</span>
                  </div>
                  <div className="subtle-tag flex items-center justify-between rounded-2xl px-4 py-3">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                      <Sparkles size={16} />
                      Performance-First Delivery
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">Speed</span>
                  </div>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.08}>
              <article className="glass-shell rounded-[2rem] p-6 md:p-8">
                <h3 className="font-display text-3xl font-semibold text-white">From UI polish to production delivery.</h3>
                <div className="mt-5 space-y-5 text-sm leading-8 text-muted md:text-base">
                  {aboutHighlights.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <span className="subtle-tag rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Design Systems</span>
                  <span className="subtle-tag rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Web Performance</span>
                  <span className="subtle-tag rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Motion UX</span>
                </div>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="page-shell mt-16 md:mt-20">
          <Reveal>
            <SectionHeading
              label="Selected Works"
              title="A curated set of production projects with clean structure and measurable outcomes."
              description="Cards use slide-up reveals, premium hover states, and concise technical stack tags for quick scanning."
            />
          </Reveal>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 0.06} />
            ))}
          </div>
        </section>

        <section className="page-shell mt-16 md:mt-20">
          <Reveal>
            <SectionHeading
              label="Tech Stack"
              title="Tools I trust for premium frontend delivery."
              description="Staggered badge entrance keeps the section lightweight while showcasing stack breadth."
            />
          </Reveal>

          <div className="mt-8">
            <TechStackGrid />
          </div>
        </section>

        <section id="contact" className="page-shell mt-16 md:mt-20">
          <Reveal>
            <ConversationCard email={settings.contact_email} location={settings.location} />
          </Reveal>

          <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/45">
            <span className="inline-flex items-center gap-2">
              <Code2 size={14} />
              React + Tailwind v4
            </span>
            <span className="inline-flex items-center gap-2">
              <Layers size={14} />
              Motion-First UI
            </span>
            <p className="text-white/35">© {new Date().getFullYear()} Amit Kumar</p>
          </div>
        </section>
      </main>
    </>
  );
}
