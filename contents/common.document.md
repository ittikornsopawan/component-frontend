<!-- markdownlint-disable MD024 MD060 -->
# Document & Signing Workspace System

A complete interactive document workspace for SaaS platforms — supporting PDF viewing, signature capture, field placement, and canvas annotation. Designed to feel like DocuSign or a simplified Adobe Acrobat.

---

## System Overview

```text
DocumentWorkspace
├── DocumentToolbar       ← glass toolbar: tools, zoom, undo/redo, page nav
├── DocumentViewer        ← renders pages + hosts interaction layers
│   ├── DocumentPageContainer   ← per-page wrapper (scaled content + overlay)
│   │   ├── Document content    ← react-pdf <Page /> or mock HTML
│   │   ├── AnnotationLayer     ← canvas 2D overlay (z-30)
│   │   └── FieldOverlay        ← draggable/resizable fields (z-20)
└── SidePanel             ← layers list (fields + annotation count)
    └── SignatureModal    ← SignaturePad in modal (triggered by signature field click)
```

### Files

```text
src/components/document/
├── types.ts                       ← TypeScript interfaces (ToolType, DocumentField, Annotation, …)
├── hooks/
│   └── useDocumentState.ts        ← all state: fields, annotations, undo/redo, tool, zoom, page
├── SignaturePad.tsx                ← canvas signature drawing (freehand, Bezier smooth)
├── FieldOverlay.tsx                ← drag/resize field layer + placement on click
├── AnnotationLayer.tsx            ← canvas annotation layer (pen, highlight, shapes)
├── DocumentViewer.tsx             ← page renderer + layer host
├── DocumentToolbar.tsx            ← glass toolbar component
├── DocumentWorkspace.tsx          ← fully assembled workspace
└── index.ts                       ← barrel export
```

---

## Coordinate System

**All positions stored as percentages of the page's natural dimensions.**

```text
Page (naturalWidth=794px, naturalHeight=1123px)
┌─────────────────────────────────────────────┐
│  (0,0)                         (100,0)       │
│                                              │
│    ┌──────────────────────┐                  │
│    │ x:20  y:30           │                  │
│    │ width:40  height:12  │ ← DocumentField  │
│    └──────────────────────┘                  │
│                                              │
│  (0,100)                     (100,100)       │
└─────────────────────────────────────────────┘
```

Why percentages?
- Zoom-independent: page container grows/shrinks, % positions auto-scale
- PDF export: multiply % by naturalWidth/Height to get PDF points
- Responsive: works at any viewport size

Rendering formula:
```ts
const pixelX = (field.x / 100) * containerWidth;
const pixelY = (field.y / 100) * containerHeight;
```

---

## Component Reference

---

### 1. `DocumentWorkspace`

The fully assembled workspace. Drop-in component — no props required.

```tsx
import { DocumentWorkspace } from "@/components/document";

<div style={{ height: 700 }}>
  <DocumentWorkspace />
</div>
```

Includes:
- `DocumentToolbar` (all tools)
- `DocumentViewer` (3 simulated pages: 2 contract + 1 blank)
- `AnnotationLayer` (pen/highlight/shapes)
- `FieldOverlay` (signature/text/date/checkbox)
- `SidePanel` (layer list)
- `SignatureModal` (triggered on signature field click)

Replace mock pages with real PDF: see **Extension: react-pdf** section below.

---

### 2. `useDocumentState`

The central state hook. Use directly when assembling a custom workspace.

```ts
const doc = useDocumentState();

// Navigation
doc.setActiveTool("pen");
doc.setZoom(1.5);
doc.setCurrentPage(1);

// Fields
doc.addField({ id: "f1", type: "signature", pageIndex: 0, x: 20, y: 60, width: 30, height: 8 });
doc.updateField("f1", { x: 22 });          // optimistic (no history)
doc.commitFieldMove("f1", { x: 22 });      // commits to undo stack
doc.deleteField("f1");
doc.setFieldValue("f1", "data:image/png,…");

// Annotations
doc.addAnnotation(stroke);
doc.deleteAnnotation("ann-123");

// Undo / Redo
doc.undo();
doc.redo();
// doc.canUndo, doc.canRedo
```

Full state shape: `doc.state: DocumentState`

---

### 3. `SignaturePad`

Canvas-based freehand signature with Bezier curve smoothing.

```tsx
import { SignaturePad, SignaturePadRef } from "@/components/document";

const padRef = useRef<SignaturePadRef>(null);

<SignaturePad
  ref={padRef}
  width={480}
  height={180}
  strokeColor="#1a1a2e"
  strokeWidth={2.5}
  label="Sign here"
  showControls
  onChange={(dataUrl) => console.log(dataUrl)}
  onEnd={(dataUrl) => saveSignature(dataUrl)}
/>

// Imperative API
padRef.current?.clear();
padRef.current?.undo();
padRef.current?.toDataURL();  // → "data:image/png;base64,…"
padRef.current?.isEmpty();    // → boolean
```

#### Smoothing algorithm

```ts
// Quadratic Bezier via midpoint method
// For each consecutive triple of points:
const mid1 = midPoint(pts[i-1], pts[i]);
const mid2 = midPoint(pts[i],   pts[i+1]);
ctx.moveTo(mid1.x, mid1.y);
ctx.quadraticCurveTo(pts[i].x, pts[i].y, mid2.x, mid2.y);
```

#### Undo stack

Each `mousedown` (stroke start) captures an `ImageData` snapshot. Undo restores the previous snapshot via `ctx.putImageData()`.

---

### 4. `FieldOverlay`

Renders draggable/resizable fields over a page container.

```tsx
<FieldOverlay
  fields={doc.currentPageFields}
  selectedFieldId={doc.state.selectedFieldId}
  zoom={doc.state.zoom}
  activeTool={doc.state.activeTool}
  currentPage={doc.state.currentPage}
  containerRef={pageContainerRef}
  onSelect={doc.selectField}
  onUpdate={doc.updateField}
  onCommit={doc.commitFieldMove}
  onDelete={doc.deleteField}
  onValue={doc.setFieldValue}
  onAddField={doc.addField}
/>
```

#### Interaction

| Action | Result |
|--------|--------|
| Active field tool + click page | Places new field at cursor position |
| Click field | Selects it (shows delete + resize handles) |
| Drag selected field | Moves it (updates %, commits on mouseup) |
| Drag bottom-right handle | Resizes field |
| Click × button | Deletes field (pushes undo history) |
| Double-click text/date | Opens inline input |
| Click checkbox | Toggles value |
| Click signature (select tool) | Opens SignatureModal |

#### Field placement sizes (% defaults)

| Type | Width | Height |
|------|-------|--------|
| Signature | 28% | 8% |
| Text | 24% | 5% |
| Date | 18% | 5% |
| Checkbox | 5% | 5% |

---

### 5. `AnnotationLayer`

Canvas overlay for freehand drawing and shape annotation.

```tsx
<AnnotationLayer
  annotations={doc.currentPageAnnotations}
  activeTool={doc.state.activeTool}
  activeColor={doc.state.activeColor}
  penWidth={doc.state.activePenWidth}
  pageWidth={page.naturalWidth}
  pageHeight={page.naturalHeight}
  zoom={doc.state.zoom}
  onAddAnnotation={doc.addAnnotation}
/>
```

#### Tools

| Tool | Behavior | Storage |
|------|----------|---------|
| `pen` | Quadratic Bezier stroke | `AnnotationStroke` with `points[]` as % coords |
| `highlight` | Thick semi-transparent stroke | `AnnotationStroke`, opacity 0.35, multiply blend |
| `rectangle` | Drag to draw; live preview | `AnnotationShape`, type="rectangle" |
| `circle` | Drag to draw ellipse | `AnnotationShape`, type="circle" |

Canvas is pointer-events: none when a non-drawing tool is active — allowing click-through to fields.

---

### 6. `DocumentToolbar`

Glass floating toolbar.

```tsx
<DocumentToolbar
  activeTool="pen"
  zoom={1}
  currentPage={0}
  totalPages={3}
  activeColor="#7C3AED"
  penWidth={2}
  canUndo={true}
  canRedo={false}
  onTool={setActiveTool}
  onZoom={setZoom}
  onPage={setCurrentPage}
  onUndo={undo}
  onRedo={redo}
  onColor={setActiveColor}
  onPenWidth={setPenWidth}
/>
```

Color picker and pen width selector only appear when an annotation tool (`pen | highlight | rectangle | circle`) is active.

---

## Data Models

### `DocumentField`

```ts
interface DocumentField {
  id:           string;
  type:         "signature" | "text" | "date" | "checkbox";
  pageIndex:    number;      // 0-indexed
  x:            number;      // % of page width  (0–100)
  y:            number;      // % of page height (0–100)
  width:        number;      // % of page width
  height:       number;      // % of page height
  value?:       string;      // text string | PNG data URL for signatures
  label?:       string;      // display name
  required?:    boolean;
  assignedTo?:  string;      // signer identifier
  placeholder?: string;
}
```

### `AnnotationStroke`

```ts
interface AnnotationStroke {
  id:        string;
  kind:      "stroke";
  tool:      "pen" | "highlight";
  pageIndex: number;
  points:    { x: number; y: number }[];  // % coords
  color:     string;
  width:     number;    // px at 100% zoom
  opacity:   number;    // 0–1
}
```

### `AnnotationShape`

```ts
interface AnnotationShape {
  id:          string;
  kind:        "shape";
  type:        "rectangle" | "circle";
  pageIndex:   number;
  x:           number;   // % of page width
  y:           number;   // % of page height
  width:       number;   // % of page width
  height:      number;   // % of page height
  strokeColor: string;
  strokeWidth: number;
  fillColor?:  string;
}
```

### `HistorySnapshot`

```ts
interface HistorySnapshot {
  fields:      DocumentField[];
  annotations: Annotation[];
}
```

---

## State Management

All state lives in `useDocumentState`. Key design choices:

### Undo / Redo

```text
history: HistorySnapshot[]   [snap0, snap1, snap2, snap3]
historyIndex: 2              ────────────────^

undo() → historyIndex = 1 → restore snap1
redo() → historyIndex = 2 → restore snap2

new action pushes snap → truncates future: [snap0, snap1, snap4]
```

### Optimistic vs. committed updates

Field drag/resize fires `onUpdate` on every `mousemove` (optimistic, no history) and `onCommit` on `mouseup` (pushes snapshot). This prevents history spam from every pixel move.

---

## UX Rules

### Field placement

- Click with a field tool → places field centered on cursor, snapped to viewport
- Newly placed field auto-selected with handles visible
- Tool reverts to `select` after placement
- Double-click text/date to enter edit mode; click outside to save

### Annotations

- Drawing tools activate the canvas pointer events; fields become non-interactive while drawing
- Color picker and pen width only visible for annotation tools (no clutter for field tools)
- Highlight uses `multiply` composite operation — renders correctly over both white and colored backgrounds

### Signature capture

1. User selects Signature Field tool from toolbar
2. Clicks on page → field placed
3. User switches to Select tool (auto), clicks the signature field
4. `SignatureModal` opens with `SignaturePad`
5. User draws → clicks Apply → PNG data URL stored in `field.value`
6. Field renders the PNG image; proportionally scaled

### Zoom

- Zoom range: 0.5× — 2.5× (clamped in `setZoom`)
- Page container resizes → all % coords auto-scale
- Click zoom% label to reset to 100%
- Canvas resizes on zoom change and redraws all annotations

---

## Accessibility

| Feature | Implementation |
|---------|----------------|
| Keyboard navigation | Tab between toolbar buttons; Enter/Space to activate |
| ARIA labels | All icon-only toolbar buttons have `title` attributes |
| Canvas fallback | Fields (HTML elements) are keyboard-accessible; canvas tools are mouse/touch only |
| Reduced motion | Inherits from global `prefers-reduced-motion` reset in `globals.css` |

---

## Extension: Real PDF Viewer

The `DocumentViewer` uses simulated HTML pages by default. Swap for real PDF rendering:

### 1. Install react-pdf

```bash
npm install react-pdf
```

### 2. Configure Next.js worker

```ts
// next.config.ts
import { withPdfWorker } from "react-pdf";
export default withPdfWorker({});
```

### 3. Replace mock content in `DocumentViewer.tsx`

```tsx
// In DocumentPageContainer, replace <ContractPageContent /> with:
import { Page } from "react-pdf";

<Page
  pageIndex={page.index}
  width={page.naturalWidth}
  renderTextLayer={false}
  renderAnnotationLayer={false}
/>
```

All other layers (FieldOverlay, AnnotationLayer) remain unchanged — they are purely HTML/canvas overlays independent of the content layer.

---

## Import Reference

```ts
// Assembled workspace (recommended)
import { DocumentWorkspace } from "@/components/document";

// Individual components
import {
  DocumentViewer,
  DocumentToolbar,
  FieldOverlay,
  AnnotationLayer,
  SignaturePad,
} from "@/components/document";

// State hook
import { useDocumentState } from "@/components/document";

// Types
import type {
  DocumentField, Annotation, ToolType,
  AnnotationStroke, AnnotationShape,
} from "@/components/document";
```

---

## Decision Guide

```text
Need a complete drop-in workspace?              → <DocumentWorkspace />
Need just signature capture?                    → <SignaturePad />
Need to place fields on a custom document?      → useDocumentState + FieldOverlay
Need annotation-only on an image/PDF?           → useDocumentState + AnnotationLayer
Need a custom toolbar layout?                   → useDocumentState + DocumentToolbar
Building a multi-signer flow?                   → DocumentField.assignedTo + filter by signer
```
