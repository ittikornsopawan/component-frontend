"use client";

import React, { useRef, useCallback, useState } from "react";
import {
  PenLine, Type, Calendar, CheckSquare, X, Move, GripHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentField, FieldType } from "./types";

// ─── Field icon / label helpers ───────────────────────────────────────────────

const FIELD_META: Record<FieldType, {
  icon: React.ReactNode;
  label: string;
  defaultW: number;
  defaultH: number;
  color: string;
  bg: string;
}> = {
  signature: {
    icon:     <PenLine className="w-3.5 h-3.5" />,
    label:    "Signature",
    defaultW: 28,
    defaultH: 8,
    color:    "border-purple-400 dark:border-purple-500",
    bg:       "bg-purple-50/60 dark:bg-purple-900/20",
  },
  text: {
    icon:     <Type className="w-3.5 h-3.5" />,
    label:    "Text",
    defaultW: 24,
    defaultH: 5,
    color:    "border-blue-400 dark:border-blue-500",
    bg:       "bg-blue-50/60 dark:bg-blue-900/20",
  },
  date: {
    icon:     <Calendar className="w-3.5 h-3.5" />,
    label:    "Date",
    defaultW: 18,
    defaultH: 5,
    color:    "border-emerald-400 dark:border-emerald-500",
    bg:       "bg-emerald-50/60 dark:bg-emerald-900/20",
  },
  checkbox: {
    icon:     <CheckSquare className="w-3.5 h-3.5" />,
    label:    "Checkbox",
    defaultW: 5,
    defaultH: 5,
    color:    "border-amber-400 dark:border-amber-500",
    bg:       "bg-amber-50/60 dark:bg-amber-900/20",
  },
};

// ─── Single Field ─────────────────────────────────────────────────────────────

interface FieldProps {
  field: DocumentField;
  selected: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<DocumentField>) => void;
  onCommit: (id: string, patch: Partial<DocumentField>) => void;
  onDelete: (id: string) => void;
  onValue:  (id: string, value: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function Field({
  field, selected, zoom, onSelect, onUpdate, onCommit, onDelete, onValue, containerRef,
}: FieldProps) {
  const meta        = FIELD_META[field.type];
  const dragStart   = useRef<{ mx: number; my: number; fx: number; fy: number } | null>(null);
  const resizeStart = useRef<{ mx: number; my: number; fw: number; fh: number } | null>(null);
  const [editing, setEditing] = useState(false);

  // ── Drag ─────────────────────────────────────────────────────────────────

  const handleDragMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(field.id);
    dragStart.current = { mx: e.clientX, my: e.clientY, fx: field.x, fy: field.y };

    const onMove = (mv: MouseEvent) => {
      if (!dragStart.current || !containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const dx    = ((mv.clientX - dragStart.current.mx) / rect.width)  * 100;
      const dy    = ((mv.clientY - dragStart.current.my) / rect.height) * 100;
      const nx    = Math.max(0, Math.min(100 - field.width, dragStart.current.fx + dx));
      const ny    = Math.max(0, Math.min(100 - field.height, dragStart.current.fy + dy));
      onUpdate(field.id, { x: nx, y: ny });
    };
    const onUp = (uv: MouseEvent) => {
      if (!dragStart.current || !containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const dx    = ((uv.clientX - dragStart.current.mx) / rect.width)  * 100;
      const dy    = ((uv.clientY - dragStart.current.my) / rect.height) * 100;
      const nx    = Math.max(0, Math.min(100 - field.width, dragStart.current.fx + dx));
      const ny    = Math.max(0, Math.min(100 - field.height, dragStart.current.fy + dy));
      onCommit(field.id, { x: nx, y: ny });
      dragStart.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  }, [field, onSelect, onUpdate, onCommit, containerRef]);

  // ── Resize ────────────────────────────────────────────────────────────────

  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    resizeStart.current = { mx: e.clientX, my: e.clientY, fw: field.width, fh: field.height };

    const onMove = (mv: MouseEvent) => {
      if (!resizeStart.current || !containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const dx    = ((mv.clientX - resizeStart.current.mx) / rect.width)  * 100;
      const dy    = ((mv.clientY - resizeStart.current.my) / rect.height) * 100;
      const nw    = Math.max(8, resizeStart.current.fw + dx);
      const nh    = Math.max(3, resizeStart.current.fh + dy);
      onUpdate(field.id, { width: nw, height: nh });
    };
    const onUp = (uv: MouseEvent) => {
      if (!resizeStart.current || !containerRef.current) return;
      const rect  = containerRef.current.getBoundingClientRect();
      const dx    = ((uv.clientX - resizeStart.current.mx) / rect.width)  * 100;
      const dy    = ((uv.clientY - resizeStart.current.my) / rect.height) * 100;
      const nw    = Math.max(8, resizeStart.current.fw + dx);
      const nh    = Math.max(3, resizeStart.current.fh + dy);
      onCommit(field.id, { width: nw, height: nh });
      resizeStart.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",   onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
  }, [field, onUpdate, onCommit, containerRef]);

  const isCheckbox  = field.type === "checkbox";
  const isSignature = field.type === "signature";
  const textMeta    = FIELD_META[field.type];

  return (
    <div
      className={cn(
        "absolute group/field select-none",
        selected && "z-10"
      )}
      style={{
        left:   `${field.x}%`,
        top:    `${field.y}%`,
        width:  `${field.width}%`,
        height: `${field.height}%`,
      }}
      onClick={(e) => { e.stopPropagation(); onSelect(field.id); }}
    >
      {/* Field surface */}
      <div
        className={cn(
          "w-full h-full rounded-lg border-2 border-dashed transition-all duration-150 flex items-center gap-1.5 overflow-hidden",
          meta.color, meta.bg,
          selected && "border-solid shadow-md"
        )}
      >
        {/* Drag handle */}
        {selected && (
          <div
            className="absolute inset-0 cursor-move"
            onMouseDown={handleDragMouseDown}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex items-center gap-1 px-2 py-1 w-full h-full pointer-events-none">
          {isSignature && field.value ? (
            <img src={field.value} alt="Signature" className="max-h-full max-w-full object-contain" />
          ) : isCheckbox ? (
            <div
              className={cn(
                "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 cursor-pointer pointer-events-auto",
                meta.color,
                field.value === "true" ? meta.bg : "bg-white/80 dark:bg-white/10"
              )}
              onClick={(e) => { e.stopPropagation(); onValue(field.id, field.value === "true" ? "" : "true"); }}
            >
              {field.value === "true" && <div className="w-2 h-2 rounded-sm bg-amber-500" />}
            </div>
          ) : editing && !isSignature ? (
            <input
              autoFocus
              type={field.type === "date" ? "date" : "text"}
              defaultValue={field.value ?? ""}
              onBlur={(e) => { setEditing(false); onValue(field.id, e.target.value); }}
              onClick={(e) => e.stopPropagation()}
              className="w-full text-xs bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 pointer-events-auto"
            />
          ) : (
            <span
              className={cn("text-xs truncate", field.value ? "text-gray-700 dark:text-gray-300" : "text-gray-400 dark:text-gray-500")}
              onDoubleClick={(e) => { e.stopPropagation(); setEditing(true); }}
            >
              {field.value || field.placeholder || meta.label}
            </span>
          )}
        </div>

        {/* Type badge */}
        {!selected && (
          <div className="absolute top-0.5 right-0.5 opacity-0 group-hover/field:opacity-100 transition-opacity">
            <span className={cn("inline-flex items-center gap-0.5 px-1 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wide text-white", {
              "bg-purple-500": field.type === "signature",
              "bg-blue-500":   field.type === "text",
              "bg-emerald-500":field.type === "date",
              "bg-amber-500":  field.type === "checkbox",
            })}>
              {meta.icon}
            </span>
          </div>
        )}
      </div>

      {/* Selected controls */}
      {selected && (
        <>
          {/* Delete button */}
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onDelete(field.id); }}
            className="absolute -top-2.5 -right-2.5 z-20 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Resize handle */}
          <div
            className="absolute -bottom-1.5 -right-1.5 z-20 w-4 h-4 flex items-center justify-center rounded bg-white dark:bg-slate-800 border border-gray-300 dark:border-white/20 cursor-se-resize shadow-sm"
            onMouseDown={handleResizeMouseDown}
          >
            <GripHorizontal className="w-2.5 h-2.5 text-gray-400 rotate-90" />
          </div>

          {/* Move cursor overlay label */}
          <div className="absolute -top-6 left-0 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-800/80 dark:bg-black/70 text-white text-[10px] font-medium whitespace-nowrap pointer-events-none">
            <Move className="w-2.5 h-2.5" />
            {meta.label}
          </div>
        </>
      )}
    </div>
  );
}

// ─── FieldOverlay ─────────────────────────────────────────────────────────────

export interface FieldOverlayProps {
  fields: DocumentField[];
  selectedFieldId: string | null;
  zoom: number;
  activeTool: string;
  currentPage: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onSelect:  (id: string | null) => void;
  onUpdate:  (id: string, patch: Partial<DocumentField>) => void;
  onCommit:  (id: string, patch: Partial<DocumentField>) => void;
  onDelete:  (id: string) => void;
  onValue:   (id: string, value: string) => void;
  onAddField?: (field: DocumentField) => void;
}

export function FieldOverlay({
  fields, selectedFieldId, zoom, activeTool, currentPage,
  containerRef, onSelect, onUpdate, onCommit, onDelete, onValue, onAddField,
}: FieldOverlayProps) {
  const isPlacingField = ["signature", "text-field", "date-field", "checkbox-field"].includes(activeTool);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!isPlacingField || !containerRef.current || !onAddField) {
      onSelect(null);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width)  * 100;
    const yPct = ((e.clientY - rect.top)  / rect.height) * 100;

    const typeMap: Record<string, DocumentField["type"]> = {
      "signature":     "signature",
      "text-field":    "text",
      "date-field":    "date",
      "checkbox-field":"checkbox",
    };
    const type = typeMap[activeTool] as FieldType;
    const meta = FIELD_META[type];

    const newField: DocumentField = {
      id:        `field-${Date.now()}`,
      type,
      pageIndex: currentPage,
      x:         Math.max(0, Math.min(100 - meta.defaultW, xPct - meta.defaultW / 2)),
      y:         Math.max(0, Math.min(100 - meta.defaultH, yPct - meta.defaultH / 2)),
      width:     meta.defaultW,
      height:    meta.defaultH,
      label:     meta.label,
      placeholder: meta.label,
    };
    onAddField(newField);
  }, [isPlacingField, currentPage, containerRef, onAddField, onSelect, activeTool]);

  return (
    <div
      className={cn(
        "absolute inset-0 z-20",
        isPlacingField && "cursor-crosshair"
      )}
      onClick={handleContainerClick}
    >
      {fields.map((field) => (
        <Field
          key={field.id}
          field={field}
          selected={selectedFieldId === field.id}
          zoom={zoom}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onCommit={onCommit}
          onDelete={onDelete}
          onValue={onValue}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}
