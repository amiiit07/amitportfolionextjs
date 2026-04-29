"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  isLoading?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-indigo-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/25",
  secondary:
    "bg-slate-800 text-white border-slate-700 hover:bg-slate-700 hover:border-slate-600",
  ghost: "bg-transparent text-white/70 border-transparent hover:bg-white/10 hover:text-white",
  danger: "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 hover:border-rose-500/50",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const iconSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  isLoading,
  icon,
  className = "",
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}

type IconButtonProps = {
  icon: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export function IconButton({ icon, variant = "ghost", size = "md", className = "", type = "button", onClick }: IconButtonProps) {
  const iconVariants = {
    primary: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30",
    secondary: "bg-slate-800 text-white/70 hover:bg-slate-700 hover:text-white",
    ghost: "text-white/50 hover:bg-white/10 hover:text-white",
    danger: "text-rose-400 hover:bg-rose-500/10 hover:text-rose-300",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center rounded-xl border border-white/10 transition-colors ${iconSizes[size]} ${iconVariants[variant]} ${className}`}
      type={type}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  );
}
