"use client";

import React, { useState, useRef, useEffect } from "react";
import { DemoLayout } from "@/components/common";
import { DocumentWorkspace } from "@/components/document";
import { SignaturePad, SignaturePadRef } from "@/components/document/SignaturePad";

export default function DocumentDemo() {
  const [signatures, setSignatures] = useState<Record<string, string>>({});
  const signaturePadRefs = useRef<Record<string, SignaturePadRef>>({});

  const handleSaveSignature = (fieldId: string) => {
    const dataUrl = signaturePadRefs.current[fieldId]?.toDataURL();
    if (dataUrl && !signaturePadRefs.current[fieldId]?.isEmpty()) {
      setSignatures(prev => ({ ...prev, [fieldId]: dataUrl }));
    }
  };

  const handleClearSignature = (fieldId: string) => {
    signaturePadRefs.current[fieldId]?.clear();
    setSignatures(prev => ({ ...prev, [fieldId]: "" }));
  };

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

      {/* Signature Block with Pre-defined Areas */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contract Signature Block</h2>
        <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8">
          <div className="space-y-8">
            {/* Contract Content */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Service Agreement</h3>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  This Service Agreement ("Agreement") is entered into on this date between the parties identified below. 
                  By signing this document, both parties agree to the terms and conditions outlined herein.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Terms of Service:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Services will be provided according to the specifications outlined in Exhibit A</li>
                    <li>Payment terms are net 30 days from invoice date</li>
                    <li>Either party may terminate with 30 days written notice</li>
                    <li>Confidential information shall be protected as outlined in Section 4</li>
                  </ul>
                </div>
                
                <p>
                  Both parties acknowledge they have read and understood this Agreement and voluntarily agree to be bound by its terms.
                </p>
              </div>
              
              {/* Signature Areas */}
              <div className="mt-8 space-y-6">
                {/* Client Signature */}
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Client Signature</h4>
                      <div className="space-y-3">
                        <div className="relative">
                          {signatures.client ? (
                            <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700 p-2">
                              <img src={signatures.client} alt="Client Signature" className="h-full object-contain" />
                              <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                              <SignaturePad
                                ref={(ref) => { if (ref) signaturePadRefs.current.client = ref; }}
                                width={400}
                                height={80}
                                strokeColor="#1a1a2e"
                                strokeWidth={2}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!signatures.client && (
                            <button
                              onClick={() => handleSaveSignature('client')}
                              className="px-3 py-1 text-xs bg-brand-500 text-white rounded hover:bg-brand-600 transition-colors"
                            >
                              Sign
                            </button>
                          )}
                          <button
                            onClick={() => handleClearSignature('client')}
                            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Printed Name</label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                              John Doe
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                              {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Provider Signature */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Service Provider Signature</h4>
                      <div className="space-y-3">
                        <div className="relative">
                          {signatures.provider ? (
                            <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700 p-2">
                              <img src={signatures.provider} alt="Provider Signature" className="h-full object-contain" />
                              <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                              <SignaturePad
                                ref={(ref) => { if (ref) signaturePadRefs.current.provider = ref; }}
                                width={400}
                                height={80}
                                strokeColor="#1a1a2e"
                                strokeWidth={2}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!signatures.provider && (
                            <button
                              onClick={() => handleSaveSignature('provider')}
                              className="px-3 py-1 text-xs bg-brand-500 text-white rounded hover:bg-brand-600 transition-colors"
                            >
                              Sign
                            </button>
                          )}
                          <button
                            onClick={() => handleClearSignature('provider')}
                            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Printed Name</label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                              Jane Smith
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                            <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                              {new Date().toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Witness Signature */}
                <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Witness Signature</h4>
                  <div className="max-w-md">
                    <div className="space-y-3">
                      <div className="relative">
                        {signatures.witness ? (
                          <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-green-300 dark:border-green-700 p-2">
                            <img src={signatures.witness} alt="Witness Signature" className="h-full object-contain" />
                            <div className="absolute top-2 right-2 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <span className="text-green-600 dark:text-green-400 text-xs">✓</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <SignaturePad
                              ref={(ref) => { if (ref) signaturePadRefs.current.witness = ref; }}
                              width={400}
                              height={80}
                              strokeColor="#1a1a2e"
                              strokeWidth={2}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!signatures.witness && (
                          <button
                            onClick={() => handleSaveSignature('witness')}
                            className="px-3 py-1 text-xs bg-brand-500 text-white rounded hover:bg-brand-600 transition-colors"
                          >
                            Sign
                          </button>
                        )}
                        <button
                          onClick={() => handleClearSignature('witness')}
                          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Printed Name</label>
                          <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                            Robert Johnson
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Date</label>
                          <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded text-sm px-2 flex items-center">
                            {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    Object.keys(signatures).length === 3 ? 'bg-green-500' : 'bg-yellow-500'
                  }`} />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {Object.keys(signatures).length === 3 
                      ? 'All signatures completed - Document is fully executed' 
                      : `${Object.keys(signatures).length}/3 signatures completed`
                    }
                  </span>
                </div>
              </div>
            </div>
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

      {/* Signature Frame Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Signature Frame Types</h2>
        <div className="space-y-8">
          {/* Signature Frame Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Signature Frame */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-3xl text-gray-400 dark:text-gray-500">✍️</div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Signature</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Simple signature area for digital signatures
                </p>
                <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500 text-sm">Sign here</span>
                </div>
              </div>
            </div>

            {/* Formal Signature Frame */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-3xl text-gray-400 dark:text-gray-500">📝</div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Formal Signature</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Professional signature frame with details
                </p>
                <div className="space-y-3">
                  <div className="h-16 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <span className="text-gray-400 dark:text-gray-500 text-sm">Signature</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-left">
                      <span className="text-gray-500 dark:text-gray-400">Date:</span>
                      <div className="h-6 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 mt-1"></div>
                    </div>
                    <div className="text-left">
                      <span className="text-gray-500 dark:text-gray-400">Name:</span>
                      <div className="h-6 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certified Signature Frame */}
            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-blue-300 dark:border-blue-700 p-6 relative">
              <div className="absolute top-2 right-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <div className="text-blue-600 dark:text-blue-400 text-xs">🔒</div>
                </div>
              </div>
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-3xl text-blue-500">🏛️</div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Certified Signature</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Legally binding signature with certification
                </p>
                <div className="space-y-3">
                  <div className="h-20 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                    <span className="text-blue-400 dark:text-blue-300 text-sm">Certified Signature</span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    <div className="flex justify-between">
                      <span>Digital ID: #123456</span>
                      <span>✓ Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Frame Features */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Signature Frame Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🖊️ Drawing Tools</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pen, brush, eraser with pressure sensitivity</p>
              </div>
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">📱 Touch Support</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Native touch and stylus input support</p>
              </div>
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">💾 Auto-save</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Automatic signature saving and backup</p>
              </div>
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-4">
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">🔐 Security</div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Encrypted storage and tamper protection</p>
              </div>
            </div>
          </div>

          {/* Interactive Signature Demo */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interactive Signature Demo</h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Document Agreement</h4>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                      Clear
                    </button>
                    <button className="px-3 py-1 text-xs bg-brand-500 text-white rounded hover:bg-brand-600">
                      Save
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded p-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      By signing below, I agree to the terms and conditions outlined in this document.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      This electronic signature is legally binding under the Electronic Signatures Act.
                    </p>
                  </div>
                  
                  <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Signature
                        </label>
                        <div className="h-24 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-brand-500 transition-colors">
                          <div className="text-center">
                            <div className="text-2xl text-gray-400 dark:text-gray-500 mb-2">✍️</div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Click to sign</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name
                          </label>
                          <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded"></div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date
                          </label>
                          <div className="h-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}
