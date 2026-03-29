"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface ToggleProps {
  label?: string;
  description?: string;
  helperText?: string;
  errorMessage?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  size?: "sm" | "md" | "lg";
  name?: string;
}

export function Toggle({
  label,
  description,
  helperText,
  errorMessage,
  checked,
  defaultChecked,
  onChange,
  disabled,
  required,
  id,
  size = "md",
  name,
}: ToggleProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const sizeMap = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
    md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
    lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
  };
  const s = sizeMap[size];

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-center gap-3 cursor-pointer group",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative flex-shrink-0">
          <input
            id={inputId}
            name={name}
            type="checkbox"
            role="switch"
            aria-checked={isChecked}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
            disabled={disabled}
            checked={isChecked}
            onChange={toggle}
            required={required}
            className="sr-only"
          />
          <div
            className={cn(
              "relative inline-flex items-center rounded-full p-0.5 cursor-pointer",
              "transition-all duration-300 ease-out",
              "backdrop-blur-sm border",
              isChecked
                ? "bg-purple-400/80 dark:bg-purple-500/70 border-purple-400/50 shadow-md shadow-purple-300/30 dark:shadow-purple-900/40"
                : "bg-white/40 dark:bg-white/10 border-white/30 dark:border-white/10 group-hover:bg-white/60 dark:group-hover:bg-white/15",
              hasError && "border-red-400/60",
              s.track
            )}
          >
            <span
              className={cn(
                "inline-block rounded-full shadow-sm",
                "transition-all duration-300 ease-out",
                isChecked
                  ? "bg-white " + s.translate
                  : "bg-white/80 translate-x-0",
                s.thumb
              )}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}{required && <span className="ml-1 text-red-400">*</span>}
              </span>
            )}
            {description && (
              <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</span>
            )}
          </div>
        )}
      </label>

      {helperText && !errorMessage && (
        <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed ml-14">{helperText}</p>
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
