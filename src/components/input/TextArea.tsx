"use client";

import React, { forwardRef, useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  autoResize?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label, helperText, errorMessage, autoResize = true, showCount, maxLength,
      className, id, disabled, value, defaultValue, onFocus, onBlur, onChange, ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = !!errorMessage;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue?.toString() ?? "");
    const currentValue = value !== undefined ? value : internalValue;
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) ?? internalRef;

    useEffect(() => {
      if (autoResize && textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [currentValue, autoResize, textareaRef]);

    const charCount = String(currentValue).length;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
            {label}
            {props.required && <span className="ml-1 text-red-400">*</span>}
          </label>
        )}

        <div className={cn("relative w-full transition-all duration-200 ease-out", isFocused && "scale-[1.005]", hasError && "animate-shake-sm")}>
          <textarea
            ref={textareaRef}
            id={inputId}
            disabled={disabled}
            value={currentValue}
            maxLength={maxLength}
            onChange={(e) => {
              if (value === undefined) setInternalValue(e.target.value);
              onChange?.(e);
            }}
            onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
            rows={3}
            className={cn(
              "w-full rounded-2xl px-4 py-3",
              "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
              "border border-white/20 dark:border-white/10",
              "shadow-lg shadow-black/10",
              "text-gray-800 dark:text-gray-200 text-sm leading-relaxed",
              "placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "caret-purple-400 outline-none resize-none",
              "transition-all duration-200 ease-out",
              "hover:bg-white/80 dark:hover:bg-white/10",
              "focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50 focus:shadow-xl focus:shadow-purple-100/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              autoResize && "overflow-hidden",
              hasError && "border-red-300/60 ring-2 ring-red-300/40 focus:ring-red-300/50",
              className
            )}
            {...props}
          />
          {showCount && maxLength && (
            <span className={cn(
              "absolute bottom-3 right-3 text-[10px] font-medium tabular-nums",
              charCount >= maxLength ? "text-red-400" : charCount >= maxLength * 0.8 ? "text-amber-400" : "text-gray-400 dark:text-gray-500"
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>

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
);

TextArea.displayName = "TextArea";
