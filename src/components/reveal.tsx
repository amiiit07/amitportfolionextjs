"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
};

const directionVariants = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { y: 0, x: 0 },
};

export function Reveal({ 
  children, 
  delay = 0, 
  className, 
  direction = "up",
  duration = 0.6,
  once = true
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  
  const initial = shouldReduceMotion 
    ? { opacity: 1 } 
    : { opacity: 0, ...directionVariants[direction] };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : duration, 
        ease: "easeOut", 
        delay: shouldReduceMotion ? 0 : delay 
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
};

export function Stagger({ children, className, delay = 0, staggerChildren = 0.08 }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerChildren,
            delayChildren: shouldReduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ 
  children, 
  delay = 0, 
  className,
  duration = 0.5 
}: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
  duration?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : duration, 
        delay: shouldReduceMotion ? 0 : delay 
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideIn({ 
  children, 
  delay = 0, 
  className,
  direction = "left"
}: { 
  children: ReactNode; 
  delay?: number; 
  className?: string;
  direction?: "left" | "right";
}) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.5, 
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}