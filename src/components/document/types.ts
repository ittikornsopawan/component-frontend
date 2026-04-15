// ─── Document & Signing Workspace — Type System ───────────────────────────────

import * as pdfjs from 'pdfjs-dist';

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
  pdfPage?: pdfjs.PDFPageProxy; // PDF.js page reference
}

// ─── E-Signature Types ──────────────────────────────────────────────────────────

export interface ESignDocument {
  id: string;
  name: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  status: "draft" | "pending" | "completed" | "cancelled";
  templateId?: string;
  signers: Signer[];
  witnesses: Witness[];
  auditTrail: AuditEntry[];
  certificate?: DigitalCertificate;
  lockedAt?: Date;
  completedAt?: Date;
}

export interface Signer {
  id: string;
  name: string;
  email: string;
  role: "primary" | "secondary" | "witness";
  order: number;
  status: "pending" | "viewed" | "signed" | "declined";
  fields: DocumentField[];
  assignedFields: string[]; // field IDs
  signedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface Witness {
  id: string;
  name: string;
  email: string;
  signerId: string; // ID of the signer they're witnessing
  status: "pending" | "signed" | "declined";
  signedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface DigitalCertificate {
  id: string;
  serialNumber: string;
  issuer: string;
  subject: string;
  validFrom: Date;
  validTo: Date;
  publicKey: string;
  signature: string;
  fingerprint: string;
  selfSigned: boolean;
}

export interface AuditEntry {
  id: string;
  timestamp: Date;
  action: "uploaded" | "viewed" | "signed" | "witnessed" | "locked" | "downloaded";
  userId: string;
  userType: "signer" | "witness" | "admin";
  documentId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  hash?: string; // Document hash at time of action
}

// ─── Signing Workflow Types ───────────────────────────────────────────────────

export type SigningStep = "review" | "accept_terms" | "sign" | "confirm" | "witness";

export interface SigningState {
  currentStep: SigningStep;
  documentId: string;
  signerId: string;
  termsAccepted: boolean;
  signatureData?: string;
  witnessSignatureData?: string;
  certificate?: DigitalCertificate;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

// ─── Template System Types ─────────────────────────────────────────────────────

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fields: TemplateField[];
  version: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface TemplateField extends DocumentField {
  templateId: string;
  validation?: FieldValidation;
  conditional?: FieldConditional;
}

export interface FieldValidation {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

export interface FieldConditional {
  showWhen: {
    fieldId: string;
    operator: "equals" | "not_equals" | "contains" | "not_contains";
    value: string;
  };
}

// ─── Enhanced Document Field Types ─────────────────────────────────────────────

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
  // New e-signature specific fields
  signerId?: string;
  witnessId?: string;
  order?: number;
  group?: string;
  validation?: FieldValidation;
  conditional?: FieldConditional;
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
