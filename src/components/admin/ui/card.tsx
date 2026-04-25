"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-slate-900/80 p-6 backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/10 transition-transform group-hover:scale-150" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-purple-500/10 transition-transform group-hover:scale-150" />
      
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-white/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {subtitle && <p className="mt-1 text-sm text-white/40">{subtitle}</p>}
          {trend && (
            <p className={`mt-2 text-sm font-medium ${trend.isPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl ${
        hover ? "transition-all hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between border-b border-white/5 px-6 py-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}