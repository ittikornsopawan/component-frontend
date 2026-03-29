"use client";

import React, { useId, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { UploadCloud, X, FileText } from "lucide-react";

export interface DragAndDropUploadProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxSizeMB?: number;
}

export function DragAndDropUpload({
  label, helperText, errorMessage, value, onChange, accept,
  multiple = true, disabled, required, id, className, maxSizeMB,
}: DragAndDropUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const currentFiles = value !== undefined ? value : internalFiles;

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    if (maxSizeMB) {
      const oversized = arr.find((f) => f.size > maxSizeMB * 1024 * 1024);
      if (oversized) { setSizeError(`File "${oversized.name}" exceeds ${maxSizeMB}MB limit`); return; }
    }
    setSizeError(null);
    const next = multiple ? [...currentFiles, ...arr] : [arr[0]];
    if (value === undefined) setInternalFiles(next);
    onChange?.(next);
  }, [currentFiles, maxSizeMB, multiple, onChange, value]);

  const removeFile = (idx: number) => {
    const next = currentFiles.filter((_, i) => i !== idx);
    if (value === undefined) setInternalFiles(next);
    onChange?.(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    addFiles(e.dataTransfer.files);
  };

  const displayError = errorMessage || sizeError;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        aria-invalid={displayError ? "true" : undefined}
        aria-describedby={displayError ? errorId : helperText ? helperId : undefined}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 cursor-pointer",
          "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
          "border-2 border-dashed transition-all duration-200 ease-out",
          isDragging
            ? "border-purple-400/70 bg-purple-50/40 dark:bg-purple-900/20 scale-[1.01] shadow-xl shadow-purple-100/30"
            : "border-white/30 dark:border-white/15 hover:border-purple-300/50 hover:bg-white/80 dark:hover:bg-white/10",
          "shadow-lg shadow-black/10",
          displayError && "border-red-300/50",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => e.target.files && addFiles(e.target.files)}
          className="sr-only"
        />
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200",
          isDragging
            ? "bg-purple-400/30 dark:bg-purple-600/30 scale-110"
            : "bg-purple-100/40 dark:bg-purple-900/30"
        )}>
          <UploadCloud className={cn("w-7 h-7 transition-all duration-200", isDragging ? "text-purple-600 dark:text-purple-300" : "text-purple-500 dark:text-purple-400")} />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-purple-500 dark:text-purple-400">
              {isDragging ? "Drop files here" : "Drag & drop files"}
            </span>
            {!isDragging && " or click to browse"}
          </p>
          {(accept || maxSizeMB) && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {accept && <span>{accept}</span>}
              {accept && maxSizeMB && " · "}
              {maxSizeMB && <span>Max {maxSizeMB}MB</span>}
            </p>
          )}
        </div>
      </div>

      {currentFiles.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {currentFiles.map((file, idx) => (
            <li key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 animate-fade-in">
              <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
              <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-400 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {helperText && !displayError && <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
      {displayError && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {displayError}
        </p>
      )}
    </div>
  );
}
