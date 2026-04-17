"use client";

import { useEffect, useMemo, useState } from "react";

type BlogReadingProgressProps = {
  targetId: string;
};

export function BlogReadingProgress({ targetId }: BlogReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const update = () => {
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight * 0.45;
      const consumed = -rect.top + viewportHeight * 0.18;
      const nextProgress = totalScrollable > 0 ? Math.min(100, Math.max(0, (consumed / totalScrollable) * 100)) : 0;
      setProgress(nextProgress);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  const roundedProgress = useMemo(() => Math.round(progress), [progress]);

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-16 z-40 h-1 bg-white/10 lg:hidden">
        <div
          className="h-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="pointer-events-none fixed right-4 top-24 z-40 hidden w-48 rounded-xl border border-white/15 bg-[#0b1428]/80 p-3 backdrop-blur-lg lg:block">
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/55">Reading Progress</p>
        <p className="mt-1 text-sm font-semibold text-white">{roundedProgress}%</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
}
