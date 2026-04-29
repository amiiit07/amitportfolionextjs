import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers3,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjectBySlug } from "@/lib/queries";
import { getSiteUrl, siteName } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getProjectStory(project: NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>) {
  const topStack = project.stack.slice(0, 4).join(", ");

  return {
    challenge: project.summary.endsWith(".") ? project.summary : `${project.summary}.`,
    approach: `Designed a production-style experience around ${topStack}, with responsive screens, reusable sections, and a clear content structure.`,
    outcome:
      project.status === "Shipped"
        ? "Delivered as a live project with practical workflows, polished UI, and a maintainable codebase for future improvements."
        : "Built with an iterative roadmap so each release can improve UX, performance, and business value.",
  };
}

function getFeatureList(project: NonNullable<Awaited<ReturnType<typeof getProjectBySlug>>>) {
  if (project.features?.length) {
    return project.features;
  }

  return project.description
    .split(",")
    .map((feature) => feature.trim())
    .filter(Boolean)
    .slice(0, 6);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${siteName}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.cover_image
        ? [
            {
              url: project.cover_image,
              width: 1400,
              height: 800,
              alt: project.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: project.cover_image ? [project.cover_image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const story = getProjectStory(project);
  const features = getFeatureList(project);
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: new URL(`/projects/${project.slug}`, getSiteUrl()).toString(),
    creator: {
      "@type": "Person",
      name: "Amit Kumar",
    },
    programmingLanguage: project.stack,
    sameAs: [project.live_url, project.repo_url].filter(Boolean),
  };

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-12 sm:py-14 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <Reveal>
            <div className="surface flex h-full flex-col rounded-[2rem] p-6 sm:p-8 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-3xl">
                  {project.icon}
                </span>
                <span className="rounded-full border border-accent/28 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {project.status}
                </span>
                {project.featured ? (
                  <span className="rounded-full border border-accent-2/28 bg-accent-2/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-3">
                    Featured
                  </span>
                ) : null}
              </div>

              <h1 className="mt-7 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {project.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-semibold text-black hover:shadow-lg hover:shadow-accent/30"
                  >
                    <ExternalLink size={16} />
                    Live Project
                    <ArrowUpRight size={15} />
                  </a>
                ) : null}
                {project.repo_url ? (
                  <a
                    href={project.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3 text-sm font-semibold text-white hover:border-white/34 hover:bg-white/12"
                  >
                    View Code
                    <ArrowUpRight size={15} />
                  </a>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface grid h-full rounded-[2rem] p-5 sm:p-6">
              <div className="project-preview min-h-[320px] rounded-[1.6rem] p-5">
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Project Snapshot</p>
                      <h2 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h2>
                    </div>
                    <Rocket className="h-8 w-8 text-accent" />
                  </div>

                  <div className="grid gap-3">
                    {[
                      { label: "Frontend", value: project.stack.slice(0, 2).join(" + ") || "Modern UI" },
                      { label: "Backend", value: project.stack.slice(2, 4).join(" + ") || "API Ready" },
                      { label: "Focus", value: project.featured ? "Featured showcase" : "Portfolio proof" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-black/24 p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                        <p className="mt-1 text-sm font-semibold text-white/84">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Target, label: "Challenge", text: story.challenge },
            { icon: Layers3, label: "Approach", text: story.approach },
            { icon: Sparkles, label: "Outcome", text: story.outcome },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} delay={index * 0.06}>
                <article className="glass-shell h-full rounded-[1.6rem] p-5 sm:p-6">
                  <Icon className="h-6 w-6 text-accent" />
                  <h2 className="mt-4 font-display text-2xl font-semibold text-white">{item.label}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="surface rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Tech Stack</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-sm font-medium text-white/82"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">Key Features</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature} className="flex gap-3 rounded-2xl border border-white/8 bg-black/18 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                    <p className="text-sm leading-6 text-white/75">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
