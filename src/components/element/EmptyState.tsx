"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Inbox, Search, AlertCircle, Lock } from "lucide-react";

export type EmptyStateVariant = "default" | "search" | "error" | "permissions";

export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  className?: string;
}

const defaultConfig: Record<EmptyStateVariant, { icon: React.ReactNode; title: string; description: string; iconBg: string }> = {
  default: {
    icon: <Inbox className="w-8 h-8" />,
    title: "Nothing here yet",
    description: "Get started by adding your first item.",
    iconBg: "bg-purple-100/70 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400",
  },
  search: {
    icon: <Search className="w-8 h-8" />,
    title: "No results found",
    description: "Try adjusting your search or filter terms.",
    iconBg: "bg-blue-100/70 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400",
  },
  error: {
    icon: <AlertCircle className="w-8 h-8" />,
    title: "Something went wrong",
    description: "We couldn't load this content. Please try again.",
    iconBg: "bg-red-100/70 dark:bg-red-900/30 text-red-500 dark:text-red-400",
  },
  permissions: {
    icon: <Lock className="w-8 h-8" />,
    title: "Access restricted",
    description: "You don't have permission to view this content.",
    iconBg: "bg-amber-100/70 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400",
  },
};

export function EmptyState({
  variant = "default",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const cfg = defaultConfig[variant];

  return (
    <div className={cn("flex flex-col items-center justify-center text-center gap-4 py-12 px-6 animate-fade-in", className)}>
      <span className={cn("inline-flex items-center justify-center w-16 h-16 rounded-3xl", cfg.iconBg)}>
        {icon ?? cfg.icon}
      </span>
      <div className="flex flex-col gap-1.5 max-w-[280px]">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {title ?? cfg.title}
        </h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
          {description ?? cfg.description}
        </p>
      </div>
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2">
          {secondaryAction && (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-white/8 transition-all duration-150"
            >
              {secondaryAction.label}
            </button>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-600/40 hover:bg-purple-200/70 dark:hover:bg-purple-800/40 transition-all duration-150"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
