"use client";

import React, { useId, useState, useRef, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface TagInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
}

export function TagInput({
  label, helperText, errorMessage, value, defaultValue, onChange,
  placeholder = "Add a tag…", disabled, required, id, className, maxTags, allowDuplicates = false,
}: TagInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [internalTags, setInternalTags] = useState<string[]>(defaultValue ?? []);
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentTags = value !== undefined ? value : internalTags;

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (!allowDuplicates && currentTags.includes(tag)) { setInput(""); return; }
    if (maxTags && currentTags.length >= maxTags) return;
    const next = [...currentTags, tag];
    if (value === undefined) setInternalTags(next);
    onChange?.(next);
    setInput("");
  };

  const removeTag = (idx: number) => {
    const next = currentTags.filter((_, i) => i !== idx);
    if (value === undefined) setInternalTags(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && input === "" && currentTags.length > 0) {
      removeTag(currentTags.length - 1);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-2xl px-3 py-2.5 min-h-[48px]",
          "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
          "border border-white/20 dark:border-white/10",
          "shadow-lg shadow-black/10 cursor-text",
          "transition-all duration-200 ease-out",
          "hover:bg-white/80 dark:hover:bg-white/10",
          isFocused && "ring-2 ring-purple-300/50 border-purple-300/50 shadow-xl shadow-purple-100/20 scale-[1.005]",
          hasError && "border-red-300/60 ring-2 ring-red-300/40",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        {currentTags.map((tag, idx) => (
          <span
            key={idx}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-xs font-medium bg-purple-100/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30 animate-fade-in"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(idx); }}
                className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setIsFocused(false); addTag(input); }}
          disabled={disabled || (maxTags !== undefined && currentTags.length >= maxTags)}
          placeholder={currentTags.length === 0 ? placeholder : ""}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-600 caret-purple-400 py-0.5"
        />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-600">Press Enter or comma to add a tag</p>

      {helperText && !errorMessage && (
        <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helperText}</p>
      )}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
