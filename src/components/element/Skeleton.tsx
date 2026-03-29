"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ─── Shimmer keyframe injected via globals.css (already has animate-fade-in etc.)
// We use a CSS animation for the shimmer sweep.

const shimmerBase =
  "relative overflow-hidden bg-white/40 dark:bg-white/8 rounded-xl before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent";

// ─── Base Skeleton ────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: string;
  animate?: boolean;
}

export function Skeleton({
  width = "w-full",
  height = "h-4",
  rounded = "rounded-xl",
  animate = true,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        animate ? shimmerBase : "bg-white/40 dark:bg-white/8",
        rounded,
        width,
        height,
        className
      )}
      {...props}
    />
  );
}

// ─── Skeleton.Text ────────────────────────────────────────────────────────────

export interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  gap?: string;
  className?: string;
}

function SkeletonText({ lines = 3, lastLineWidth = "w-2/3", gap = "gap-2", className }: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col", gap, className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="h-3.5"
          width={i === lines - 1 ? lastLineWidth : "w-full"}
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Skeleton.Avatar ──────────────────────────────────────────────────────────

type SkeletonAvatarSize = "sm" | "md" | "lg" | "xl";

const avatarSizes: Record<SkeletonAvatarSize, string> = {
  sm: "w-7 h-7",
  md: "w-9 h-9",
  lg: "w-11 h-11",
  xl: "w-14 h-14",
};

function SkeletonAvatar({ size = "md", className }: { size?: SkeletonAvatarSize; className?: string }) {
  return <Skeleton rounded="rounded-full" width={avatarSizes[size]} height={avatarSizes[size]} className={cn("flex-shrink-0", className)} />;
}

// ─── Skeleton.Card ────────────────────────────────────────────────────────────

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl p-6 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/8 flex flex-col gap-4", className)}>
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="md" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton height="h-4" width="w-2/5" />
          <Skeleton height="h-3" width="w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
      <div className="flex gap-2 mt-1">
        <Skeleton height="h-8" width="w-24" rounded="rounded-xl" />
        <Skeleton height="h-8" width="w-16" rounded="rounded-xl" />
      </div>
    </div>
  );
}

// ─── Skeleton.ListItem ────────────────────────────────────────────────────────

function SkeletonListItem({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-3", className)}>
      <SkeletonAvatar size="md" />
      <div className="flex flex-col gap-1.5 flex-1">
        <Skeleton height="h-3.5" width="w-1/3" />
        <Skeleton height="h-3" width="w-1/2" />
      </div>
      <Skeleton height="h-5" width="w-14" rounded="rounded-full" />
    </div>
  );
}

// ─── Skeleton.StatCard ────────────────────────────────────────────────────────

function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-3xl p-6 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/8 flex flex-col gap-3", className)}>
      <Skeleton height="h-3" width="w-1/3" />
      <Skeleton height="h-8" width="w-1/2" />
      <Skeleton height="h-3" width="w-2/5" />
    </div>
  );
}

// ─── Attach sub-components ────────────────────────────────────────────────────

Skeleton.Text     = SkeletonText;
Skeleton.Avatar   = SkeletonAvatar;
Skeleton.Card     = SkeletonCard;
Skeleton.ListItem = SkeletonListItem;
Skeleton.StatCard = SkeletonStatCard;
