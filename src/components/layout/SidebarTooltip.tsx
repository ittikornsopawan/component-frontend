"use client";

import React, { useState, useRef, useCallback, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ─── SidebarTooltip ───────────────────────────────────────────────────────────
// Lightweight right-side tooltip for the collapsed Sidenav.
// Portal-rendered so it always escapes overflow:hidden containers.

interface SidebarTooltipProps {
  content:  string;
  children: React.ReactElement;
  disabled?: boolean;
}

export function SidebarTooltip({ content, children, disabled }: SidebarTooltipProps) {
  const [visible, setVisible]   = useState(false);
  const [pos, setPos]           = useState<{ top: number; left: number } | null>(null);
  const triggerRef              = useRef<HTMLElement>(null);
  const tooltipRef              = useRef<HTMLDivElement>(null);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id                      = useId();

  const calcPos = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const tr = triggerRef.current.getBoundingClientRect();
    const tt = tooltipRef.current.getBoundingClientRect();
    setPos({
      top:  tr.top + tr.height / 2 - tt.height / 2,
      left: tr.right + 8,
    });
  }, []);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(calcPos);
    }, 120);
  }, [disabled, calcPos]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (!visible) return;
    window.addEventListener("scroll", hide, true);
    return () => window.removeEventListener("scroll", hide, true);
  }, [visible, hide]);

  const cloned = React.cloneElement(children, {
    ref:              triggerRef,
    onMouseEnter:     show,
    onMouseLeave:     hide,
    onFocus:          show,
    onBlur:           hide,
    "aria-describedby": visible ? id : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  const tooltip = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          id={id}
          role="tooltip"
          className={cn(
            "fixed z-tooltip pointer-events-none",
            "px-2.5 py-1.5 rounded-xl text-xs font-medium",
            "bg-gray-900/90 dark:bg-gray-800/95 text-white",
            "backdrop-blur-sm border border-white/10",
            "shadow-glass-sm whitespace-nowrap",
            "animate-fade-in",
          )}
          style={pos ? { top: pos.top, left: pos.left } : { opacity: 0 }}
        >
          {content}
          {/* Arrow */}
          <span
            className="absolute top-1/2 -translate-y-1/2 -left-[5px] border-4 border-transparent border-r-gray-900/90 dark:border-r-gray-800/95"
            aria-hidden
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {cloned}
      {tooltip}
    </>
  );
}
