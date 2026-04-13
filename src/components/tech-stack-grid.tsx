"use client";

import { motion } from "framer-motion";
import { techStackItems } from "@/lib/site-data";

export function TechStackGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {techStackItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.name}
            className={`surface rounded-[1.6rem] p-5 ${item.glow}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            whileHover={{ y: -4, scale: 1.01 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-accent shadow-[0_0_20px_rgba(59,224,255,0.14)]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                {item.category}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-white">{item.name}</h3>
          </motion.article>
        );
      })}
    </div>
  );
}

