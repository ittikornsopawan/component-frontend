"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Portal } from "./utility/Portal";
import { zIndex } from "./base/tokens";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  children: React.ReactElement;
  disabled?: boolean;
}

const GAP = 8;

function getTooltipCoords(
  trigger: DOMRect,
  tooltip: DOMRect,
  position: TooltipPosition
): { top: number; left: number; finalPosition: TooltipPosition } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const placements: Record<TooltipPosition, { top: number; left: number }> = {
    top:    { top: trigger.top - tooltip.height - GAP,          left: trigger.left + trigger.width / 2 - tooltip.width / 2 },
    bottom: { top: trigger.bottom + GAP,                        left: trigger.left + trigger.width / 2 - tooltip.width / 2 },
    left:   { top: trigger.top + trigger.height / 2 - tooltip.height / 2, left: trigger.left - tooltip.width - GAP },
    right:  { top: trigger.top + trigger.height / 2 - tooltip.height / 2, left: trigger.right + GAP },
  };

  // Auto-flip if out of viewport
  let finalPosition = position;
  const p = placements[position];
  if (position === "top" && p.top < 0) finalPosition = "bottom";
  if (position === "bottom" && p.top + tooltip.height > vh) finalPosition = "top";
  if (position === "left" && p.left < 0) finalPosition = "right";
  if (position === "right" && p.left + tooltip.width > vw) finalPosition = "left";

  const final = placements[finalPosition];
  // Clamp to viewport
  return {
    top: Math.max(8, Math.min(final.top, vh - tooltip.height - 8)),
    left: Math.max(8, Math.min(final.left, vw - tooltip.width - 8)),
    finalPosition,
  };
}

const arrowStyles: Record<TooltipPosition, string> = {
  top:    "bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900/90",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900/90",
  left:   "right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900/90",
  right:  "left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900/90",
};

export function Tooltip({ content, position = "top", delay = 400, className, children, disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; finalPosition: TooltipPosition } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setCoords(getTooltipCoords(triggerRect, tooltipRect, position));
  }, [position]);

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => { setVisible(true); }, delay);
  }, [delay, disabled]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
    setCoords(null);
  }, []);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(updatePosition);
    }
  }, [visible, updatePosition]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const finalPos = coords?.finalPosition ?? position;

  return (
    <span
      ref={triggerRef}
      className="inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && !disabled && (
        <Portal>
          <div
            ref={tooltipRef}
            role="tooltip"
            className={cn(
              "fixed pointer-events-none animate-fade-in",
              zIndex.tooltip,
              "bg-gray-900/90 dark:bg-gray-800/95 backdrop-blur-md",
              "text-white text-xs font-medium leading-snug",
              "px-2.5 py-1.5 rounded-lg shadow-lg max-w-[220px]",
              className
            )}
            style={coords ? { top: coords.top, left: coords.left } : { opacity: 0, top: -9999, left: -9999 }}
          >
            {content}
            <span className={cn("absolute w-0 h-0 border-[4px]", arrowStyles[finalPos])} />
          </div>
        </Portal>
      )}
    </span>
  );
}
