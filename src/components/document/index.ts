// ─── Document & Signing Workspace System ─────────────────────────────────────

// Core Components
export { DocumentWorkspace }                          from "./DocumentWorkspace";
export type { DocumentWorkspaceProps }                from "./DocumentWorkspace";

export { DocumentViewer, DocumentPageContainer }      from "./DocumentViewer";
export type { DocumentViewerProps }                   from "./DocumentViewer";

export { DocumentToolbar }                            from "./DocumentToolbar";
export type { DocumentToolbarProps }                  from "./DocumentToolbar";

export { FieldOverlay }                               from "./FieldOverlay";
export type { FieldOverlayProps }                     from "./FieldOverlay";

export { AnnotationLayer }                            from "./AnnotationLayer";

export { SignaturePad }                               from "./SignaturePad";
export type { SignaturePadProps, SignaturePadRef }     from "./SignaturePad";

// E-Signature Components
export { PDFUpload }                                  from "./PDFUpload";
export type { PDFUploadProps }                        from "./PDFUpload";

export { PDFViewer }                                  from "./PDFViewer";
export type { PDFViewerProps, PDFPageInfo }           from "./PDFViewer";

// State Management
export { useDocumentState }                           from "./hooks/useDocumentState";
export type { DocumentStateHook }                     from "./hooks/useDocumentState";

// Types
export type {
  ToolType, FieldType, DocumentField,
  Annotation, AnnotationStroke, AnnotationShape,
  Point, DocumentPage, DocumentState, HistorySnapshot,
  // E-Signature Types
  ESignDocument, Signer, Witness, DigitalCertificate,
  AuditEntry, SigningState, SigningStep, Template,
  TemplateField, FieldValidation, FieldConditional,
} from "./types";
