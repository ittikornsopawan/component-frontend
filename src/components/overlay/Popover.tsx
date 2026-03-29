"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PopoverPlacement = "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
export type PopoverTrigger   = "click" | "hover";

export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  title?: string;
  placement?: PopoverPlacement;
  triggerOn?: PopoverTrigger;
  showClose?: boolean;
  offset?: number;
  className?: string;
  contentClassName?: string;
}

// ─── Position calculator ──────────────────────────────────────────────────────

interface Pos { top: number; left: number; transformOrigin: string; }

function calcPos(
  triggerEl: HTMLElement,
  panelEl: HTMLElement,
  placement: PopoverPlacement,
  offset: number
): Pos {
  const tr = triggerEl.getBoundingClientRect();
  const pw = panelEl.offsetWidth;
  const ph = panelEl.offsetHeight;
  const vp = { h: window.innerHeight, w: window.innerWidth };

  const cx = tr.left + tr.width / 2;
  const cy = tr.top  + tr.height / 2;

  // Resolve placement with auto-flip
  let resolved = placement;
  if (placement.startsWith("bottom") && tr.bottom + ph + offset > vp.h && tr.top - ph - offset > 0)
    resolved = placement.replace("bottom", "top") as PopoverPlacement;
  if (placement.startsWith("top") && tr.top - ph - offset < 0 && tr.bottom + ph + offset < vp.h)
    resolved = placement.replace("top", "bottom") as PopoverPlacement;

  let top = 0, left = 0, transformOrigin = "center bottom";

  if (resolved.startsWith("bottom")) {
    top  = tr.bottom + offset;
    left = resolved === "bottom-end" ? tr.right - pw : resolved === "bottom-start" ? tr.left : cx - pw / 2;
    transformOrigin = "center top";
  } else if (resolved.startsWith("top")) {
    top  = tr.top - ph - offset;
    left = resolved === "top-end" ? tr.right - pw : resolved === "top-start" ? tr.left : cx - pw / 2;
    transformOrigin = "center bottom";
  } else if (resolved === "left") {
    top  = cy - ph / 2;
    left = tr.left - pw - offset;
    transformOrigin = "right center";
  } else if (resolved === "right") {
    top  = cy - ph / 2;
    left = tr.right + offset;
    transformOrigin = "left center";
  }

  // Clamp to viewport
  left = Math.max(8, Math.min(left, vp.w - pw - 8));
  top  = Math.max(8, Math.min(top,  vp.h - ph - 8));

  return { top, left, transformOrigin };
}

// ─── Popover ──────────────────────────────────────────────────────────────────

export function Popover({
  trigger,
  content,
  title,
  placement = "bottom",
  triggerOn = "click",
  showClose = true,
  offset = 8,
  className,
  contentClassName,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState<Pos | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const id = useId();

  const close = useCallback(() => setOpen(false), []);

  const updatePos = useCallback(() => {
    if (!triggerRef.current || !panelRef.current || !open) return;
    setPos(calcPos(triggerRef.current, panelRef.current, placement, offset));
  }, [open, placement, offset]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(updatePos);
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  // Click outside
  useEffect(() => {
    if (!open || triggerOn !== "click") return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        panelRef.current?.contains(e.target as Node)
      ) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close, triggerOn]);

  // ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  const triggerProps: React.HTMLAttributes<HTMLElement> & { ref: typeof triggerRef } = {
    ref: triggerRef,
    "aria-haspopup": "dialog" as React.AriaAttributes["aria-haspopup"],
    "aria-expanded": open,
    "aria-controls": id,
    ...(triggerOn === "click"
      ? { onClick: () => setOpen((v) => !v) }
      : {
          onMouseEnter: () => setOpen(true),
          onMouseLeave: () => setOpen(false),
          onFocus:      () => setOpen(true),
          onBlur:       () => setOpen(false),
        }),
  };

  const cloned = React.cloneElement(trigger, triggerProps as unknown as Record<string, unknown>);

  const panel = open ? createPortal(
    <div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="false"
      className={cn(
        "fixed z-[250] min-w-[200px] max-w-xs",
        "bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl",
        "border border-white/30 dark:border-white/10",
        "rounded-2xl shadow-glass-xl animate-fade-in",
        className
      )}
      style={pos
        ? { top: pos.top, left: pos.left, transformOrigin: pos.transformOrigin }
        : { opacity: 0, pointerEvents: "none" }
      }
    >
      {(title || showClose) && (
        <div className="flex items-center justify-between gap-3 px-4 pt-3.5 pb-2 border-b border-white/20 dark:border-white/10">
          {title && <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{title}</p>}
          {showClose && (
            <button
              type="button"
              onClick={close}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-white/8 transition-all duration-150 ml-auto"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
      <div className={cn("p-4", contentClassName)}>
        {content}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      {cloned}
      {panel}
    </>
  );
}
