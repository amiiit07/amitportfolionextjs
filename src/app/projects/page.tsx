import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteDescription, siteName } from "@/lib/site";
import { getProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "A curated set of full-stack projects with modern frontend patterns and production-ready backend integration.",
  alternates: { canonical: "/projects" },
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
      <main className="pt-28 pb-16">
        <div className="page-container">
          <SectionHeading
            label="Work"
            title="Selected projects that showcase my expertise."
            description="Each project represents a unique challenge solved with clean architecture and premium execution."
          />

          <div className="grid lg:grid-cols-2 gap-5 mt-10">
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.06}>
                <div className="group glass rounded-2xl overflow-hidden hover:bg-white/[0.06] transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        {project.icon && <span className="text-2xl">{project.icon}</span>}
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#4F8CFF] transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-[10px] uppercase tracking-wider text-[#4F8CFF]">{project.status}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#B4B4B4] leading-relaxed">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.stack.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/10">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-[#4F8CFF] font-medium"
                      >
                        Case Study <ArrowUpRight size={14} />
                      </Link>
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
