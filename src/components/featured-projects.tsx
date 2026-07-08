"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, ExternalLink, BarChart3 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, FadeIn } from "./reveal";
import type { Project } from "@/lib/types";

const featuredProjects: Project[] = [
  {
    id: "project-1",
    title: "Bihar Tourism",
    slug: "bihar-tourism",
    summary: "Full stack tourism platform with admin dashboard, CMS, and advanced authentication",
    description: "A comprehensive tourism platform featuring multi-user authentication, real-time database management, and a complete admin dashboard with CMS capabilities.",
    stack: ["Node.js", "MongoDB", "Tailwind CSS", "Express", "EJS"],
    icon: "🌍",
    live_url: "https://www.explorebihar.online/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 2,
  },
  {
    id: "project-2",
    title: "Polymers & Granules Hub",
    slug: "polymers-granules-hub",
    summary: "B2B polymer sourcing platform for recycled and virgin plastic raw materials",
    description: "A B2B platform featuring category-based product discovery, bulk order flow with quote and cart workflow, and comprehensive B2B trust sections.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Tailwind CSS"],
    icon: "♻️",
    live_url: "https://www.granuleshub.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 1,
  },
  {
    id: "project-3",
    title: "RAJ EVENTS",
    slug: "raj-events",
    summary: "Full stack event management and booking system with admin panel",
    description: "Complete event management system with JWT authentication, online booking, comprehensive admin dashboard, and multi-image upload with Cloudinary.",
    stack: ["Node.js", "Express", "MongoDB", "EJS", "Tailwind CSS", "JWT", "Cloudinary"],
    icon: "🎉",
    live_url: "https://raj-events.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 4,
  },
  {
    id: "project-4",
    title: "Avnautics Aviation",
    slug: "avnautics-aviation",
    summary: "Aviation training and placement-focused platform",
    description: "Aviation training platform featuring program showcases, counselling funnel, enquiry capture, and placement mentorship sections.",
    stack: ["Node.js", "Express", "EJS", "Tailwind CSS", "JavaScript"],
    icon: "✈️",
    live_url: "https://aero-tft2.onrender.com/",
    repo_url: null,
    cover_image: null,
    featured: true,
    status: "Shipped",
    sort_order: 3,
  },
];

function ProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    x.set((relX - 0.5) * 8);
    y.set((relY - 0.5) * 8);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, rotateX: springY, rotateY: springX }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="relative h-36 sm:h-48 bg-gradient-to-br from-[#4F8CFF]/10 to-[#7B61FF]/10 flex items-center justify-center overflow-hidden">
          <div className="text-6xl transition-transform duration-500 group-hover:scale-110">
            {project.icon}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#4F8CFF]/90 text-white hover:bg-[#4F8CFF] transition-colors"
                aria-label="Live preview"
              >
                <ExternalLink size={14} />
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Source code"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-[#4F8CFF] transition-colors">
              {project.title}
            </h3>
            <span className="shrink-0 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full bg-[#4F8CFF]/10 text-[#4F8CFF] border border-[#4F8CFF]/20">
              {project.status}
            </span>
          </div>
          <p className="text-sm text-[#B4B4B4] leading-relaxed flex-1 line-clamp-2">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2.5 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#4F8CFF] font-medium group/link"
          >
            Case Study
            <ArrowUpRight size={14} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  if (!featuredProjects.length) return null;

  return (
    <section className="section-padding">
      <div className="page-container">
        <SectionHeading
          label="Work"
          title="Selected projects that showcase my expertise."
          description="Each project represents a unique challenge solved with clean architecture and premium execution."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {featuredProjects.slice(0, 3).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="flex justify-center mt-8">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-all text-sm font-medium"
            >
              View All Projects
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
