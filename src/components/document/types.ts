// ─── Document & Signing Workspace — Type System ───────────────────────────────

// ─── Tools ────────────────────────────────────────────────────────────────────

export type ToolType =
  | "select"
  | "signature"
  | "text-field"
  | "date-field"
  | "checkbox-field"
  | "pen"
  | "highlight"
  | "rectangle"
  | "circle"
  | "eraser";

// ─── Fields ───────────────────────────────────────────────────────────────────

export type FieldType = "signature" | "text" | "date" | "checkbox";

export interface DocumentField {
  id: string;
  type: FieldType;
  pageIndex: number;
  x: number;         // % of page natural width  (0–100)
  y: number;         // % of page natural height (0–100)
  width: number;     // % of page natural width
  height: number;    // % of page natural height
  value?: string;    // text content / base64 image for signature
  label?: string;
  required?: boolean;
  assignedTo?: string;
  placeholder?: string;
}

// ─── Annotations ──────────────────────────────────────────────────────────────

export interface Point {
  x: number; // % of page width
  y: number; // % of page height
}

export interface AnnotationStroke {
  id: string;
  kind: "stroke";
  tool: "pen" | "highlight";
  pageIndex: number;
  points: Point[];
  color: string;
  width: number;     // px at 100% zoom
  opacity: number;   // 0–1
}

export interface AnnotationShape {
  id: string;
  kind: "shape";
  type: "rectangle" | "circle";
  pageIndex: number;
  x: number;         // % of page width
  y: number;         // % of page height
  width: number;     // % of page width
  height: number;    // % of page height
  strokeColor: string;
  strokeWidth: number;
  fillColor?: string;
}

export type Annotation = AnnotationStroke | AnnotationShape;

// ─── Document pages ───────────────────────────────────────────────────────────

export interface DocumentPage {
  index: number;
  naturalWidth: number;   // px
  naturalHeight: number;  // px
  content?: "contract" | "invoice" | "nda" | "blank";
}

// ─── Undo / redo ──────────────────────────────────────────────────────────────

export interface HistorySnapshot {
  fields: DocumentField[];
  annotations: Annotation[];
}

// ─── Full document state ──────────────────────────────────────────────────────

export interface DocumentState {
  pages: DocumentPage[];
  fields: DocumentField[];
  annotations: Annotation[];
  currentPage: number;
  zoom: number;
  activeTool: ToolType;
  selectedFieldId: string | null;
  activeColor: string;
  activePenWidth: number;
  history: HistorySnapshot[];
  historyIndex: number;
}
