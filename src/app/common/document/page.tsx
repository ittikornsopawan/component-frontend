"use client";

import React, { useState } from "react";
import { DemoLayout } from "@/components/common";
import { DocumentWorkspace } from "@/components/document";

export default function DocumentDemo() {
  return (
    <DemoLayout 
      title="Document System"
      description="Interactive document workspace with PDF viewing, annotations, and signature capture. A complete solution for document-centric workflows."
      currentSection="document"
    >
      {/* Document Workspace */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Document Workspace</h2>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden">
          <div style={{ height: "700px" }}>
            <DocumentWorkspace />
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-purple-100/70 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Annotation Tools</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Freehand drawing, highlighting, shapes, and text annotations with full color support.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-blue-100/70 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Signature Capture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Smooth signature pad with Bezier curve smoothing and undo/redo functionality.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-emerald-100/70 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Field Placement</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Drag-and-drop field placement for signatures, dates, checkboxes, and text inputs.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-amber-100/70 dark:bg-amber-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Zoom & Navigation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Smooth zoom controls with keyboard shortcuts and page navigation.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-red-100/70 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">↩️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Undo/Redo</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Full history tracking with unlimited undo and redo operations.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <div className="w-12 h-12 bg-indigo-100/70 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Layer Management</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Organized layer panel showing all annotations and fields with visibility controls.
            </p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Usage Examples</h2>
        <div className="space-y-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Implementation</h3>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300">
              <pre>{`import { DocumentWorkspace } from "@/components/document";

function DocumentPage() {
  return (
    <div style={{ height: "700px" }}>
      <DocumentWorkspace />
    </div>
  );
}`}</pre>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Integration</h3>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 font-mono text-sm text-gray-300">
              <pre>{`import { useDocumentState, DocumentViewer, 
         AnnotationLayer, FieldOverlay } from "@/components/document";

function CustomDocument() {
  const doc = useDocumentState();
  
  return (
    <div>
      <DocumentToolbar {...doc} />
      <DocumentViewer>
        <AnnotationLayer {...doc} />
        <FieldOverlay {...doc} />
      </DocumentViewer>
    </div>
  );
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Component Breakdown */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Component Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Core Components</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">DocumentWorkspace - Complete assembled workspace</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">DocumentViewer - Page renderer and container</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">DocumentToolbar - Glass toolbar with tools</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">AnnotationLayer - Canvas overlay for drawing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">FieldOverlay - Draggable form fields</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Utility Components</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">SignaturePad - Canvas-based signature capture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">useDocumentState - Central state management</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                <span className="text-gray-700 dark:text-gray-300">Types - TypeScript interfaces</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Coordinate System</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              All positions stored as percentages of page dimensions for zoom-independent scaling.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-xs">
              <div>x: 20%, y: 30%</div>
              <div>width: 40%, height: 12%</div>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">State Management</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Centralized state with undo/redo history, field management, and annotation tracking.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-xs">
              <div>history: HistorySnapshot[]</div>
              <div>fields: DocumentField[]</div>
              <div>annotations: Annotation[]</div>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Performance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
              Optimized canvas rendering with efficient redrawing and memory management.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 font-mono text-xs">
              <div>Canvas 2D Context</div>
              <div>RequestAnimationFrame</div>
              <div>Debounced updates</div>
            </div>
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}
