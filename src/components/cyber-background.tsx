"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 11) % 88)}%`,
  top: `${8 + ((index * 13) % 84)}%`,
  delay: index * 0.15,
  duration: 6 + (index % 2),
  size: 5 + (index % 2) * 2,
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
            y: [0, -12, 0],
            x: [0, 8, 0],
            opacity: [0.18, 0.7, 0.18],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: particle.delay,
          }}
        />
      ))}
      <div className="absolute left-[10%] top-[14%] h-56 w-56 rounded-full bg-accent/10 blur-[90px]" />
      <div className="absolute right-[8%] top-[22%] h-64 w-64 rounded-full bg-accent-2/12 blur-[100px]" />
      <div className="absolute bottom-[10%] left-[36%] h-72 w-72 rounded-full bg-accent-4/8 blur-[110px]" />
    </div>
  );
}

