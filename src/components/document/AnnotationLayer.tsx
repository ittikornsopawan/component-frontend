"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import type { Annotation, AnnotationStroke, AnnotationShape, Point, ToolType } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnnotationLayerProps {
  annotations: Annotation[];
  activeTool: ToolType;
  activeColor: string;
  penWidth: number;
  pageWidth: number;
  pageHeight: number;
  zoom: number;
  onAddAnnotation: (a: Annotation) => void;
  className?: string;
}

// ─── Convert % coords → canvas px ────────────────────────────────────────────

function pctToCanvas(p: Point, cw: number, ch: number): { x: number; y: number } {
  return { x: (p.x / 100) * cw, y: (p.y / 100) * ch };
}

// ─── Redraw all annotations ───────────────────────────────────────────────────

function redraw(
  canvas: HTMLCanvasElement,
  annotations: Annotation[],
  ratio: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const cw = canvas.width;
  const ch = canvas.height;
  ctx.clearRect(0, 0, cw, ch);

  for (const ann of annotations) {
    if (ann.kind === "stroke") {
      const pts = ann.points;
      if (pts.length < 2) continue;
      ctx.save();
      ctx.globalAlpha  = ann.opacity;
      ctx.strokeStyle  = ann.color;
      ctx.lineWidth    = ann.width * ratio;
      ctx.lineCap      = "round";
      ctx.lineJoin     = "round";
      if (ann.tool === "highlight") {
        ctx.globalCompositeOperation = "multiply";
      }
      ctx.beginPath();
      const p0 = pctToCanvas(pts[0], cw, ch);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i < pts.length - 1; i++) {
        const pc = pctToCanvas(pts[i],     cw, ch);
        const pn = pctToCanvas(pts[i + 1], cw, ch);
        const mx = (pc.x + pn.x) / 2;
        const my = (pc.y + pn.y) / 2;
        ctx.quadraticCurveTo(pc.x, pc.y, mx, my);
      }
      const pl = pctToCanvas(pts[pts.length - 1], cw, ch);
      ctx.lineTo(pl.x, pl.y);
      ctx.stroke();
      ctx.restore();
    } else {
      const { x, y, width, height } = ann;
      const cx = (x / 100) * cw;
      const cy = (y / 100) * ch;
      const cw2 = (width / 100) * cw;
      const ch2 = (height / 100) * ch;
      ctx.save();
      ctx.strokeStyle = ann.strokeColor;
      ctx.lineWidth   = ann.strokeWidth * ratio;
      if (ann.fillColor) ctx.fillStyle = ann.fillColor;
      ctx.beginPath();
      if (ann.type === "rectangle") {
        ctx.rect(cx, cy, cw2, ch2);
      } else {
        ctx.ellipse(cx + cw2 / 2, cy + ch2 / 2, cw2 / 2, ch2 / 2, 0, 0, Math.PI * 2);
      }
      if (ann.fillColor) ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
}

// ─── AnnotationLayer ──────────────────────────────────────────────────────────

export function AnnotationLayer({
  annotations,
  activeTool,
  activeColor,
  penWidth,
  pageWidth,
  pageHeight,
  zoom,
  onAddAnnotation,
  className,
}: AnnotationLayerProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const drawing     = useRef(false);
  const currentPts  = useRef<Point[]>([]);
  const shapeStart  = useRef<{ x: number; y: number } | null>(null);
  const ratio       = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  const drawingTools: ToolType[] = ["pen", "highlight", "rectangle", "circle"];
  const isDrawingTool = drawingTools.includes(activeTool);

  // ── Canvas setup ────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const displayW = pageWidth  * zoom;
    const displayH = pageHeight * zoom;
    canvas.width  = displayW * ratio;
    canvas.height = displayH * ratio;
    canvas.style.width  = `${displayW}px`;
    canvas.style.height = `${displayH}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(ratio, ratio);
    redraw(canvas, annotations, 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageWidth, pageHeight, zoom]);

  // ── Redraw when annotations change ──────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || drawing.current) return;
    redraw(canvas, annotations, 1);
  }, [annotations, zoom]);

  // ── Pointer helpers ──────────────────────────────────────────────────────────

  const getPos = (e: React.MouseEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    };
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isDrawingTool) return;
    e.preventDefault();
    drawing.current    = true;
    const canvas       = canvasRef.current!;
    const pos          = getPos(e, canvas);
    currentPts.current = [pos];
    shapeStart.current = pos;
  }, [isDrawingTool]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawing.current || !isDrawingTool) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos   = getPos(e, canvas);
    const cw    = canvas.width  / ratio;
    const ch    = canvas.height / ratio;

    if (activeTool === "pen" || activeTool === "highlight") {
      currentPts.current.push(pos);
      const pts = currentPts.current;
      if (pts.length < 2) return;

      ctx.save();
      ctx.globalAlpha  = activeTool === "highlight" ? 0.35 : 1;
      ctx.strokeStyle  = activeColor;
      ctx.lineWidth    = activeTool === "highlight" ? penWidth * 8 : penWidth;
      ctx.lineCap      = "round";
      ctx.lineJoin     = "round";
      if (activeTool === "highlight") ctx.globalCompositeOperation = "multiply";
      const prev = pctToCanvas(pts[pts.length - 3] ?? pts[0], cw, ch);
      const curr = pctToCanvas(pts[pts.length - 2],             cw, ch);
      const next = pctToCanvas(pts[pts.length - 1],             cw, ch);
      const mid1 = { x: (prev.x + curr.x) / 2, y: (prev.y + curr.y) / 2 };
      const mid2 = { x: (curr.x + next.x) / 2, y: (curr.y + next.y) / 2 };
      ctx.beginPath();
      ctx.moveTo(mid1.x, mid1.y);
      ctx.quadraticCurveTo(curr.x, curr.y, mid2.x, mid2.y);
      ctx.stroke();
      ctx.restore();
    } else {
      // Shape preview — redraw base + live preview
      redraw(canvas, annotations, 1);
      const start = shapeStart.current!;
      const sx    = (start.x / 100) * cw;
      const sy    = (start.y / 100) * ch;
      const ex    = (pos.x   / 100) * cw;
      const ey    = (pos.y   / 100) * ch;
      ctx.save();
      ctx.strokeStyle = activeColor;
      ctx.lineWidth   = penWidth;
      ctx.beginPath();
      if (activeTool === "rectangle") {
        ctx.rect(sx, sy, ex - sx, ey - sy);
      } else {
        ctx.ellipse(
          (sx + ex) / 2, (sy + ey) / 2,
          Math.abs(ex - sx) / 2, Math.abs(ey - sy) / 2,
          0, 0, Math.PI * 2
        );
      }
      ctx.stroke();
      ctx.restore();
    }
  }, [isDrawingTool, activeTool, activeColor, penWidth, annotations, ratio]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (!drawing.current || !isDrawingTool) return;
    drawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);

    if (activeTool === "pen" || activeTool === "highlight") {
      currentPts.current.push(pos);
      if (currentPts.current.length < 2) return;
      const newAnn: AnnotationStroke = {
        id:        `ann-${Date.now()}`,
        kind:      "stroke",
        tool:      activeTool,
        pageIndex: 0,
        points:    [...currentPts.current],
        color:     activeColor,
        width:     activeTool === "highlight" ? penWidth * 8 : penWidth,
        opacity:   activeTool === "highlight" ? 0.35 : 1,
      };
      onAddAnnotation(newAnn);
    } else if (shapeStart.current) {
      const start = shapeStart.current;
      const xMin  = Math.min(start.x, pos.x);
      const yMin  = Math.min(start.y, pos.y);
      const newAnn: AnnotationShape = {
        id:          `ann-${Date.now()}`,
        kind:        "shape",
        type:        activeTool as "rectangle" | "circle",
        pageIndex:   0,
        x:           xMin,
        y:           yMin,
        width:       Math.abs(pos.x - start.x),
        height:      Math.abs(pos.y - start.y),
        strokeColor: activeColor,
        strokeWidth: penWidth,
      };
      onAddAnnotation(newAnn);
    }
    currentPts.current = [];
    shapeStart.current = null;
  }, [isDrawingTool, activeTool, activeColor, penWidth, onAddAnnotation]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 z-30 pointer-events-none",
        isDrawingTool && "pointer-events-auto",
        isDrawingTool && (activeTool === "pen" || activeTool === "highlight")
          ? "cursor-crosshair"
          : isDrawingTool
          ? "cursor-crosshair"
          : "",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}
