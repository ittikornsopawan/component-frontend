"use client";

import { useState, useCallback } from "react";
import type {
  DocumentState, DocumentField, Annotation,
  ToolType, HistorySnapshot, DocumentPage,
} from "../types";

// ─── Default pages (simulated A4 document) ────────────────────────────────────

const DEFAULT_PAGES: DocumentPage[] = [
  { index: 0, naturalWidth: 794, naturalHeight: 1123, content: "contract" },
  { index: 1, naturalWidth: 794, naturalHeight: 1123, content: "contract" },
  { index: 2, naturalWidth: 794, naturalHeight: 1123, content: "blank"    },
];

// Pre-defined signature fields for the contract
const DEFAULT_SIGNATURE_FIELDS: DocumentField[] = [
  {
    id: "sig-provider-1",
    type: "signature",
    pageIndex: 1,
    x: 15, // Left column (Service Provider)
    y: 82, // Bottom of page where signatures are
    width: 35,
    height: 12,
    label: "Service Provider Signature",
    required: true,
  },
  {
    id: "sig-client-1",
    type: "signature", 
    pageIndex: 1,
    x: 55, // Right column (Client)
    y: 82, // Bottom of page where signatures are
    width: 35,
    height: 12,
    label: "Client Signature",
    required: true,
  },
];

const INITIAL_STATE: DocumentState = {
  pages:          DEFAULT_PAGES,
  fields:         DEFAULT_SIGNATURE_FIELDS, // Start with signature fields
  annotations:    [],
  currentPage:    1, // Start on page 2 where signatures are
  zoom:           1,
  activeTool:     "select",
  selectedFieldId: null,
  activeColor:    "#7C3AED",
  activePenWidth: 2,
  history:        [{ fields: DEFAULT_SIGNATURE_FIELDS, annotations: [] }], // Include fields in history
  historyIndex:   0,
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDocumentState() {
  const [state, setState] = useState<DocumentState>(INITIAL_STATE);

  // ── Snapshot helpers ────────────────────────────────────────────────────────

  const pushHistory = useCallback((
    fields: DocumentField[],
    annotations: Annotation[]
  ) => {
    setState((prev) => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields, annotations });
      return {
        ...prev,
        fields,
        annotations,
        history:      newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  // ── Undo / Redo ─────────────────────────────────────────────────────────────

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex <= 0) return prev;
      const idx  = prev.historyIndex - 1;
      const snap = prev.history[idx] as HistorySnapshot;
      return { ...prev, fields: snap.fields, annotations: snap.annotations, historyIndex: idx, selectedFieldId: null };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.historyIndex >= prev.history.length - 1) return prev;
      const idx  = prev.historyIndex + 1;
      const snap = prev.history[idx] as HistorySnapshot;
      return { ...prev, fields: snap.fields, annotations: snap.annotations, historyIndex: idx };
    });
  }, []);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  // ── Tool / navigation ───────────────────────────────────────────────────────

  const setActiveTool  = useCallback((t: ToolType) => setState((p) => ({ ...p, activeTool: t, selectedFieldId: null })), []);
  const setCurrentPage = useCallback((n: number)   => setState((p) => ({ ...p, currentPage: n })), []);
  const setZoom        = useCallback((z: number)   => setState((p) => ({ ...p, zoom: Math.max(0.5, Math.min(2.5, z)) })), []);
  const setActiveColor = useCallback((c: string)   => setState((p) => ({ ...p, activeColor: c })), []);
  const setPenWidth    = useCallback((w: number)   => setState((p) => ({ ...p, activePenWidth: w })), []);
  const selectField    = useCallback((id: string | null) => setState((p) => ({ ...p, selectedFieldId: id })), []);

  // ── Fields ──────────────────────────────────────────────────────────────────

  const addField = useCallback((field: DocumentField) => {
    setState((prev) => {
      const fields = [...prev.fields, field];
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields, annotations: prev.annotations });
      return {
        ...prev,
        fields,
        selectedFieldId: field.id,
        activeTool:      "select",
        history:         newHistory,
        historyIndex:    newHistory.length - 1,
      };
    });
  }, []);

  const updateField = useCallback((id: string, patch: Partial<DocumentField>) => {
    setState((prev) => {
      const fields = prev.fields.map((f) => f.id === id ? { ...f, ...patch } : f);
      return { ...prev, fields };
    });
  }, []);

  const commitFieldMove = useCallback((id: string, patch: Partial<DocumentField>) => {
    setState((prev) => {
      const fields = prev.fields.map((f) => f.id === id ? { ...f, ...patch } : f);
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields, annotations: prev.annotations });
      return { ...prev, fields, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  }, []);

  const deleteField = useCallback((id: string) => {
    setState((prev) => {
      const fields = prev.fields.filter((f) => f.id !== id);
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields, annotations: prev.annotations });
      return { ...prev, fields, selectedFieldId: null, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  }, []);

  const setFieldValue = useCallback((id: string, value: string) => {
    setState((prev) => {
      const fields = prev.fields.map((f) => f.id === id ? { ...f, value } : f);
      return { ...prev, fields };
    });
  }, []);

  // ── Annotations ─────────────────────────────────────────────────────────────

  const addAnnotation = useCallback((annotation: Annotation) => {
    setState((prev) => {
      const annotations = [...prev.annotations, annotation];
      const newHistory  = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields: prev.fields, annotations });
      return { ...prev, annotations, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  }, []);

  const deleteAnnotation = useCallback((id: string) => {
    setState((prev) => {
      const annotations = prev.annotations.filter((a) => a.id !== id);
      const newHistory  = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields: prev.fields, annotations });
      return { ...prev, annotations, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  }, []);

  const clearPageAnnotations = useCallback((pageIndex: number) => {
    setState((prev) => {
      const annotations = prev.annotations.filter((a) => a.pageIndex !== pageIndex);
      const newHistory  = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push({ fields: prev.fields, annotations });
      return { ...prev, annotations, history: newHistory, historyIndex: newHistory.length - 1 };
    });
  }, []);

  // ── Field helpers ────────────────────────────────────────────────────────────

  const currentPageFields = state.fields.filter((f) => f.pageIndex === state.currentPage);
  const currentPageAnnotations = state.annotations.filter((a) => a.pageIndex === state.currentPage);

  return {
    state,
    // navigation
    setActiveTool,
    setCurrentPage,
    setZoom,
    setActiveColor,
    setPenWidth,
    selectField,
    // undo/redo
    undo, redo, canUndo, canRedo,
    // fields
    addField, updateField, commitFieldMove, deleteField, setFieldValue,
    // annotations
    addAnnotation, deleteAnnotation, clearPageAnnotations, pushHistory,
    // derived
    currentPageFields,
    currentPageAnnotations,
    currentPage: state.pages[state.currentPage],
  };
}

export type DocumentStateHook = ReturnType<typeof useDocumentState>;
