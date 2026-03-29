"use client";

import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Point { x: number; y: number; }

export interface SignaturePadRef {
  clear: () => void;
  undo: () => void;
  toDataURL: () => string | null;
  isEmpty: () => boolean;
}

export interface SignaturePadProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  onChange?: (dataUrl: string | null) => void;
  onEnd?: (dataUrl: string) => void;
  label?: string;
  showControls?: boolean;
  compact?: boolean;
}

// ─── Bezier helper ────────────────────────────────────────────────────────────

function midPoint(p1: Point, p2: Point): Point {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}

// ─── SignaturePad ─────────────────────────────────────────────────────────────

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  function SignaturePad(
    {
      width  = 480,
      height = 180,
      strokeColor = "#1a1a2e",
      strokeWidth = 2,
      className,
      onChange,
      onEnd,
      label = "Sign here",
      showControls = true,
      compact = false,
    },
    ref
  ) {
    const canvasRef    = useRef<HTMLCanvasElement>(null);
    const drawing      = useRef(false);
    const points       = useRef<Point[]>([]);
    const strokesRef   = useRef<ImageData[]>([]);
    const [empty, setEmpty] = useState(true);

    const getCtx = useCallback(() => {
      const c = canvasRef.current;
      if (!c) return null;
      const ctx = c.getContext("2d");
      if (!ctx) return null;
      return ctx;
    }, []);

    // Initialise canvas on mount / resize
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ratio  = window.devicePixelRatio || 1;
      canvas.width  = width  * ratio;
      canvas.height = height * ratio;
      canvas.style.width  = `${width}px`;
      canvas.style.height = `${height}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(ratio, ratio);
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth   = strokeWidth;
    }, [width, height, strokeColor, strokeWidth]);

    const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): Point => {
      const rect = canvas.getBoundingClientRect();
      const src  = "touches" in e ? e.touches[0] : e;
      return {
        x: src.clientX - rect.left,
        y: src.clientY - rect.top,
      };
    };

    const beginStroke = useCallback((e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();
      drawing.current = true;
      points.current  = [getPos(e, canvas)];
      // Save snapshot before stroke
      const ctx = getCtx();
      if (ctx) strokesRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }, [getCtx]);

    const continueStroke = useCallback((e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      e.preventDefault();

      const ctx = getCtx();
      if (!ctx) return;

      const pos = getPos(e, canvas);
      points.current.push(pos);
      const pts = points.current;

      if (pts.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth   = strokeWidth;

      if (pts.length === 2) {
        ctx.moveTo(pts[0].x, pts[0].y);
        ctx.lineTo(pts[1].x, pts[1].y);
      } else {
        const prev = pts[pts.length - 3];
        const curr = pts[pts.length - 2];
        const next = pts[pts.length - 1];
        const mid1 = midPoint(prev, curr);
        const mid2 = midPoint(curr, next);
        ctx.moveTo(mid1.x, mid1.y);
        ctx.quadraticCurveTo(curr.x, curr.y, mid2.x, mid2.y);
      }
      ctx.stroke();
      setEmpty(false);
    }, [getCtx, strokeColor, strokeWidth]);

    const endStroke = useCallback(() => {
      if (!drawing.current) return;
      drawing.current = false;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL("image/png");
      onChange?.(dataUrl);
      onEnd?.(dataUrl);
    }, [onChange, onEnd]);

    // Attach events
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.addEventListener("mousedown",  beginStroke,    { passive: false });
      canvas.addEventListener("mousemove",  continueStroke, { passive: false });
      canvas.addEventListener("mouseup",    endStroke);
      canvas.addEventListener("mouseleave", endStroke);
      canvas.addEventListener("touchstart", beginStroke,    { passive: false });
      canvas.addEventListener("touchmove",  continueStroke, { passive: false });
      canvas.addEventListener("touchend",   endStroke);
      return () => {
        canvas.removeEventListener("mousedown",  beginStroke);
        canvas.removeEventListener("mousemove",  continueStroke);
        canvas.removeEventListener("mouseup",    endStroke);
        canvas.removeEventListener("mouseleave", endStroke);
        canvas.removeEventListener("touchstart", beginStroke);
        canvas.removeEventListener("touchmove",  continueStroke);
        canvas.removeEventListener("touchend",   endStroke);
      };
    }, [beginStroke, continueStroke, endStroke]);

    const clear = useCallback(() => {
      const ctx = getCtx();
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokesRef.current = [];
      points.current = [];
      setEmpty(true);
      onChange?.(null);
    }, [getCtx, onChange]);

    const undo = useCallback(() => {
      const ctx = getCtx();
      const canvas = canvasRef.current;
      if (!ctx || !canvas) return;
      strokesRef.current.pop();
      if (strokesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setEmpty(true);
        onChange?.(null);
      } else {
        const prev = strokesRef.current[strokesRef.current.length - 1];
        ctx.putImageData(prev, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        onChange?.(dataUrl);
      }
    }, [getCtx, onChange]);

    useImperativeHandle(ref, () => ({
      clear,
      undo,
      toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? null,
      isEmpty: () => empty,
    }), [clear, undo, empty]);

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {!compact && label && (
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</p>
        )}
        <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-purple-300/60 dark:border-purple-700/40 bg-white/60 dark:bg-white/5 group">
          {/* Baseline */}
          <div
            className="absolute bottom-8 left-4 right-4 h-px bg-gray-200/60 dark:bg-white/15 pointer-events-none"
            style={{ bottom: compact ? 12 : 32 }}
          />
          {/* Sign here hint */}
          {empty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <p className="text-sm text-gray-300 dark:text-gray-600 font-medium italic">Sign here…</p>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="block cursor-crosshair touch-none"
          />
        </div>
        {showControls && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={empty}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Undo
            </button>
            <button
              type="button"
              onClick={clear}
              disabled={empty}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-red-500 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        )}
      </div>
    );
  }
);
