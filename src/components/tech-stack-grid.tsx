"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { techStackItems } from "@/lib/site-data";

export function TechStackGrid() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.38,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3 md:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {techStackItems.map((item) => {
        const Icon = item.icon;

        return (
          <motion.article
            key={item.name}
            className={`group subtle-tag inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 ${item.glow}`}
            variants={itemVariants}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
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
    </motion.div>
  );
}

