"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import type { DocumentPage } from "./types";

// ─── Mock page content ────────────────────────────────────────────────────────

function ContractPageContent({ pageIndex }: { pageIndex: number }) {
  if (pageIndex === 0) {
    return (
      <div className="p-10 flex flex-col gap-6 text-gray-800 font-sans select-text">
        {/* Header */}
        <div className="text-center flex flex-col gap-1 border-b border-gray-200 pb-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Service Agreement</p>
          <h1 className="text-2xl font-bold text-gray-900">Professional Services Contract</h1>
          <p className="text-sm text-gray-500">Agreement No. 2026-0042 · Effective Date: April 1, 2026</p>
        </div>

        {/* Parties */}
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">1. Parties</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            This Professional Services Contract ("<strong>Agreement</strong>") is entered into as of the Effective Date above by and between:
          </p>
          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Service Provider</p>
              <p className="text-sm font-semibold text-gray-800">Liquid Glass Studio LLC</p>
              <p className="text-xs text-gray-500">123 Design Avenue, San Francisco, CA 94105</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Client</p>
              <p className="text-sm font-semibold text-gray-800">Acme Corporation</p>
              <p className="text-xs text-gray-500">456 Business Blvd, New York, NY 10001</p>
            </div>
          </div>
        </section>

        {/* Scope */}
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">2. Scope of Services</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Service Provider agrees to perform the following services ("<strong>Services</strong>") as described in Schedule A, attached hereto and incorporated herein by reference:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
            <li>UI/UX Design System Development for web and mobile platforms</li>
            <li>Front-end implementation of approved design specifications</li>
            <li>Component documentation and developer handoff materials</li>
            <li>Up to three (3) revision cycles per deliverable milestone</li>
          </ul>
        </section>

        {/* Term */}
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">3. Term</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            This Agreement commences on <strong>April 1, 2026</strong> and continues through <strong>September 30, 2026</strong> ("Initial Term"), unless earlier terminated pursuant to Section 9. The Agreement may be renewed for successive one (1) month periods upon written consent of both parties.
          </p>
        </section>

        {/* Compensation */}
        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">4. Compensation</h2>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase">Milestone</th>
                  <th className="text-left px-3 py-2 text-xs font-bold text-gray-500 uppercase">Due Date</th>
                  <th className="text-right px-3 py-2 text-xs font-bold text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Design Tokens & System",    "Apr 30, 2026", "$8,400"],
                  ["Component Library v1",      "May 31, 2026", "$12,600"],
                  ["Documentation & Handoff",   "Jun 30, 2026", "$6,000"],
                  ["Final Delivery & Review",   "Sep 30, 2026", "$5,000"],
                ].map(([m, d, a]) => (
                  <tr key={m} className="hover:bg-gray-50/50">
                    <td className="px-3 py-2 text-gray-700">{m}</td>
                    <td className="px-3 py-2 text-gray-500">{d}</td>
                    <td className="px-3 py-2 text-right font-semibold text-gray-800">{a}</td>
                  </tr>
                ))}
                <tr className="bg-purple-50/50">
                  <td colSpan={2} className="px-3 py-2 font-bold text-gray-800">Total</td>
                  <td className="px-3 py-2 text-right font-bold text-purple-700">$32,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  if (pageIndex === 1) {
    return (
      <div className="p-10 flex flex-col gap-6 text-gray-800 font-sans select-text">
        {/* Continuation header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Agreement No. 2026-0042 — Page 2</p>
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">5. Intellectual Property</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Upon receipt of full payment for each milestone, Service Provider hereby assigns to Client all right, title, and interest in and to the deliverables created specifically for Client under this Agreement, including all intellectual property rights therein. Service Provider retains the right to display the work in its portfolio.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">6. Confidentiality</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Each party agrees to keep confidential all non-public information of the other party obtained in connection with this Agreement ("<strong>Confidential Information</strong>") and not to disclose or use such Confidential Information except as necessary to perform its obligations hereunder. This obligation survives termination for three (3) years.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">7. Warranties</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Service Provider warrants that: (a) the Services will be performed in a professional manner consistent with industry standards; (b) the deliverables will not infringe any third-party intellectual property rights; and (c) Service Provider has full authority to enter into this Agreement.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">8. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THIS AGREEMENT. EACH PARTY&apos;S TOTAL LIABILITY SHALL NOT EXCEED THE TOTAL FEES PAID IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">9. Termination</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Either party may terminate this Agreement upon thirty (30) days written notice. Client may terminate immediately for cause if Service Provider materially breaches this Agreement. Upon termination, Client shall pay for all Services performed through the termination date.
          </p>
        </section>

        {/* Signature blocks */}
        <section className="flex flex-col gap-4 mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-purple-700 border-b border-purple-100 pb-1">10. Signatures</h2>
          <p className="text-sm text-gray-700">By signing below, the parties agree to be bound by the terms of this Agreement.</p>

          <div className="grid grid-cols-2 gap-8 mt-2">
            {[
              { party: "Service Provider", name: "Liquid Glass Studio LLC", by: "By: _______________________" },
              { party: "Client",           name: "Acme Corporation",         by: "By: _______________________" },
            ].map((s) => (
              <div key={s.party} className="flex flex-col gap-3">
                <p className="text-xs font-bold text-gray-500 uppercase">{s.party}</p>
                <p className="text-sm font-semibold text-gray-800">{s.name}</p>
                <div className="h-14 border-b-2 border-gray-300 flex items-end pb-1">
                  <p className="text-xs text-gray-400 italic">Signature</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div>
                    <p className="font-medium">Printed Name:</p>
                    <div className="border-b border-gray-200 h-4 mt-1" />
                  </div>
                  <div>
                    <p className="font-medium">Date:</p>
                    <div className="border-b border-gray-200 h-4 mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Blank page
  return (
    <div className="p-10 flex flex-col gap-3 text-gray-400">
      <div className="text-center text-sm font-medium text-gray-300 mt-20">— Page {pageIndex + 1} —</div>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="h-3 rounded-full bg-gray-100/80" style={{ width: `${60 + Math.sin(i * 1.7) * 35}%` }} />
      ))}
    </div>
  );
}

// ─── DocumentPage ─────────────────────────────────────────────────────────────

interface DocumentPageProps {
  page: DocumentPage;
  zoom: number;
  children?: React.ReactNode;
  containerRef?: React.Ref<HTMLDivElement>;
  pageRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

export function DocumentPageContainer({
  page, zoom, children, containerRef, pageRef, className,
}: DocumentPageProps) {
  const displayW = page.naturalWidth  * zoom;
  const displayH = page.naturalHeight * zoom;

  return (
    <div
      ref={pageRef}
      className={cn(
        "relative bg-white shadow-glass-xl border border-gray-200/60 flex-shrink-0 overflow-hidden",
        className
      )}
      style={{ width: displayW, height: displayH }}
    >
      {/* Document content (scaled) */}
      <div
        style={{
          width:           page.naturalWidth,
          height:          page.naturalHeight,
          transform:       `scale(${zoom})`,
          transformOrigin: "top left",
          position:        "absolute",
          top: 0, left: 0,
        }}
      >
        <ContractPageContent pageIndex={page.index} />
      </div>

      {/* Interaction layers (full size, no zoom — coordinates in %) */}
      <div ref={containerRef} className="absolute inset-0" style={{ width: displayW, height: displayH }}>
        {children}
      </div>
    </div>
  );
}

// ─── DocumentViewer ───────────────────────────────────────────────────────────

export interface DocumentViewerProps {
  pages: DocumentPage[];
  currentPage: number;
  zoom: number;
  className?: string;
  renderPage: (page: DocumentPage, pageContainerRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
}

export function DocumentViewer({
  pages, currentPage, zoom, className, renderPage,
}: DocumentViewerProps) {
  const page           = pages[currentPage];
  const containerRef   = useRef<HTMLDivElement>(null);
  const pageRef        = useRef<HTMLDivElement>(null);

  if (!page) return null;

  return (
    <div className={cn("flex-1 overflow-auto bg-gray-100/60 dark:bg-slate-900/60 flex items-start justify-center p-8", className)}>
      <DocumentPageContainer
        page={page}
        zoom={zoom}
        pageRef={pageRef}
        containerRef={containerRef}
      >
        {renderPage(page, containerRef)}
      </DocumentPageContainer>
    </div>
  );
}
