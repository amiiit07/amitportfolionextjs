"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const isHoveringRef = useRef(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".interactive");

      if (isClickable) {
        isHoveringRef.current = true;
        cursorRef.current?.classList.add("scale-150", "opacity-60");
        cursorFollowerRef.current?.classList.add("scale-[3]", "opacity-20");
      } else {
        isHoveringRef.current = false;
        cursorRef.current?.classList.remove("scale-150", "opacity-60");
        cursorFollowerRef.current?.classList.remove("scale-[3]", "opacity-20");
      }
    };

    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      document.body.style.cursor = "auto";
      return;
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed left-0 top-0 z-[9998] pointer-events-none w-3 h-3 rounded-full bg-[#4F8CFF] mix-blend-difference transition-all duration-150 ease-out"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        ref={cursorFollowerRef}
        className="fixed left-0 top-0 z-[9997] pointer-events-none w-8 h-8 rounded-full border border-[#4F8CFF]/30 transition-all duration-300 ease-out"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
