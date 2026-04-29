"use client";

import Image from "next/image";
import { motion, useAnimationControls, useReducedMotion, type Variants } from "framer-motion";
import { Code2, Database, Layout } from "lucide-react";

const statPills = [
  { label: "Projects", value: "5+", icon: Code2 },
  { label: "Frontend", value: "Next.js", icon: Layout },
  { label: "Backend", value: "Node.js", icon: Database },
];

export function HeroVisual() {
  const portraitControls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  const statsContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const statsItem: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.15 : 0.4,
        ease: "easeOut",
      },
    },
  };

  async function handlePortraitClick() {
    await Promise.all([
      portraitControls.start({
        scale: [1, 1.04, 0.985, 1],
        rotate: [0, 0.8, -0.8, 0],
        transition: { duration: 0.55, ease: "easeInOut" },
      }),
    ]);
  }

  return (
    <div className="relative flex justify-center lg:justify-end">
      <motion.div
        className="relative hero-visual-float"
        initial={shouldReduceMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: "easeOut" }}
        animate={shouldReduceMotion ? undefined : {
          y: [0, -12, 0, 8, 0],
          rotate: [0, 0.45, 0, -0.45, 0],
        }}
      >
        <motion.div
          className="hero-portrait-wrap relative"
          animate={portraitControls}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.01, rotate: 0.2 }}
          onClick={handlePortraitClick}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void handlePortraitClick();
            }
          }}
          aria-label="Animate profile image"
        >
          <div className="hero-portrait-blob hero-portrait-blob-blue absolute -left-8 top-12" />
          <div className="hero-portrait-blob hero-portrait-blob-purple absolute -right-6 bottom-16" />
          <div className="hero-portrait-aura absolute inset-0 rounded-[10rem]" />
          <div className="hero-portrait-orbit absolute inset-0 rounded-[10rem]" />
          <div className="hero-portrait relative overflow-hidden rounded-[10rem] border-4 border-white/10">
            <Image
              src="/amiiit.png"
              alt="Amit Kumar portrait"
              fill
              priority
              className="object-cover object-[center_top]"
              sizes="(max-width: 768px) 320px, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="hero-portrait-dot hero-portrait-dot-blue absolute left-5 top-8" />
          <div className="hero-portrait-dot hero-portrait-dot-purple absolute bottom-14 right-7" />
        </motion.div>

        <motion.div
          className="mt-8 hidden gap-4 sm:grid sm:grid-cols-3"
          variants={statsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {statPills.map((item) => (
            <motion.div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-accent/30"
              variants={statsItem}
              whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                  <p className="text-sm font-semibold text-white">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}