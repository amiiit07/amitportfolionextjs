"use client";

import { motion, useReducedMotion } from "framer-motion";
import { portfolioStats } from "@/lib/site-data";

export function StatsGrid() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {portfolioStats.map((stat, index) => (
        <motion.article
          key={stat.label}
          className="surface rounded-[1.6rem] p-5 text-center"
          variants={itemVariants}
          whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.005 }}
          transition={{ type: "spring", stiffness: 180, damping: 24 }}
        >
          <p className="display-title text-4xl font-semibold text-glow">{stat.value}</p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-muted">{stat.label}</p>
        </motion.article>
      ))}
    </motion.div>
  );
}

