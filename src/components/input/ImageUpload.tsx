"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon, X, Upload } from "lucide-react";

export interface ImageUploadProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxSizeMB?: number;
  aspectRatio?: "square" | "video" | "free";
}

export function ImageUpload({
  label, helperText, errorMessage, value, onChange,
  disabled, required, id, className, maxSizeMB, aspectRatio = "free",
}: ImageUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const currentFile = value !== undefined ? value : internalFile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setSizeError(`Image must be under ${maxSizeMB}MB`);
      return;
    }
    setSizeError(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    if (value === undefined) setInternalFile(file);
    onChange?.(file);
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setInternalFile(null);
    setSizeError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    free: "min-h-[160px]",
  }[aspectRatio];

  const displayError = errorMessage || sizeError;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div
        onClick={() => !disabled && !currentFile && inputRef.current?.click()}
        className={cn(
          "relative overflow-hidden rounded-2xl w-full",
          aspectClass,
          "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
          "border-2 border-dashed border-white/30 dark:border-white/15",
          "shadow-lg shadow-black/10 transition-all duration-200",
          !disabled && !currentFile && "cursor-pointer hover:border-purple-300/60 hover:bg-white/80 dark:hover:bg-white/10",
          displayError && "border-red-300/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          disabled={disabled}
          onChange={handleChange}
          aria-invalid={displayError ? "true" : undefined}
          aria-describedby={displayError ? errorId : helperText ? helperId : undefined}
          className="sr-only"
        />

        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-medium hover:bg-white/30 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" /> Replace
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-400/30 backdrop-blur-md text-white text-xs font-medium hover:bg-red-400/50 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 h-full p-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-100/40 dark:bg-purple-900/30 flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-purple-500 dark:text-purple-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-purple-500 dark:text-purple-400">Click to upload</span> an image
              </p>
              {maxSizeMB && <p className="text-xs text-gray-400 mt-0.5">Max {maxSizeMB}MB · PNG, JPG, WEBP</p>}
            </div>
          </div>
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
