"use client";

import { useEffect, useState } from "react";
import { LenisSmoothScroll } from "./lenis-scroll";
import { CustomCursor } from "./custom-cursor";
import { LoadingScreen } from "./loading-screen";
import { ScrollProgress } from "./scroll-progress";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className={`${isLoading ? "hidden" : "block"}`}>
        <CustomCursor />
        <ScrollProgress />
        <LenisSmoothScroll />
        {children}
      </div>
    </>
  );
}
