"use client";

import React, { useId, useRef, useState, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";

export interface OTPInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  type?: "numeric" | "alphanumeric";
}

export function OTPInput({
  label, helperText, errorMessage, length = 6, value, onChange,
  disabled, required, id, className, type = "numeric",
}: OTPInputProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;
  const hasError = !!errorMessage;

  const [internalValue, setInternalValue] = useState(value ?? "");
  const currentValue = (value !== undefined ? value : internalValue).slice(0, length);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (v: string) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const handleChange = (idx: number, char: string) => {
    const isValid = type === "numeric" ? /^\d$/.test(char) : /^[a-zA-Z0-9]$/.test(char);
    if (!isValid && char !== "") return;
    const arr = currentValue.split("").concat(Array(length).fill("")).slice(0, length);
    arr[idx] = char.toUpperCase();
    const next = arr.join("").trimEnd();
    update(next);
    if (char && idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (currentValue[idx]) {
        const arr = currentValue.split("").concat(Array(length).fill("")).slice(0, length);
        arr[idx] = "";
        update(arr.join("").trimEnd());
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && idx > 0) inputRefs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1) inputRefs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, length);
    const filtered = type === "numeric"
      ? pasted.replace(/\D/g, "")
      : pasted.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    update(filtered);
    const nextFocus = Math.min(filtered.length, length - 1);
    inputRefs.current[nextFocus]?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div
        role="group"
        aria-label={label ?? "OTP input"}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
        className={cn("flex items-center gap-2", className)}
      >
        {Array.from({ length }).map((_, idx) => {
          const char = currentValue[idx] ?? "";
          const isFilled = char !== "";
          return (
            <input
              key={idx}
              ref={(el) => { inputRefs.current[idx] = el; }}
              type={type === "numeric" ? "tel" : "text"}
              inputMode={type === "numeric" ? "numeric" : "text"}
              maxLength={1}
              value={char}
              disabled={disabled}
              onChange={(e) => handleChange(idx, e.target.value.slice(-1))}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              aria-label={`OTP digit ${idx + 1}`}
              className={cn(
                "w-10 h-12 text-center text-lg font-bold tabular-nums rounded-2xl",
                "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
                "border-2 transition-all duration-200 ease-out outline-none",
                "text-gray-800 dark:text-gray-200 caret-purple-400",
                isFilled
                  ? "border-purple-400/70 bg-purple-50/40 dark:bg-purple-900/20 shadow-md shadow-purple-200/20"
                  : "border-white/30 dark:border-white/15",
                "hover:border-purple-300/50",
                "focus:ring-2 focus:ring-purple-300/50 focus:border-purple-400/70 focus:scale-110 focus:shadow-lg focus:shadow-purple-100/30",
                hasError && "border-red-300/60 focus:ring-red-300/50",
                disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
            />
          );
        })}
      </div>

      {helperText && !errorMessage && <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
