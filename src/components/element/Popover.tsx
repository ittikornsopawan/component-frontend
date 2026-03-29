"use client";

import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { Portal } from "./utility/Portal";
import { surface, radius, zIndex } from "./base/tokens";

export type PopoverPosition = "bottom-start" | "bottom-end" | "top-start" | "top-end";
export type PopoverWidth = "sm" | "md" | "lg" | "auto";

export interface PopoverProps {
  trigger: React.ReactElement;
  position?: PopoverPosition;
  width?: PopoverWidth;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const widthMap: Record<PopoverWidth, number> = {
  sm:   220,
  md:   320,
  lg:   420,
  auto: 0,   // no fixed width
};

const GAP = 6;

type Coords = { top: number; left: number };

function computeCoords(
  trigger: DOMRect,
  popoverWidth: number,
  popoverHeight: number,
  position: PopoverPosition
): Coords {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = popoverWidth || 180;

  let top = 0;
  let left = 0;

  switch (position) {
    case "bottom-start":
      top  = trigger.bottom + GAP;
      left = trigger.left;
      break;
    case "bottom-end":
      top  = trigger.bottom + GAP;
      left = trigger.right - w;
      break;
    case "top-start":
      top  = trigger.top - popoverHeight - GAP;
      left = trigger.left;
      break;
    case "top-end":
      top  = trigger.top - popoverHeight - GAP;
      left = trigger.right - w;
      break;
  }

  // Auto-flip vertically
  if ((position === "bottom-start" || position === "bottom-end") && top + popoverHeight > vh) {
    top = trigger.top - popoverHeight - GAP;
  }
  if ((position === "top-start" || position === "top-end") && top < 0) {
    top = trigger.bottom + GAP;
  }

  // Clamp to viewport
  return {
    top:  Math.max(8, Math.min(top,  vh - popoverHeight - 8)),
    left: Math.max(8, Math.min(left, vw - w - 8)),
  };
}

export function Popover({
  trigger,
  position = "bottom-start",
  width = "md",
  className,
  contentClassName,
  children,
  onOpenChange,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<Coords>({ top: -9999, left: -9999 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    setCoords(computeCoords(triggerRect, widthMap[width], popoverRect.height, position));
  }, [position, width]);

  const toggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen((v) => {
      const next = !v;
      onOpenChange?.(next);
      return next;
    });
  }, [onOpenChange]);

  // Position after open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, updatePosition]);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) return;
      setOpen(false);
      onOpenChange?.(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); onOpenChange?.(false); }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: (e: React.MouseEvent) => { toggle(e); trigger.props.onClick?.(e); },
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "aria-controls": open ? id : undefined,
  });

  return (
    <span ref={triggerRef} className={cn("inline-flex", className)}>
      {clonedTrigger}
      {open && (
        <Portal>
          <div
            ref={popoverRef}
            id={id}
            role="dialog"
            aria-modal="false"
            className={cn(
              "fixed animate-fade-in",
              zIndex.dropdown,
              surface.overlay,
              radius.md,
              "overflow-hidden",
              width !== "auto" ? `w-[${widthMap[width]}px]` : "w-auto min-w-[180px]",
              contentClassName
            )}
            style={{ top: coords.top, left: coords.left, width: width !== "auto" ? widthMap[width] : undefined }}
          >
            {children}
          </div>
        </Portal>
      )}
    </span>
  );
}

export function PopoverContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-3", className)} {...props}>
      {children}
    </div>
  );
}

export function PopoverItem({
  icon,
  label,
  description,
  onClick,
  disabled,
  destructive,
  className,
}: {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-150 text-left",
        destructive
          ? "text-red-600 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-900/20"
          : "text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-white/8 hover:text-gray-900 dark:hover:text-white",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {icon && <span className="flex-shrink-0 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <span className="font-medium truncate">{label}</span>
        {description && <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{description}</span>}
      </div>
    </button>
  );
}

export function PopoverDivider() {
  return <div aria-hidden="true" className="my-1 mx-3 h-px bg-white/20 dark:bg-white/10" />;
}
