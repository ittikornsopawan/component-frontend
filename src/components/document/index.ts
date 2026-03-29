// ─── Document & Signing Workspace System ─────────────────────────────────────

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

export { useDocumentState }                           from "./hooks/useDocumentState";
export type { DocumentStateHook }                     from "./hooks/useDocumentState";

export type {
  ToolType, FieldType, DocumentField,
  Annotation, AnnotationStroke, AnnotationShape,
  Point, DocumentPage, DocumentState, HistorySnapshot,
} from "./types";
