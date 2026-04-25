"use client";

import dynamic from "next/dynamic";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export const CyberBackground = dynamic(
  () => import("@/components/cyber-background").then((m) => ({ default: m.CyberBackground })),
  { ssr: false }
);

export const ThreeBackground = dynamic(
  () => import("@/components/three-background").then((m) => ({ default: m.ThreeBackground })),
  { ssr: false }
);

export const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
);