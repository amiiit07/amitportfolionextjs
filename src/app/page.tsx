import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Code2, GitBranch, Layers, Sparkles } from "lucide-react";
import { BlobProfile } from "./components/BlobProfile";
import { ConversationCard } from "@/components/conversation-card";
import { LiquidButton } from "@/components/liquid-button";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { StatsGrid } from "@/components/stats-grid";
import { StorySection } from "@/components/story-section";
import { TechStackGrid } from "@/components/tech-stack-grid";
import { TypingEffect } from "@/components/typing-effect";
import { aboutHighlights } from "@/lib/site-data";
import { siteDescription, siteName } from "@/lib/site";
import { getFeaturedProjects, getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Full Stack Developer",
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
      <main className="relative pb-14 pt-6 md:pb-24 md:pt-12">
        <div className="page-shell mb-5 sm:mb-6">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
            Scroll Story: Vision - Process - Results
          </p>
        </div>

        <StorySection>
        <section className="page-shell relative overflow-hidden rounded-[1.6rem] border border-white/10 px-4 py-8 sm:rounded-[2.25rem] sm:px-7 sm:py-10 md:px-10 md:py-14 lg:px-12">
          <div className="mesh-blob mesh-blob-blue mesh-spin -left-16 top-8 h-56 w-56" />
          <div className="mesh-blob mesh-blob-purple right-8 top-0 h-48 w-48" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal className="cinematic-sequence space-y-5 sm:space-y-6 md:space-y-7" direction="up">
              <p className="cinematic-item cinematic-delay-1 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]">
                <Sparkles size={14} className="text-[#8b5cf6]" />
                Full Stack Developer
              </p>

              <h1 className="cinematic-item cinematic-delay-2 font-display text-balance text-4xl font-bold leading-[0.98] text-white sm:text-5xl sm:leading-[0.95] lg:text-7xl lg:leading-[0.94]">
                Engineering pixel-perfect
                <span className="gradient-flow-text block pt-2">
                  <TypingEffect
                    texts={["Full Stack Experiences.", "Scalable Web Products.", "Conversion-Focused Interfaces."]}
                    typingSpeed={80}
                    deletingSpeed={45}
                    pauseDuration={1700}
                  />
                </span>
              </h1>

              <p className="cinematic-item cinematic-delay-3 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8 md:text-lg">
                I design and build high-end frontend products using React, Tailwind CSS v4, and Framer Motion with a
                strong focus on speed, interaction quality, and production-ready architecture.
              </p>

              <div className="cinematic-item cinematic-delay-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <LiquidButton href="#contact" label="Start a Conversation" className="w-full sm:w-auto" />
                <Link
                  href="/projects"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:border-white/30 hover:bg-white/10 sm:w-auto"
                >
                  Selected Works
                  <ArrowUpRight size={16} />
                </Link>
              </div>

              <div className="cinematic-item cinematic-delay-5 grid gap-2.5 pt-1 sm:grid-cols-3 sm:gap-3">
                <div className="subtle-tag rounded-2xl px-3.5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
                  Fast Delivery
                </div>
                <div className="subtle-tag rounded-2xl px-3.5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
                  SEO Friendly
                </div>
                <div className="subtle-tag rounded-2xl px-3.5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white/80">
                  Mobile First
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="cinematic-item cinematic-delay-6">
              <div className="flex justify-center lg:justify-end">
                <BlobProfile imageUrl="/amiiit.png" alt="Amit Kumar profile" size="lg" />
              </div>
            </Reveal>
          </div>
        </section>
        </StorySection>

        <StorySection>
        <section className="page-shell mt-10 md:mt-12">
          <Reveal>
            <StatsGrid />
          </Reveal>
        </section>
        </StorySection>

        <StorySection>
        <section className="page-shell mt-14 md:mt-20">
          <Reveal>
            <SectionHeading
              label="About"
              title="Building premium interfaces with clear systems, polished motion, and maintainable architecture."
              description="I approach full-stack engineering as product design plus performance engineering, so every section feels intentional and fast."
            />
          </Reveal>

          <div className="mt-7 grid gap-5 sm:mt-9 sm:gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="glass-shell rounded-[1.6rem] p-5 sm:rounded-[2rem] sm:p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">How I engineer frontend products.</h3>
                <p className="mt-4 text-sm leading-8 text-muted md:text-base">
                  Every interface is built with a design-system mindset, so it stays visually consistent, scalable, and easy to maintain in production.
                </p>

                <div className="mt-6 grid gap-3">
                  <div className="subtle-tag flex flex-col items-start justify-between gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                      <Code2 size={16} />
                      Reusable Component Architecture
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">Scale</span>
                  </div>
                  <div className="subtle-tag flex flex-col items-start justify-between gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                      <Layers size={16} />
                      Motion + Accessibility Balance
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/55">UX</span>
                  </div>
                  <div className="subtle-tag flex flex-col items-start justify-between gap-2 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
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
              <article className="glass-shell rounded-[1.6rem] p-5 sm:rounded-[2rem] sm:p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">From UI polish to production delivery.</h3>
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
        </StorySection>

        <StorySection>
        <section className="page-shell mt-14 md:mt-20">
          <Reveal>
            <SectionHeading
              label="Selected Works"
              title="A curated set of production projects with clean structure and measurable outcomes."
              description="Cards use slide-up reveals, premium hover states, and concise technical stack tags for quick scanning."
            />
          </Reveal>

          <div className="mt-7 grid gap-5 sm:mt-9 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={index * 0.06} />
            ))}
          </div>
        </section>
        </StorySection>

        <StorySection>
        <section className="page-shell mt-14 md:mt-20">
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
        </StorySection>

        <StorySection>
        <section id="contact" className="page-shell mt-14 md:mt-20">
          <Reveal>
            <ConversationCard email={settings.contact_email} location={settings.location} />
          </Reveal>

          <div className="mt-7 rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-md md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span className="brand-mark brand-mark-compact">AMIIIT</span>
                <span className="text-white/30">|</span>
                <span>© {new Date().getFullYear()} Amit Kumar</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/45">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5">
                  <Code2 size={13} />
                  React + Tailwind v4
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5">
                  <Layers size={13} />
                  Motion-First UI
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-3 text-sm text-white/60">
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/blog">Blog</Link>
              <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a>

              <div className="flex items-center gap-2 md:ml-auto">
                <a
                  href="https://github.com/amiiit07"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-[#3b82f6]/55 hover:text-white"
                  aria-label="GitHub"
                >
                  <GitBranch size={14} />
                </a>
                <a
                  href="https://www.linkedin.com/in/amiiit07/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 hover:border-[#8b5cf6]/55 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <BriefcaseBusiness size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
        </StorySection>
      </main>
    </>
  );
}
