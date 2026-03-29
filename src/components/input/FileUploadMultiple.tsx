"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, FileText } from "lucide-react";

export interface FileUploadMultipleProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxSizeMB?: number;
  maxFiles?: number;
}

export function FileUploadMultiple({
  label, helperText, errorMessage, value, onChange, accept,
  disabled, required, id, className, maxSizeMB, maxFiles,
}: FileUploadMultipleProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const currentFiles = value !== undefined ? value : internalFiles;

  const addFiles = (incoming: FileList) => {
    const arr = Array.from(incoming);
    if (maxSizeMB) {
      const oversized = arr.find((f) => f.size > maxSizeMB * 1024 * 1024);
      if (oversized) { setSizeError(`"${oversized.name}" exceeds ${maxSizeMB}MB`); return; }
    }
    setSizeError(null);
    const combined = maxFiles
      ? [...currentFiles, ...arr].slice(0, maxFiles)
      : [...currentFiles, ...arr];
    if (value === undefined) setInternalFiles(combined);
    onChange?.(combined);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (idx: number) => {
    const next = currentFiles.filter((_, i) => i !== idx);
    if (value === undefined) setInternalFiles(next);
    onChange?.(next);
  };

  const displayError = errorMessage || sizeError;
  const atLimit = maxFiles !== undefined && currentFiles.length >= maxFiles;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
          {maxFiles && <span className="ml-2 text-xs text-gray-400 font-normal">({currentFiles.length}/{maxFiles})</span>}
        </label>
      )}

      {!atLimit && (
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            "flex items-center gap-3 rounded-2xl px-4 py-3 cursor-pointer",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border-2 border-dashed border-white/30 dark:border-white/15",
            "shadow-lg shadow-black/10 transition-all duration-200",
            !disabled && "hover:border-purple-300/60 hover:bg-white/80 dark:hover:bg-white/10",
            displayError && "border-red-300/50",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <input
            ref={inputRef} id={inputId} type="file" accept={accept} multiple disabled={disabled}
            onChange={(e) => e.target.files && addFiles(e.target.files)}
            aria-invalid={displayError ? "true" : undefined}
            aria-describedby={displayError ? errorId : helperText ? helperId : undefined}
            className="sr-only"
          />
          <div className="w-8 h-8 rounded-xl bg-purple-100/40 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            <Upload className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="text-purple-500 dark:text-purple-400 font-medium">Click to add files</span>
            </p>
            {(accept || maxSizeMB) && (
              <p className="text-xs text-gray-400 mt-0.5">
                {accept}{accept && maxSizeMB && " · "}{maxSizeMB && `Max ${maxSizeMB}MB each`}
              </p>
            )}
          </div>
        </div>
      )}

      {currentFiles.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-0.5">
          {currentFiles.map((file, idx) => (
            <li key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 animate-fade-in">
              <FileText className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">{file.name}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{(file.size / 1024).toFixed(1)} KB</span>
              <button type="button" onClick={() => removeFile(idx)} disabled={disabled} className="text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50">
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
