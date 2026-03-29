"use client";

import React, { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Camera, X, User } from "lucide-react";

export interface AvatarUploadProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  size?: "sm" | "md" | "lg";
  initialSrc?: string;
  name?: string;
}

export function AvatarUpload({
  label, helperText, errorMessage, value, onChange,
  disabled, required, id, size = "md", initialSrc, name,
}: AvatarUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialSrc ?? null);
  const currentFile = value !== undefined ? value : internalFile;

  const sizeMap = { sm: "w-16 h-16", md: "w-24 h-24", lg: "w-32 h-32" };
  const iconMap = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10" };
  const cameraMap = { sm: "w-5 h-5 bottom-0 right-0", md: "w-7 h-7 bottom-0 right-0", lg: "w-8 h-8 bottom-0 right-0" };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    if (value === undefined) setInternalFile(file);
    onChange?.(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (preview && preview !== initialSrc) URL.revokeObjectURL(preview);
    setPreview(null);
    setInternalFile(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}
      <div className="relative group">
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className={cn(
            "relative rounded-full overflow-hidden cursor-pointer",
            "bg-white/60 dark:bg-white/10 backdrop-blur-lg",
            "border-2 border-white/30 dark:border-white/15",
            "shadow-xl shadow-black/10 transition-all duration-200",
            "group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-300/50",
            hasError && "border-red-300/50",
            disabled && "opacity-50 cursor-not-allowed group-hover:scale-100",
            sizeMap[size]
          )}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/*"
            disabled={disabled}
            onChange={handleChange}
            name={name}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
            className="sr-only"
          />
          {preview ? (
            <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100/60 to-blue-100/60 dark:from-purple-900/30 dark:to-blue-900/30">
              <User className={cn("text-purple-400 dark:text-purple-500", iconMap[size])} />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
            <Camera className={cn("text-white", iconMap[size])} />
          </div>
        </div>

        {(currentFile || (preview && preview !== initialSrc)) && !disabled && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-400/80 text-white flex items-center justify-center hover:bg-red-500 transition-colors shadow-md animate-fade-in"
            aria-label="Remove avatar"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {helperText && !errorMessage && <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 text-center">{helperText}</p>}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
