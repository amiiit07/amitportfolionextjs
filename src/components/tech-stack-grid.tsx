"use client";

import { motion } from "framer-motion";
import { techStackItems } from "@/lib/site-data";

export function TechStackGrid() {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {techStackItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.name}
            className={`group subtle-tag inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 ${item.glow}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.42, delay: index * 0.05 }}
            whileHover={{ y: -3, scale: 1.03 }}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#c4b5fd] group-hover:text-[#dbeafe]">
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold tracking-wide text-white">{item.name}</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{item.category}</span>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

