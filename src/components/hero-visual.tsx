"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const statPills = [
  { label: "Projects", value: "20+" },
  { label: "Frontend", value: "Next.js" },
  { label: "Backend", value: "Node.js" },
];

export function HeroVisual() {
  return (
    <div className="relative flex justify-center lg:justify-end">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="hero-portrait-wrap relative">
          <div className="hero-portrait-glow absolute inset-0" />
          <div className="hero-portrait-ring absolute inset-0 rounded-full" />
          <div className="hero-portrait relative overflow-hidden rounded-full">
            <Image
              src="/amiiit.png"
              alt="Amit Kumar portrait"
              fill
              priority
              className="object-cover object-[center_top]"
              sizes="(max-width: 768px) 320px, 480px"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {statPills.map((item, index) => (
            <motion.div
              key={item.label}
              className="hero-stat-pill"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">{item.label}</p>
              <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
