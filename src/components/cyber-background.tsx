"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 11) % 88)}%`,
  top: `${8 + ((index * 13) % 84)}%`,
  delay: index * 0.25,
  duration: 5 + (index % 4),
  size: 4 + (index % 3) * 2,
}));

export function CyberBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 cyber-dots" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-accent/80 shadow-[0_0_18px_rgba(255,74,216,0.8)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -16, 8, 0],
            x: [0, 10, -6, 0],
            opacity: [0.22, 0.85, 0.32, 0.22],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
      <div className="absolute left-[10%] top-[14%] h-56 w-56 rounded-full bg-accent/14 blur-[110px]" />
      <div className="absolute right-[8%] top-[22%] h-64 w-64 rounded-full bg-accent-2/16 blur-[120px]" />
      <div className="absolute bottom-[10%] left-[36%] h-72 w-72 rounded-full bg-accent-4/12 blur-[140px]" />
    </div>
  );
}

