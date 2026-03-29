"use client";

import React, { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipSize      = "sm" | "md";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: TooltipPlacement;
  delay?: number;
  size?: TooltipSize;
  disabled?: boolean;
  className?: string;
}

// ─── Position calculator ──────────────────────────────────────────────────────

function calcTooltipPos(
  triggerEl: HTMLElement,
  panelEl: HTMLElement,
  placement: TooltipPlacement,
  offset = 6
) {
  const tr  = triggerEl.getBoundingClientRect();
  const pw  = panelEl.offsetWidth;
  const ph  = panelEl.offsetHeight;
  const vp  = { h: window.innerHeight, w: window.innerWidth };
  const cx  = tr.left + tr.width  / 2;
  const cy  = tr.top  + tr.height / 2;

  let resolved = placement;
  if (placement === "top"    && tr.top    - ph - offset < 8)            resolved = "bottom";
  if (placement === "bottom" && tr.bottom + ph + offset > vp.h - 8)     resolved = "top";
  if (placement === "left"   && tr.left   - pw - offset < 8)            resolved = "right";
  if (placement === "right"  && tr.right  + pw + offset > vp.w - 8)     resolved = "left";

  let top = 0, left = 0;
  if (resolved === "top")    { top = tr.top  - ph - offset;  left = cx - pw / 2; }
  if (resolved === "bottom") { top = tr.bottom + offset;      left = cx - pw / 2; }
  if (resolved === "left")   { top = cy - ph / 2;             left = tr.left  - pw - offset; }
  if (resolved === "right")  { top = cy - ph / 2;             left = tr.right + offset; }

  return {
    top:  Math.max(4, Math.min(top,  vp.h - ph - 4)),
    left: Math.max(4, Math.min(left, vp.w - pw - 4)),
  };
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export function Tooltip({
  content,
  children,
  placement = "top",
  delay = 300,
  size = "sm",
  disabled = false,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos]         = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id         = useId();

  const updatePos = useCallback(() => {
    if (!triggerRef.current || !panelRef.current) return;
    setPos(calcTooltipPos(triggerRef.current, panelRef.current, placement));
  }, [placement]);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(updatePos);
    }, delay);
  }, [disabled, delay, updatePos]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    if (!visible) return;
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [visible, hide]);

  const cloned = React.cloneElement(children, {
    ref:              triggerRef,
    "aria-describedby": visible ? id : undefined,
    onMouseEnter:     show,
    onMouseLeave:     hide,
    onFocus:          show,
    onBlur:           hide,
  } as React.HTMLAttributes<HTMLElement>);

  const panel = visible ? createPortal(
    <div
      ref={panelRef}
      id={id}
      role="tooltip"
      className={cn(
        "fixed z-tooltip pointer-events-none animate-fade-in",
        "bg-gray-900/90 dark:bg-gray-800/95 text-white",
        "backdrop-blur-sm border border-white/10",
        "rounded-xl shadow-glass-md",
        size === "sm" ? "px-2.5 py-1.5 text-xs max-w-[200px]"
                      : "px-3 py-2 text-sm max-w-[260px]",
        className
      )}
      style={pos ? { top: pos.top, left: pos.left } : { opacity: 0 }}
    >
      {content}
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
