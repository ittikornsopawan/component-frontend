"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeMap: Record<AvatarSize, { dim: string; text: string; icon: string }> = {
  "xs":  { dim: "w-5 h-5",   text: "text-[9px]",  icon: "w-3 h-3" },
  "sm":  { dim: "w-7 h-7",   text: "text-[10px]", icon: "w-3.5 h-3.5" },
  "md":  { dim: "w-9 h-9",   text: "text-xs",     icon: "w-4 h-4" },
  "lg":  { dim: "w-11 h-11", text: "text-sm",     icon: "w-5 h-5" },
  "xl":  { dim: "w-14 h-14", text: "text-base",   icon: "w-6 h-6" },
  "2xl": { dim: "w-[72px] h-[72px]", text: "text-xl", icon: "w-8 h-8" },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  ring?: boolean;
  status?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  shape = "circle",
  ring = false,
  status,
  className,
  onClick,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { dim, text, icon } = sizeMap[size];
  const radius = shape === "circle" ? "rounded-full" : "rounded-xl";
  const isClickable = !!onClick;

  const showImage = src && !imgError;
  const initials = fallback?.slice(0, 2).toUpperCase();

  return (
    <span
      className={cn("relative inline-flex flex-shrink-0", className)}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <span
        className={cn(
          "flex items-center justify-center overflow-hidden select-none",
          dim,
          radius,
          ring && "ring-2 ring-purple-300/60 dark:ring-purple-500/40 ring-offset-2 ring-offset-white dark:ring-offset-slate-900",
          isClickable && "cursor-pointer hover:ring-2 hover:ring-purple-300/50 transition-all duration-150",
          !showImage && "bg-gradient-to-br from-purple-300 to-blue-300 dark:from-purple-500 dark:to-blue-500"
        )}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? fallback ?? "Avatar"}
            onError={() => setImgError(true)}
            className={cn("w-full h-full object-cover animate-fade-in", radius)}
          />
        ) : initials ? (
          <span className={cn("font-semibold text-white", text)}>{initials}</span>
        ) : (
          <User className={cn("text-white/80", icon)} />
        )}
      </span>

      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 z-10">
          {status}
        </span>
      )}
    </span>
  );
}

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Pick<AvatarProps, "src" | "alt" | "fallback">[];
  max?: number;
  size?: AvatarSize;
  className?: string;
}

const overlapMap: Record<AvatarSize, string> = {
  "xs":  "-ml-2",
  "sm":  "-ml-2.5",
  "md":  "-ml-3",
  "lg":  "-ml-4",
  "xl":  "-ml-5",
  "2xl": "-ml-6",
};

export function AvatarGroup({ avatars, max = 4, size = "md", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;
  const { dim, text } = sizeMap[size];
  const overlap = overlapMap[size];

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((av, i) => (
        <span
          key={i}
          className={cn(
            "relative inline-flex ring-2 ring-white dark:ring-slate-900 rounded-full transition-transform duration-150 hover:scale-110 hover:z-10",
            i > 0 && overlap
          )}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar {...av} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "relative inline-flex items-center justify-center rounded-full",
            "bg-white/60 dark:bg-white/15 border border-white/30 dark:border-white/20",
            "ring-2 ring-white dark:ring-slate-900",
            "font-semibold text-gray-600 dark:text-gray-400",
            dim, text,
            overlap
          )}
          style={{ zIndex: 0 }}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
