"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No data available",
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white/50"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-white/40"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <motion.tr
                key={keyExtractor(item)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-white/5 transition-colors hover:bg-white/5 ${
                  onRowClick ? "cursor-pointer" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-4 text-sm text-white/80 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(item)
                      : (item as Record<string, unknown>)[column.key] as ReactNode}
                  </td>
                ))}
              </motion.tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  children: ReactNode;
}

export function Badge({ variant = "default", children }: BadgeProps) {
  const variants = {
    default: "bg-slate-500/20 text-slate-300",
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/20 text-amber-400",
    danger: "bg-rose-500/20 text-rose-400",
    info: "bg-indigo-500/20 text-indigo-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white/10`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-medium text-white ring-2 ring-white/10`}
    >
      {initials}
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  variant = "default",
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variants = {
    default: "from-indigo-500 to-purple-500",
    success: "from-emerald-500 to-teal-500",
    warning: "from-amber-500 to-orange-500",
    danger: "from-rose-500 to-red-500",
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-white/60">Progress</span>
          <span className="text-white/80">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${variants[variant]}`}
        />
      </div>
    </div>
  );
}