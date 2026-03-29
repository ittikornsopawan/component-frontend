"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export type PaginationVariant = "default" | "compact" | "minimal";

export interface PaginationProps {
  page?: number;
  defaultPage?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  variant?: PaginationVariant;
  showFirstLast?: boolean;
  showPageInput?: boolean;
  className?: string;
}

function PageBtn({
  active, disabled, onClick, children, className,
}: {
  active?: boolean; disabled?: boolean; onClick?: () => void; children: React.ReactNode; className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-xl text-sm font-medium transition-all duration-150 select-none",
        "border border-white/20 dark:border-white/10",
        active
          ? "bg-purple-400/20 dark:bg-purple-500/20 border-purple-300/40 dark:border-purple-600/40 text-purple-700 dark:text-purple-300 shadow-sm"
          : "bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white",
        disabled && "opacity-30 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {children}
    </button>
  );
}

function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export function Pagination({
  page,
  defaultPage = 1,
  totalPages,
  onPageChange,
  variant = "default",
  showFirstLast = false,
  showPageInput = false,
  className,
}: PaginationProps) {
  const [internal, setInternal] = useState(defaultPage);
  const [inputVal, setInputVal] = useState("");
  const current = page !== undefined ? page : internal;

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    if (page === undefined) setInternal(clamped);
    onPageChange?.(clamped);
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <PageBtn disabled={current <= 1} onClick={() => go(current - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </PageBtn>
        <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">
          Page <span className="font-semibold text-gray-800 dark:text-gray-200">{current}</span> of {totalPages}
        </span>
        <PageBtn disabled={current >= totalPages} onClick={() => go(current + 1)}>
          <ChevronRight className="w-4 h-4" />
        </PageBtn>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <PageBtn disabled={current <= 1} onClick={() => go(current - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </PageBtn>
        <PageBtn disabled={current >= totalPages} onClick={() => go(current + 1)}>
          <ChevronRight className="w-4 h-4" />
        </PageBtn>
      </div>
    );
  }

  const pages = getPageRange(current, totalPages);

  return (
    <div className={cn("flex items-center gap-1.5 flex-wrap", className)}>
      {showFirstLast && (
        <PageBtn disabled={current <= 1} onClick={() => go(1)}>
          <ChevronsLeft className="w-4 h-4" />
        </PageBtn>
      )}
      <PageBtn disabled={current <= 1} onClick={() => go(current - 1)}>
        <ChevronLeft className="w-4 h-4" />
      </PageBtn>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">
            …
          </span>
        ) : (
          <PageBtn key={p} active={p === current} onClick={() => go(p as number)}>
            {p}
          </PageBtn>
        )
      )}

      <PageBtn disabled={current >= totalPages} onClick={() => go(current + 1)}>
        <ChevronRight className="w-4 h-4" />
      </PageBtn>
      {showFirstLast && (
        <PageBtn disabled={current >= totalPages} onClick={() => go(totalPages)}>
          <ChevronsRight className="w-4 h-4" />
        </PageBtn>
      )}

      {showPageInput && (
        <div className="flex items-center gap-2 ml-2">
          <span className="text-sm text-gray-400 dark:text-gray-500">Go to</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const n = parseInt(inputVal);
                if (!isNaN(n)) { go(n); setInputVal(""); }
              }
            }}
            className="w-14 h-9 rounded-xl text-sm text-center bg-white/50 dark:bg-white/5 border border-white/25 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      )}
    </div>
  );
}
