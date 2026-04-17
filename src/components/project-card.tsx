"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
  delay?: number;
};

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-1"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#3b82f6]/20 via-transparent to-[#8b5cf6]/18 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative rounded-[1.8rem] bg-[#0c1429]/72 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {project.icon && (
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/20 text-3xl shadow-lg">
                {project.icon}
              </span>
            )}
            <div>
              <h3 className="font-display text-xl font-bold text-white group-hover:text-[#a5b4fc] transition-colors">
                {project.title}
              </h3>
              <span className="mt-1 inline-block rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-0.5 text-xs font-medium text-[#bfdbfe]">
                {project.status}
              </span>
            </div>
          </div>
          
          {project.featured ? (
            <span className="rounded-full border border-[#8b5cf6]/38 bg-[#8b5cf6]/18 px-3 py-1 text-xs font-semibold text-[#ddd6fe]">
              Featured
            </span>
          ) : null}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-xl border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-medium text-white/72 transition-colors group-hover:border-[#3b82f6]/34 group-hover:bg-[#3b82f6]/10 group-hover:text-[#dbeafe]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/50">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
          {project.live_url ? (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 rounded-xl border border-[#3b82f6]/48 bg-[#3b82f6]/18 px-4 py-2 text-sm font-semibold text-[#dbeafe] transition-all hover:bg-[#3b82f6] hover:text-white"
            >
              <ExternalLink size={16} />
              Live Demo
              <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          ) : null}
          {project.repo_url ? (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/10"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Code
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}