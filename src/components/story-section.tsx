"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type StorySectionProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function StorySection({ children, className, intensity = 28 }: StorySectionProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);

    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const mainContainer = targetRef.current?.closest("main");

    if (!mainContainer) {
      return;
    }

    containerRef.current = mainContainer;

    const computedPosition = window.getComputedStyle(mainContainer).position;
    if (computedPosition === "static") {
      mainContainer.style.position = "relative";
    }
  }, []);

  const disableParallax = shouldReduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start 90%", "end 15%"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [intensity * 0.6, 0, -intensity * 0.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.8, 1, 1, 0.9]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.992, 1, 0.998]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.85, 0]);
  const beamScale = useTransform(scrollYProgress, [0, 1], [0.65, 1]);

  if (disableParallax) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={targetRef}
      className={`relative ${className ?? ""}`.trim()}
      style={{ y, opacity, scale }}
      transition={{ type: "spring", stiffness: 120, damping: 24 }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-10 right-10 top-0 h-px origin-left bg-gradient-to-r from-transparent via-[#3b82f6]/80 to-transparent"
        style={{ opacity: beamOpacity, scaleX: beamScale }}
      />
      {children}
    </motion.div>
  );
}
