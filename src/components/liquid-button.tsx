"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type LiquidButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export function LiquidButton({ href, label, className }: LiquidButtonProps) {
  const filterId = useId().replace(/:/g, "");

  return (
    <motion.a
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold text-white ${className ?? ""}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 24 -12"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <span className="absolute inset-0 overflow-hidden" style={{ filter: `url(#${filterId})` }}>
        <span className="absolute left-[6%] top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#3b82f6]/85 transition-all duration-500 group-hover:left-[34%] group-hover:h-11 group-hover:w-11" />
        <span className="absolute right-[10%] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[#8b5cf6]/80 transition-all duration-500 group-hover:right-[26%] group-hover:h-12 group-hover:w-12" />
        <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6]/90 to-[#8b5cf6]/90" />
      </span>

      <span className="relative z-10 tracking-wide">{label}</span>
    </motion.a>
  );
}
