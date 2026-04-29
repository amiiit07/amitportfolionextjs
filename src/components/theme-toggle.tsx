"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`rounded-full p-2.5 hover:bg-white/10 transition-colors ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      suppressHydrationWarning
    >
      {isDark ? (
        <Moon size={20} className="text-white/70" />
      ) : (
        <Sun size={20} className="text-black/70" />
      )}
    </button>
  );
}
