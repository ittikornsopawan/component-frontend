"use client";

import React, { useState, useRef } from "react";
import {
  FileText, Moon, Sun, Sparkles,
  PenLine, Type, Calendar, CheckSquare,
  Pen, Highlighter, Square, Circle,
  Info, ChevronRight,
} from "lucide-react";

import { DocumentWorkspace } from "@/components/document/DocumentWorkspace";
import { SignaturePad, SignaturePadRef } from "@/components/document/SignaturePad";

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "workspace", label: "Full Workspace" },
  { id: "signature", label: "Signature Pad" },
  { id: "fields",    label: "Field Types" },
  { id: "tools",     label: "Annotation Tools" },
  { id: "guide",     label: "Usage Guide" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Section({ id, title, description, children }: {
  id: string; title: string; description: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-200/60 dark:from-purple-700/30 to-transparent" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

function DemoCard({ title, children, span2 = false }: {
  title: string; children: React.ReactNode; span2?: boolean;
}) {
  return (
    <div className={`bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl shadow-black/5 rounded-3xl p-5 flex flex-col gap-4 ${span2 ? "md:col-span-2" : ""}`}>
      <p className="text-[11px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">{title}</p>
      {children}
    </div>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${color}`}>
      {label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocumentShowcasePage() {
  const [darkMode, setDarkMode]           = useState(false);
  const [activeSection, setActiveSection] = useState("workspace");
  const [sigDataUrl, setSigDataUrl]       = useState<string | null>(null);
  const padRef = useRef<SignaturePadRef>(null);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50/60 to-blue-50 dark:from-slate-950 dark:via-purple-950/40 dark:to-slate-900">

        {/* ── Header ── */}
        <header className="sticky top-0 z-[40] bg-white/30 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center shadow-md">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-800 dark:text-white leading-none">Document Workspace</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">E-Sign · PDF Viewer · Annotation · Field Placement</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/40 dark:bg-white/10 border border-white/30 dark:border-white/15 hover:bg-white/60 dark:hover:bg-white/15 transition-all duration-150"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>
          </div>
        </header>

        {/* ── Section nav ── */}
        <nav className="sticky top-[65px] z-[39] bg-white/20 dark:bg-black/10 backdrop-blur-xl border-b border-white/15 dark:border-white/8 overflow-x-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto px-6 flex gap-1 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-150 ${
                  activeSection === item.id
                    ? "bg-purple-400/20 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/8"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ── Main ── */}
        <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-14">

          {/* ─────────── FULL WORKSPACE ─────────── */}
          <Section
            id="workspace"
            title="Full Document Workspace"
            description="Interactive workspace combining PDF viewer, field placement, annotation tools, and signature capture."
          >
            {/* Workspace instructions banner */}
            <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-purple-50/60 dark:bg-purple-900/20 border border-purple-200/40 dark:border-purple-700/30">
              <Info className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1 text-xs text-purple-700 dark:text-purple-300">
                <p className="font-semibold">How to use the workspace:</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-purple-600/80 dark:text-purple-400/80">
                  <span><strong>Signature Field</strong> → click to place, then click the field to draw</span>
                  <span><strong>Text / Date / Checkbox</strong> → click to place, double-click to edit</span>
                  <span><strong>Pen / Highlight</strong> → drag to annotate</span>
                  <span><strong>Rectangle / Circle</strong> → drag to draw shapes</span>
                  <span><strong>Zoom</strong> → use +/– or percentage button to reset</span>
                  <span><strong>Undo/Redo</strong> → ↩/↪ buttons in toolbar</span>
                </div>
              </div>
            </div>

            {/* The full workspace */}
            <div className="rounded-3xl overflow-hidden border border-white/25 dark:border-white/10 shadow-glass-xl bg-white dark:bg-slate-900" style={{ height: 680 }}>
              <DocumentWorkspace className="h-full" />
            </div>
          </Section>

          {/* ─────────── SIGNATURE PAD ─────────── */}
          <Section
            id="signature"
            title="Signature Pad"
            description="Canvas-based signature drawing with Bezier curve smoothing. Supports mouse and touch input."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Freehand Signature">
                <SignaturePad
                  ref={padRef}
                  width={420}
                  height={160}
                  strokeColor="#1a1a2e"
                  strokeWidth={2.5}
                  label="Draw your signature"
                  onChange={(url) => setSigDataUrl(url)}
                />
                {sigDataUrl && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Signature captured as PNG data URL</p>
                  </div>
                )}
              </DemoCard>

              <DemoCard title="Signature Preview">
                <div className="rounded-2xl border border-white/25 dark:border-white/10 bg-gray-50/60 dark:bg-white/5 overflow-hidden" style={{ height: 160 }}>
                  {sigDataUrl ? (
                    <img
                      src={sigDataUrl}
                      alt="Your signature"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-sm text-gray-400 dark:text-gray-500 italic">Draw a signature on the left to preview it here</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">Technical details:</p>
                  {[
                    ["Smoothing",  "Quadratic Bezier curves via midpoint algorithm"],
                    ["Rendering",  "HTML5 Canvas 2D, DPR-aware (Retina)"],
                    ["Output",     "PNG data URL, embeds in DocumentField.value"],
                    ["Touch",      "touchstart / touchmove / touchend events"],
                    ["Undo",       "ImageData snapshot stack per stroke"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-start gap-2">
                      <span className="font-semibold text-gray-600 dark:text-gray-400 w-16 flex-shrink-0">{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </DemoCard>

              <DemoCard title="Compact Variant" span2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Party A — Authorised Signatory", color: "#1a1a2e", w: 2.5 },
                    { label: "Party B — Witness",              color: "#2563EB", w: 2   },
                    { label: "Notary Signature",               color: "#7C3AED", w: 2   },
                  ].map((s) => (
                    <SignaturePad
                      key={s.label}
                      width={220}
                      height={100}
                      strokeColor={s.color}
                      strokeWidth={s.w}
                      label={s.label}
                      compact
                      showControls
                    />
                  ))}
                </div>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── FIELD TYPES ─────────── */}
          <Section
            id="fields"
            title="Field Types"
            description="Draggable, resizable document fields. Click to select, drag to reposition, resize from corner handle."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Field Reference">
                <div className="flex flex-col gap-3">
                  {[
                    {
                      type: "Signature Field",
                      icon: <PenLine className="w-4 h-4" />,
                      color: "bg-purple-100/70 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
                      border: "border-purple-400 dark:border-purple-500",
                      desc: "Freehand signature captured in SignaturePad modal",
                      trigger: "Click field → draw signature → Apply",
                    },
                    {
                      type: "Text Field",
                      icon: <Type className="w-4 h-4" />,
                      color: "bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
                      border: "border-blue-400 dark:border-blue-500",
                      desc: "Free text input for names, addresses, or notes",
                      trigger: "Double-click to edit inline",
                    },
                    {
                      type: "Date Field",
                      icon: <Calendar className="w-4 h-4" />,
                      color: "bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400",
                      border: "border-emerald-400 dark:border-emerald-500",
                      desc: "Native date picker for signing date or deadline",
                      trigger: "Double-click to open date picker",
                    },
                    {
                      type: "Checkbox Field",
                      icon: <CheckSquare className="w-4 h-4" />,
                      color: "bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
                      border: "border-amber-400 dark:border-amber-500",
                      desc: "Agreement / consent checkboxes for T&Cs",
                      trigger: "Single click to toggle",
                    },
                  ].map((f) => (
                    <div key={f.type} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-dashed ${f.border} ${f.color}`}>
                        {f.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{f.type}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
                        <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-0.5 flex items-center gap-1">
                          <ChevronRight className="w-3 h-3" /> {f.trigger}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DemoCard>

              <DemoCard title="Field Data Model">
                <div className="bg-gray-900/90 dark:bg-black/40 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-300 leading-relaxed">{`interface DocumentField {
  id:          string;       // unique ID
  type:        FieldType;    // signature|text|date|checkbox
  pageIndex:   number;       // 0-indexed page
  x:           number;       // % of page width  (0–100)
  y:           number;       // % of page height (0–100)
  width:       number;       // % of page width
  height:      number;       // % of page height
  value?:      string;       // text or base64 PNG
  label?:      string;       // display label
  required?:   boolean;      // validation flag
  assignedTo?: string;       // signer identifier
  placeholder?: string;      // empty state label
}`}</pre>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  All positions stored as percentages — <strong className="text-gray-700 dark:text-gray-300">zoom-independent</strong>. Multiplying by page dimensions gives pixel coordinates at any zoom level.
                </p>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── ANNOTATION TOOLS ─────────── */}
          <Section
            id="tools"
            title="Annotation Tools"
            description="Canvas-based annotation layer overlaid on the document. All annotations stored as coordinate-percentage objects."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Tool Reference">
                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: <Pen className="w-4 h-4" />,
                      name: "Pen",
                      color: "bg-gray-100/70 dark:bg-white/8 text-gray-700 dark:text-gray-300",
                      desc: "Freehand drawing with Bezier smoothing. Configurable width and color.",
                      tags: ["stroke", "variable width", "color picker"],
                    },
                    {
                      icon: <Highlighter className="w-4 h-4" />,
                      name: "Highlight",
                      color: "bg-yellow-100/70 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
                      desc: "Semi-transparent highlight using multiply composite mode. 35% opacity.",
                      tags: ["stroke", "35% opacity", "multiply blend"],
                    },
                    {
                      icon: <Square className="w-4 h-4" />,
                      name: "Rectangle",
                      color: "bg-blue-100/70 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
                      desc: "Drag to draw rectangle. Live preview while dragging.",
                      tags: ["shape", "live preview", "stroke only"],
                    },
                    {
                      icon: <Circle className="w-4 h-4" />,
                      name: "Circle / Ellipse",
                      color: "bg-purple-100/70 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400",
                      desc: "Drag to draw ellipse. Width and height from drag distance.",
                      tags: ["shape", "live preview", "ellipse"],
                    },
                  ].map((t) => (
                    <div key={t.name} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${t.color}`}>
                        {t.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-0.5">{t.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {t.tags.map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded-md bg-gray-100/60 dark:bg-white/8 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DemoCard>

              <DemoCard title="Annotation Data Model">
                <div className="bg-gray-900/90 dark:bg-black/40 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-300 leading-relaxed">{`// Stroke (pen / highlight)
interface AnnotationStroke {
  id:        string;
  kind:      "stroke";
  tool:      "pen" | "highlight";
  pageIndex: number;
  points:    { x: number; y: number }[];
  color:     string;      // hex
  width:     number;      // px at 100% zoom
  opacity:   number;      // 0–1
}

// Shape (rectangle / circle)
interface AnnotationShape {
  id:          string;
  kind:        "shape";
  type:        "rectangle" | "circle";
  pageIndex:   number;
  x:           number;    // % of page width
  y:           number;    // % of page height
  width:       number;    // % of page width
  height:      number;    // % of page height
  strokeColor: string;
  strokeWidth: number;
}`}</pre>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  All shapes stored in <strong className="text-gray-700 dark:text-gray-300">percentage coordinates</strong> — redrawn correctly at any zoom level via canvas scaling.
                </p>
              </DemoCard>

              <DemoCard title="Undo / Redo Stack" span2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">History model</p>
                    <div className="bg-gray-900/90 dark:bg-black/40 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                      <pre className="text-gray-300 leading-relaxed">{`// Each mutating action pushes a snapshot
interface HistorySnapshot {
  fields:      DocumentField[];
  annotations: Annotation[];
}

// State
historyIndex: number;
history:      HistorySnapshot[];

// Undo: index--  → restore snapshot
// Redo: index++  → restore snapshot
// Max: unbounded (trimmed on new action)`}</pre>
                    </div>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Actions that push history</p>
                    <div className="flex flex-col gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      {[
                        "Add field (any type)",
                        "Delete field",
                        "Commit field move / resize",
                        "Add annotation stroke",
                        "Add annotation shape",
                        "Delete annotation",
                        "Clear page annotations",
                      ].map((a) => (
                        <div key={a} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                          {a}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-3">
                      Live field repositioning (<em>mousemove</em>) updates state directly without pushing history. Only the final <em>mouseup</em> commits to history.
                    </p>
                  </div>
                </div>
              </DemoCard>
            </div>
          </Section>

          {/* ─────────── USAGE GUIDE ─────────── */}
          <Section
            id="guide"
            title="Usage Guide"
            description="Integration patterns, coordinate system, and extension points."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <DemoCard title="Coordinate System">
                <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900">
                  {/* Page sim */}
                  <div className="absolute inset-3 border-2 border-dashed border-purple-300/50 dark:border-purple-700/40 rounded-xl flex flex-col items-start justify-start p-2 gap-1">
                    <p className="text-[9px] text-purple-500 font-bold uppercase tracking-wider">Page (naturalWidth × naturalHeight)</p>
                    {/* Field example */}
                    <div className="absolute border-2 border-dashed border-blue-400 bg-blue-50/60 dark:bg-blue-900/20 rounded"
                         style={{ left: "20%", top: "30%", width: "40%", height: "12%" }}>
                      <span className="text-[8px] text-blue-600 font-bold px-1">x:20% y:30% w:40% h:12%</span>
                    </div>
                    <div className="absolute border-2 border-dashed border-purple-400 bg-purple-50/60 dark:bg-purple-900/20 rounded"
                         style={{ left: "60%", top: "55%", width: "25%", height: "14%" }}>
                      <span className="text-[8px] text-purple-600 font-bold px-1">x:60% y:55%</span>
                    </div>
                    {/* Coordinate labels */}
                    <div className="absolute bottom-1 left-2 text-[8px] text-gray-400">(0,0)</div>
                    <div className="absolute bottom-1 right-2 text-[8px] text-gray-400">(100,0)</div>
                    <div className="absolute top-1 left-2 text-[8px] text-gray-400">(0,0)</div>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <p><span className="font-semibold text-gray-700 dark:text-gray-300">Stored:</span> x/y/width/height as % of page natural size</p>
                  <p><span className="font-semibold text-gray-700 dark:text-gray-300">Rendered:</span> multiplied by <code className="font-mono text-purple-600 dark:text-purple-400">containerWidth</code> at runtime</p>
                  <p><span className="font-semibold text-gray-700 dark:text-gray-300">Zoom:</span> page container grows, % coords auto-scale</p>
                  <p><span className="font-semibold text-gray-700 dark:text-gray-300">Export:</span> multiply % by naturalWidth/Height for PDF pts</p>
                </div>
              </DemoCard>

              <DemoCard title="Component Import">
                <div className="bg-gray-900/90 dark:bg-black/40 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                  <pre className="text-gray-300 leading-relaxed">{`// Full workspace (recommended)
import { DocumentWorkspace }
  from "@/components/document";

<DocumentWorkspace className="h-[700px]" />

// Individual components
import {
  SignaturePad,
  FieldOverlay,
  AnnotationLayer,
  DocumentToolbar,
  DocumentViewer,
  useDocumentState,
} from "@/components/document";

// Use the state hook standalone
const doc = useDocumentState();
// doc.state, doc.addField, doc.undo, ...`}</pre>
                </div>
              </DemoCard>

              <DemoCard title="Extension: Real PDF" span2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Swap the mock viewer for react-pdf</p>
                    <div className="bg-gray-900/90 dark:bg-black/40 rounded-2xl p-4 font-mono text-xs overflow-x-auto">
                      <pre className="text-gray-300 leading-relaxed">{`// 1. Install
npm i react-pdf

// 2. Replace DocumentPageContainer
//    content with <Page /> from react-pdf:
import { Page } from "react-pdf";

// In DocumentViewer.tsx:
<div style={{ width, height, position }}>
  <Page
    pageIndex={page.index}
    width={page.naturalWidth}
    renderTextLayer={false}
    renderAnnotationLayer={false}
  />
</div>
// All other layers (fields, annotations)
// remain unchanged`}</pre>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Architecture layers</p>
                    {[
                      { z: "z-10",  label: "Document content",  desc: "Mock HTML or react-pdf <Page />", color: "bg-gray-200/60 dark:bg-white/10" },
                      { z: "z-20",  label: "Field overlay",     desc: "Draggable/resizable DocumentField nodes", color: "bg-blue-100/60 dark:bg-blue-900/20" },
                      { z: "z-30",  label: "Annotation canvas", desc: "Canvas 2D for pen/shapes", color: "bg-purple-100/60 dark:bg-purple-900/20" },
                      { z: "z-40+", label: "Toolbar + panels",  desc: "Glass UI controls (never over canvas)", color: "bg-amber-100/60 dark:bg-amber-900/20" },
                    ].map((l) => (
                      <div key={l.z} className={`flex items-center gap-3 px-3 py-2 rounded-xl ${l.color}`}>
                        <code className="text-[10px] font-mono font-bold text-gray-600 dark:text-gray-400 w-14 flex-shrink-0">{l.z}</code>
                        <div>
                          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{l.label}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">{l.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DemoCard>
            </div>
          </Section>

          {/* ── Footer ── */}
          <footer className="text-center py-12 border-t border-white/20 dark:border-white/10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">Document Workspace</span>
                {" "}· 7 components · Canvas API · Zoom-independent coords · Undo/redo
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
