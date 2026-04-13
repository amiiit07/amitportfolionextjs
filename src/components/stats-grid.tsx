"use client";

import { motion } from "framer-motion";
import { portfolioStats } from "@/lib/site-data";

export function StatsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {portfolioStats.map((stat, index) => (
        <motion.article
          key={stat.label}
          className="surface rounded-[1.6rem] p-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
          whileHover={{ y: -4 }}
        >
          <p className="display-title text-4xl font-semibold text-glow">{stat.value}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">{stat.label}</p>
        </motion.article>
      ))}
    </div>
  );
}

