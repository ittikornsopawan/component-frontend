"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useScrollLock } from "./hooks/useScrollLock";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DrawerPosition = "left" | "right" | "bottom";
export type DrawerSize     = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: DrawerSize;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sideSizeMap: Record<DrawerSize, string> = {
  sm:   "w-72",
  md:   "w-80",
  lg:   "w-96",
  full: "w-screen",
};

const bottomSizeMap: Record<DrawerSize, string> = {
  sm:   "h-64",
  md:   "h-80",
  lg:   "h-[28rem]",
  full: "h-[90vh]",
};

// ─── Drawer ───────────────────────────────────────────────────────────────────

export function Drawer({
  open,
  onClose,
  position = "right",
  size = "md",
  title,
  description,
  children,
  footer,
  closeOnBackdrop = true,
  showCloseButton = true,
  className,
}: DrawerProps) {
  const trapRef = useFocusTrap(open);
  useScrollLock(open);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  if (!open) return null;

  const isBottom = position === "bottom";

  const panelBase = cn(
    "fixed flex flex-col z-modal",
    "bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl",
    "border-white/30 dark:border-white/10",
    "shadow-glass-xl"
  );

  const panelPosition: Record<DrawerPosition, string> = {
    left:   cn("top-0 left-0 h-full border-r animate-slide-right", sideSizeMap[size]),
    right:  cn("top-0 right-0 h-full border-l animate-slide-left", sideSizeMap[size]),
    bottom: cn("bottom-0 left-0 w-full border-t rounded-t-4xl animate-slide-up", bottomSizeMap[size]),
  };

  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-modal">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={trapRef}
        className={cn(panelBase, panelPosition[position], className)}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-white/20 dark:border-white/10 flex-shrink-0">
            <div>
              {title && (
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Bottom sheet drag handle */}
        {isBottom && !title && (
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-white/20" />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex-shrink-0 px-5 py-4 border-t border-white/20 dark:border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
