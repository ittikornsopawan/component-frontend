"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Loader2, AlertCircle } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import { cn } from "@/lib/utils";

// ─── PDF.js Configuration ─────────────────────────────────────────────────────

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface PDFViewerProps {
  fileUrl: string;
  onPageChange?: (pageNumber: number) => void;
  onZoomChange?: (scale: number) => void;
  className?: string;
  initialScale?: number;
  showControls?: boolean;
  showDownload?: boolean;
  disabled?: boolean;
}

interface PDFPageInfo {
  pageNumber: number;
  width: number;
  height: number;
  scale: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

const MIN_SCALE = 0.5;
const MAX_SCALE = 3.0;
const SCALE_STEP = 0.25;
const DEFAULT_SCALE = 1.0;

// ─── PDF Viewer Component ─────────────────────────────────────────────────────

export function PDFViewer({
  fileUrl,
  onPageChange,
  onZoomChange,
  className,
  initialScale = DEFAULT_SCALE,
  showControls = true,
  showDownload = true,
  disabled = false,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(initialScale);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagesInfo, setPagesInfo] = useState<PDFPageInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // ─── PDF Load Handlers ─────────────────────────────────────────────────────

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
    
    // Initialize pages info
    const initialPagesInfo: PDFPageInfo[] = [];
    for (let i = 1; i <= numPages; i++) {
      initialPagesInfo.push({
        pageNumber: i,
        width: 0,
        height: 0,
        scale: scale,
      });
    }
    setPagesInfo(initialPagesInfo);
  }, [scale]);

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(error.message);
    setIsLoading(false);
    console.error('PDF load error:', error);
  }, []);

  const onPageLoadSuccess = useCallback((page: any, pageIndex: number) => {
    const { width, height } = page;
    
    setPagesInfo(prev => {
      const newPagesInfo = [...prev];
      if (newPagesInfo[pageIndex]) {
        newPagesInfo[pageIndex] = {
          ...newPagesInfo[pageIndex],
          width,
          height,
        };
      }
      return newPagesInfo;
    });
  }, []);

  // ─── Navigation Handlers ───────────────────────────────────────────────────

  const changePage = useCallback((newPageNumber: number) => {
    if (newPageNumber >= 1 && newPageNumber <= numPages) {
      setPageNumber(newPageNumber);
      onPageChange?.(newPageNumber);
      
      // Scroll to top of new page
      setTimeout(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }, [numPages, onPageChange]);

  const previousPage = useCallback(() => {
    changePage(pageNumber - 1);
  }, [pageNumber, changePage]);

  const nextPage = useCallback(() => {
    changePage(pageNumber + 1);
  }, [pageNumber, changePage]);

  // ─── Zoom Handlers ─────────────────────────────────────────────────────────

  const changeScale = useCallback((newScale: number) => {
    const clampedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
    setScale(clampedScale);
    onZoomChange?.(clampedScale);
  }, [onZoomChange]);

  const zoomIn = useCallback(() => {
    changeScale(scale + SCALE_STEP);
  }, [scale, changeScale]);

  const zoomOut = useCallback(() => {
    changeScale(scale - SCALE_STEP);
  }, [scale, changeScale]);

  const resetZoom = useCallback(() => {
    changeScale(DEFAULT_SCALE);
  }, [changeScale]);

  // ─── Download Handler ───────────────────────────────────────────────────────

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [fileUrl]);

  // ─── Keyboard Navigation ───────────────────────────────────────────────────

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          previousPage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextPage();
          break;
        case '+':
        case '=':
          event.preventDefault();
          zoomIn();
          break;
        case '-':
        case '_':
          event.preventDefault();
          zoomOut();
          break;
        case '0':
          event.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, previousPage, nextPage, zoomIn, zoomOut, resetZoom]);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={cn("flex flex-col h-full bg-gray-50 dark:bg-gray-900", className)}>
      {/* Controls */}
      {showControls && (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Page navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousPage}
              disabled={pageNumber <= 1 || disabled}
              className={cn(
                "p-2 rounded-lg transition-colors",
                pageNumber <= 1 || disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <input
                type="number"
                value={pageNumber}
                onChange={(e) => {
                  const newPage = parseInt(e.target.value);
                  if (!isNaN(newPage)) {
                    changePage(newPage);
                  }
                }}
                disabled={disabled}
                className="w-12 text-center bg-transparent border-none outline-none text-sm font-medium text-gray-900 dark:text-white"
                min={1}
                max={numPages}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">/ {numPages}</span>
            </div>
            
            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages || disabled}
              className={cn(
                "p-2 rounded-lg transition-colors",
                pageNumber >= numPages || disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={zoomOut}
              disabled={scale <= MIN_SCALE || disabled}
              className={cn(
                "p-2 rounded-lg transition-colors",
                scale <= MIN_SCALE || disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {Math.round(scale * 100)}%
              </span>
            </div>
            
            <button
              onClick={zoomIn}
              disabled={scale >= MAX_SCALE || disabled}
              className={cn(
                "p-2 rounded-lg transition-colors",
                scale >= MAX_SCALE || disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          {/* Download button */}
          {showDownload && (
            <button
              onClick={handleDownload}
              disabled={disabled}
              className={cn(
                "p-2 rounded-lg transition-colors",
                disabled
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* PDF Content */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4"
        style={{ scrollBehavior: 'smooth' }}
      >
        {error ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Failed to load PDF
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Loading PDF...
                    </span>
                  </div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-64">
                  <div className="text-center space-y-2">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Failed to load PDF document
                    </p>
                  </div>
                </div>
              }
            >
              {/* Render all pages */}
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="mb-4">
                  <Page
                    pageNumber={index + 1}
                    scale={scale}
                    onLoadSuccess={(page) => onPageLoadSuccess(page, index)}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    className="shadow-lg"
                  />
                </div>
              ))}
            </Document>
          </div>
        )}
      </div>

      {/* Page indicators */}
      {!error && numPages > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          {Array.from(new Array(Math.min(numPages, 10)), (el, index) => {
            const pageNum = index + 1;
            const isActive = pageNum === pageNumber;
            const isCurrentPage = pageNum === pageNumber;
            
            return (
              <button
                key={pageNum}
                onClick={() => changePage(pageNum)}
                disabled={disabled}
                className={cn(
                  "w-8 h-8 rounded-full text-xs font-medium transition-colors",
                  isActive
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {pageNum}
              </button>
            );
          })}
          
          {numPages > 10 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ... +{numPages - 10} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Export Types ─────────────────────────────────────────────────────────────

export type { PDFViewerProps, PDFPageInfo };
