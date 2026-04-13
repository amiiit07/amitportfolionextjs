"use client";

import { motion } from "framer-motion";
import { skillMetrics } from "@/lib/site-data";

export function SkillsGrid() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {skillMetrics.map((skill, index) => (
        <motion.article
          key={skill.name}
          className="surface group rounded-[1.75rem] p-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          whileHover={{ scale: 1.015, y: -3 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex rounded-2xl border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-semibold text-accent shadow-[0_0_20px_rgba(59,224,255,0.18)]">
                {skill.icon}
              </div>
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{skill.description}</p>
            </div>
            <span className="display-title text-2xl font-semibold text-glow">{skill.level}%</span>
          </div>

          <div className="progress-track mt-5 h-3">
            <motion.div
              className="progress-fill h-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: index * 0.08 + 0.1 }}
            />
          </div>
        </motion.article>
      ))}
    </div>
  );
}
