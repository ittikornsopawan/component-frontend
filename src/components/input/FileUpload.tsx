"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, FileText } from "lucide-react";

export interface FileUploadProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxSizeMB?: number;
}

export function FileUpload({
  label, helperText, errorMessage, value, onChange, accept,
  disabled, required, id, className, maxSizeMB,
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const currentFile = value !== undefined ? value : internalFile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file && maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setSizeError(`File must be under ${maxSizeMB}MB`);
      return;
    }
    setSizeError(null);
    setInternalFile(file);
    onChange?.(file);
  };

  const handleRemove = () => {
    setInternalFile(null);
    setSizeError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
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
        onClick={() => !disabled && inputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-2xl px-4 py-6",
          "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
          "border-2 border-dashed border-white/30 dark:border-white/15",
          "shadow-lg shadow-black/10",
          "transition-all duration-200 ease-out cursor-pointer",
          !disabled && "hover:bg-white/80 dark:hover:bg-white/10 hover:border-purple-300/50",
          displayError && "border-red-300/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={displayError ? "true" : undefined}
          aria-describedby={displayError ? errorId : helperText ? helperId : undefined}
          className="sr-only"
        />
        {currentFile ? (
          <div className="flex items-center gap-3 w-full px-2 animate-fade-in">
            <FileText className="w-8 h-8 text-purple-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{currentFile.name}</p>
              <p className="text-xs text-gray-400">{(currentFile.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); handleRemove(); }}
              className="text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
              aria-label="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-2xl bg-purple-100/40 dark:bg-purple-900/30 flex items-center justify-center">
              <Upload className="w-5 h-5 text-purple-500 dark:text-purple-400" />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              <span className="text-purple-500 dark:text-purple-400 font-medium">Click to upload</span>
              {accept && <span className="block text-xs text-gray-400 mt-0.5">{accept}</span>}
              {maxSizeMB && <span className="block text-xs text-gray-400">Max {maxSizeMB}MB</span>}
            </p>
          </>
        )}
      </div>
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
