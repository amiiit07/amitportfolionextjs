"use client";

import { ArrowUpRight, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      className="surface group rounded-[2rem] p-5 md:p-6"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
    >
      <div className="project-preview rounded-[1.5rem] p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(59,224,255,0.9)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-3 shadow-[0_0_10px_rgba(255,60,172,0.75)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-2 shadow-[0_0_10px_rgba(181,23,255,0.7)]" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/58">Preview</span>
        </div>

        <div className="relative mt-6 rounded-[1.2rem] border border-white/8 bg-black/22 p-4">
          <div className="grid gap-3">
            <div className="h-3 w-1/3 rounded-full bg-accent/30" />
            <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
            <div className="h-2.5 w-2/3 rounded-full bg-white/10" />
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            {project.stack.slice(0, 3).map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/8 bg-white/6 px-3 py-2 text-xs text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="status-chip rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
          {project.status}
        </span>
        <div className="flex flex-wrap gap-2 text-xs text-muted">
          {project.stack.slice(0, 3).map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/4 px-3 py-1">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
        <p className="text-sm leading-7 text-white/82">{project.summary}</p>
        <p className="text-sm leading-7 text-muted">{project.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="neon-button inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white"
          >
            <ArrowUpRight className="h-4 w-4" />
            Live
          </a>
        ) : null}
        {project.repo_url ? (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noreferrer"
            className="neon-button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white"
          >
            <GitBranch className="h-4 w-4" />
            GitHub
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
