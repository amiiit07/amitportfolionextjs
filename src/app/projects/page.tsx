import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A curated set of full-stack projects built with modern frontend patterns, admin workflows, and production-ready backend integration.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteName}`,
    description: siteDescription,
    url: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <SiteHeader />
      <main className="page-shell py-14">
        <Reveal>
          <SectionHeading
            label="Projects"
            title="A futuristic project showcase with glass cards, glowing edges, and product-style previews."
            description="Each project is designed to read like a premium interface tile instead of a plain text block."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

