"use client";

import React from "react";
import {
  MousePointer2, PenLine, Type, Calendar, CheckSquare,
  Pen, Highlighter, Square, Circle,
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight,
  RotateCcw, RotateCw, Eraser,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ToolType } from "./types";

// ─── Tool groups ──────────────────────────────────────────────────────────────

interface ToolDef {
  id: ToolType;
  icon: React.ReactNode;
  label: string;
  group: "select" | "field" | "annotate";
}

const TOOLS: ToolDef[] = [
  { id: "select",         icon: <MousePointer2 className="w-4 h-4" />, label: "Select",    group: "select" },
  // Fields
  { id: "signature",      icon: <PenLine       className="w-4 h-4" />, label: "Signature Field", group: "field" },
  { id: "text-field",     icon: <Type          className="w-4 h-4" />, label: "Text Field",      group: "field" },
  { id: "date-field",     icon: <Calendar      className="w-4 h-4" />, label: "Date Field",      group: "field" },
  { id: "checkbox-field", icon: <CheckSquare   className="w-4 h-4" />, label: "Checkbox Field",  group: "field" },
  // Annotations
  { id: "pen",            icon: <Pen           className="w-4 h-4" />, label: "Pen",       group: "annotate" },
  { id: "highlight",      icon: <Highlighter   className="w-4 h-4" />, label: "Highlight", group: "annotate" },
  { id: "rectangle",      icon: <Square        className="w-4 h-4" />, label: "Rectangle", group: "annotate" },
  { id: "circle",         icon: <Circle        className="w-4 h-4" />, label: "Circle",    group: "annotate" },
  { id: "eraser",         icon: <Eraser        className="w-4 h-4" />, label: "Eraser",    group: "annotate" },
];

const GROUP_ORDER: ToolDef["group"][] = ["select", "field", "annotate"];

const GROUP_LABELS: Record<ToolDef["group"], string> = {
  select:   "Select",
  field:    "Fields",
  annotate: "Draw",
};

const FIELD_COLORS: Record<string, string> = {
  "signature":      "text-purple-700 dark:text-purple-400",
  "text-field":     "text-blue-700 dark:text-blue-400",
  "date-field":     "text-emerald-700 dark:text-emerald-400",
  "checkbox-field": "text-amber-700 dark:text-amber-400",
};

// ─── Color palette ────────────────────────────────────────────────────────────

const COLORS = [
  { value: "#7C3AED", label: "Purple"  },
  { value: "#2563EB", label: "Blue"    },
  { value: "#059669", label: "Emerald" },
  { value: "#D97706", label: "Amber"   },
  { value: "#DC2626", label: "Red"     },
  { value: "#0F172A", label: "Black"   },
];

const PEN_WIDTHS = [1, 2, 4, 6];

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="w-px h-6 bg-white/20 dark:bg-white/10 flex-shrink-0" />;
}

// ─── Toolbar button ───────────────────────────────────────────────────────────

function ToolBtn({
  active, onClick, children, title, className, disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex flex-col items-center justify-center gap-0.5 w-9 h-9 rounded-xl text-xs font-medium transition-all duration-150",
        "hover:bg-white/40 dark:hover:bg-white/10",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        active
          ? "bg-purple-500/20 dark:bg-purple-500/25 text-purple-700 dark:text-purple-300 shadow-inner"
          : "text-gray-600 dark:text-gray-400",
        className
      )}
    >
      {children}
      {active && (
        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-500" />
      )}
    </button>
  );
}

// ─── DocumentToolbar ─────────────────────────────────────────────────────────

export interface DocumentToolbarProps {
  activeTool:  ToolType;
  zoom:        number;
  currentPage: number;
  totalPages:  number;
  activeColor: string;
  penWidth:    number;
  canUndo:     boolean;
  canRedo:     boolean;
  onTool:      (t: ToolType) => void;
  onZoom:      (z: number) => void;
  onPage:      (p: number) => void;
  onUndo:      () => void;
  onRedo:      () => void;
  onColor:     (c: string) => void;
  onPenWidth:  (w: number) => void;
  className?:  string;
}

export function DocumentToolbar({
  activeTool, zoom, currentPage, totalPages, activeColor, penWidth,
  canUndo, canRedo,
  onTool, onZoom, onPage, onUndo, onRedo, onColor, onPenWidth,
  className,
}: DocumentToolbarProps) {
  const showColorPicker = ["pen", "highlight", "rectangle", "circle"].includes(activeTool);

  return (
    <div className={cn(
      "flex items-center gap-1.5 px-3 py-2",
      "bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl",
      "border-b border-white/25 dark:border-white/10",
      "shadow-glass-sm overflow-x-auto scrollbar-hide",
      className
    )}>

      {/* Tool groups */}
      {GROUP_ORDER.map((group, gi) => (
        <React.Fragment key={group}>
          {gi > 0 && <Divider />}
          <div className="flex items-center gap-0.5">
            {TOOLS.filter((t) => t.group === group).map((tool) => (
              <ToolBtn
                key={tool.id}
                active={activeTool === tool.id}
                onClick={() => onTool(tool.id)}
                title={tool.label}
                className={activeTool === tool.id && FIELD_COLORS[tool.id] ? FIELD_COLORS[tool.id] : ""}
              >
                {tool.icon}
              </ToolBtn>
            ))}
          </div>
        </React.Fragment>
      ))}

      <Divider />

      {/* Color picker (annotation tools) */}
      {showColorPicker && (
        <>
          <div className="flex items-center gap-1">
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                title={c.label}
                onClick={() => onColor(c.value)}
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-150 hover:scale-110 active:scale-95",
                  activeColor === c.value
                    ? "border-white dark:border-white scale-110 shadow-md"
                    : "border-transparent"
                )}
                style={{ background: c.value }}
              />
            ))}
          </div>

          <Divider />

          {/* Pen width */}
          <div className="flex items-center gap-1">
            {PEN_WIDTHS.map((w) => (
              <button
                key={w}
                type="button"
                title={`${w}px`}
                onClick={() => onPenWidth(w)}
                className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-150",
                  penWidth === w
                    ? "bg-purple-500/20 dark:bg-purple-500/25"
                    : "hover:bg-gray-100/60 dark:hover:bg-white/8"
                )}
              >
                <div
                  className="rounded-full bg-gray-700 dark:bg-gray-300"
                  style={{ width: w + 2, height: w + 2 }}
                />
              </button>
            ))}
          </div>

          <Divider />
        </>
      )}

      {/* Undo / Redo */}
      <div className="flex items-center gap-0.5">
        <ToolBtn title="Undo (⌘Z)" onClick={onUndo} disabled={!canUndo}>
          <RotateCcw className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn title="Redo (⌘Y)" onClick={onRedo} disabled={!canRedo}>
          <RotateCw className="w-4 h-4" />
        </ToolBtn>
      </div>

      <Divider />

      {/* Zoom */}
      <div className="flex items-center gap-0.5">
        <ToolBtn title="Zoom out" onClick={() => onZoom(zoom - 0.1)}>
          <ZoomOut className="w-4 h-4" />
        </ToolBtn>
        <button
          type="button"
          onClick={() => onZoom(1)}
          className="px-2 py-1 rounded-lg text-xs font-mono font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 min-w-[46px] text-center transition-all duration-150"
          title="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <ToolBtn title="Zoom in" onClick={() => onZoom(zoom + 0.1)}>
          <ZoomIn className="w-4 h-4" />
        </ToolBtn>
      </div>

      <Divider />

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        <ToolBtn
          title="Previous page"
          onClick={() => onPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </ToolBtn>
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 min-w-[52px] text-center whitespace-nowrap">
          {currentPage + 1} / {totalPages}
        </span>
        <ToolBtn
          title="Next page"
          onClick={() => onPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </ToolBtn>
      </div>
    </div>
  );
}
