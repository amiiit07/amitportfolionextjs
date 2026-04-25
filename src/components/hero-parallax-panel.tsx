"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BriefcaseBusiness, Gauge, Rocket } from "lucide-react";
import { useRef } from "react";

const stats = [
  { label: "Production Projects", value: "20+", icon: BriefcaseBusiness },
  { label: "Core Stack", value: "React / Next.js", icon: Rocket },
  { label: "Lighthouse Focus", value: "90+", icon: Gauge },
];

export function HeroParallaxPanel() {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scopeRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [36, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <div ref={scopeRef} className="relative">
      <motion.div style={{ y, rotate }} className="glass-shell rounded-[2rem] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.24em] text-white/60">Full Stack Developer</p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white md:text-[2rem]">
          Crafting interfaces that feel premium and perform fast.
        </h3>
        <p className="mt-4 text-sm leading-7 text-muted md:text-base">
          React + Tailwind v4 + Framer Motion with scalable component architecture and accessible interactions.
        </p>

        <div className="mt-7 grid gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                className="glass-shell flex items-center justify-between rounded-2xl px-4 py-3"
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.42, delay: index * 0.08 }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#8b5cf6]">
                    <Icon size={18} />
                  </span>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/65">{stat.label}</p>
                </div>
                <p className="text-sm font-semibold text-white">{stat.value}</p>
              </motion.article>
            );
          })}
        </div>
      </motion.div>

      <div className="mesh-blob mesh-blob-blue mesh-spin -left-10 -top-10 h-28 w-28" />
      <div className="mesh-blob mesh-blob-purple -bottom-8 -right-6 h-24 w-24" />
    </div>
  );
}
