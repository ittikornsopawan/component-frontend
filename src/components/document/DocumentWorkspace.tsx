"use client";

import React, { useRef, useCallback, useState } from "react";
import { CheckCircle2, Layers, PenLine, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { DocumentViewer } from "./DocumentViewer";
import { DocumentToolbar } from "./DocumentToolbar";
import { FieldOverlay }    from "./FieldOverlay";
import { AnnotationLayer } from "./AnnotationLayer";
import { SignaturePad, SignaturePadRef } from "./SignaturePad";
import { useDocumentState } from "./hooks/useDocumentState";
import type { DocumentField } from "./types";

// ─── Signature capture modal ──────────────────────────────────────────────────

interface SignatureModalProps {
  fieldId: string;
  onSave:  (dataUrl: string) => void;
  onClose: () => void;
}

function SignatureModal({ fieldId, onSave, onClose }: SignatureModalProps) {
  const padRef = useRef<SignaturePadRef>(null);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-glass-xl animate-fade-in">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/20 dark:border-white/10">
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Draw Your Signature</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <SignaturePad ref={padRef} width={430} height={160} strokeColor="#1a1a2e" strokeWidth={2.5} />
        </div>
        <div className="px-5 pb-5 flex items-center justify-end gap-3 border-t border-white/20 dark:border-white/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const dataUrl = padRef.current?.toDataURL();
              if (dataUrl && !padRef.current?.isEmpty()) {
                onSave(dataUrl);
              }
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20 transition-all duration-200 active:scale-[0.98]"
          >
            <CheckCircle2 className="w-4 h-4" /> Apply Signature
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Side panel ───────────────────────────────────────────────────────────────

interface SidePanelProps {
  fields: DocumentField[];
  selectedFieldId: string | null;
  onSelect: (id: string | null) => void;
  onDelete: (id: string) => void;
  annotationCount: number;
}

function SidePanel({ fields, selectedFieldId, onSelect, onDelete, annotationCount }: SidePanelProps) {
  const TYPE_COLOR: Record<string, string> = {
    signature: "bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
    text:      "bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    date:      "bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
    checkbox:  "bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
  };

  return (
    <div className="w-56 flex-shrink-0 bg-white/50 dark:bg-slate-900/60 backdrop-blur-xl border-l border-white/20 dark:border-white/10 flex flex-col">
      <div className="px-3 py-3 border-b border-white/20 dark:border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-purple-500" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Layers</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        {/* Annotation count */}
        {annotationCount > 0 && (
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-xl bg-gray-50/60 dark:bg-white/5 text-xs text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
            <span>{annotationCount} annotation{annotationCount !== 1 ? "s" : ""}</span>
          </div>
        )}

        {/* Field list */}
        {fields.length === 0 && annotationCount === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-gray-400 dark:text-gray-500">No layers yet</p>
            <p className="text-[10px] text-gray-300 dark:text-gray-600 mt-0.5">Add fields or annotate</p>
          </div>
        )}

        {fields.map((field) => (
          <button
            key={field.id}
            type="button"
            onClick={() => onSelect(selectedFieldId === field.id ? null : field.id)}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-xl text-xs text-left w-full transition-all duration-150",
              selectedFieldId === field.id
                ? "bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "hover:bg-gray-50/60 dark:hover:bg-white/6 text-gray-600 dark:text-gray-400"
            )}
          >
            <span className={cn("px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase flex-shrink-0", TYPE_COLOR[field.type])}>
              {field.type.slice(0, 3)}
            </span>
            <span className="truncate flex-1 font-medium">
              {field.value ? "✓ " : ""}{field.label ?? field.type}
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete(field.id); }}
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center rounded text-gray-300 dark:text-gray-600 hover:text-red-500 hover:bg-red-50/60 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── DocumentWorkspace ────────────────────────────────────────────────────────

export interface DocumentWorkspaceProps {
  className?: string;
}

export function DocumentWorkspace({ className }: DocumentWorkspaceProps) {
  const doc = useDocumentState();
  const [sigFieldId,   setSigFieldId]   = useState<string | null>(null);

  // When user clicks a signature field in select mode
  const handleFieldSelect = useCallback((id: string | null) => {
    doc.selectField(id);
    if (!id) return;
    const field = doc.state.fields.find((f) => f.id === id);
    if (field?.type === "signature" && doc.state.activeTool === "select") {
      setSigFieldId(id);
    }
  }, [doc]);

  // Save drawn signature to field value
  const handleSigSave = useCallback((dataUrl: string) => {
    if (!sigFieldId) return;
    doc.setFieldValue(sigFieldId, dataUrl);
    setSigFieldId(null);
    doc.selectField(null);
  }, [sigFieldId, doc]);

  const { state } = doc;
  const currentPageAnnotations = doc.currentPageAnnotations;

  return (
    <div className={cn("flex flex-col h-full bg-gray-50 dark:bg-slate-950", className)}>
      {/* Toolbar */}
      <DocumentToolbar
        activeTool={state.activeTool}
        zoom={state.zoom}
        currentPage={state.currentPage}
        totalPages={state.pages.length}
        activeColor={state.activeColor}
        penWidth={state.activePenWidth}
        canUndo={doc.canUndo}
        canRedo={doc.canRedo}
        onTool={doc.setActiveTool}
        onZoom={doc.setZoom}
        onPage={doc.setCurrentPage}
        onUndo={doc.undo}
        onRedo={doc.redo}
        onColor={doc.setActiveColor}
        onPenWidth={doc.setPenWidth}
      />

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Document area */}
        <DocumentViewer
          pages={state.pages}
          currentPage={state.currentPage}
          zoom={state.zoom}
          renderPage={(page, containerRef) => {
            return (
              <>
                {/* Annotation canvas */}
                <AnnotationLayer
                  annotations={currentPageAnnotations}
                  activeTool={state.activeTool}
                  activeColor={state.activeColor}
                  penWidth={state.activePenWidth}
                  pageWidth={page.naturalWidth}
                  pageHeight={page.naturalHeight}
                  zoom={state.zoom}
                  onAddAnnotation={doc.addAnnotation}
                />
                {/* Field overlay */}
                <FieldOverlay
                  fields={doc.currentPageFields}
                  selectedFieldId={state.selectedFieldId}
                  zoom={state.zoom}
                  activeTool={state.activeTool}
                  currentPage={state.currentPage}
                  containerRef={containerRef}
                  onSelect={handleFieldSelect}
                  onUpdate={doc.updateField}
                  onCommit={doc.commitFieldMove}
                  onDelete={doc.deleteField}
                  onValue={doc.setFieldValue}
                  onAddField={doc.addField}
                />
              </>
            );
          }}
        />

        {/* Side panel */}
        <SidePanel
          fields={doc.currentPageFields}
          selectedFieldId={state.selectedFieldId}
          onSelect={handleFieldSelect}
          onDelete={doc.deleteField}
          annotationCount={currentPageAnnotations.length}
        />
      </div>

      {/* Signature modal */}
      {sigFieldId && (
        <SignatureModal
          fieldId={sigFieldId}
          onSave={handleSigSave}
          onClose={() => setSigFieldId(null)}
        />
      )}
    </div>
  );
}
