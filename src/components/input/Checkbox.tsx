"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  description?: string;
}

export function Checkbox({
  label,
  helperText,
  errorMessage,
  description,
  className,
  id,
  disabled,
  checked,
  defaultChecked,
  onChange,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
  const isChecked = checked !== undefined ? checked : internalChecked;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-3 cursor-pointer group",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            disabled={disabled}
            checked={isChecked}
            onChange={(e) => {
              if (checked === undefined) setInternalChecked(e.target.checked);
              onChange?.(e);
            }}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
            className="sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-lg border-2 flex items-center justify-center",
              "transition-all duration-200 ease-out",
              "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
              isChecked
                ? "bg-purple-400/80 dark:bg-purple-500/60 border-purple-400 shadow-md shadow-purple-200/40 dark:shadow-purple-900/40"
                : "border-white/40 dark:border-white/20 group-hover:border-purple-300/60 dark:group-hover:border-purple-600/60",
              hasError && "border-red-400/60",
              className
            )}
          >
            {isChecked && (
              <Check className="w-3 h-3 text-white animate-fade-in" strokeWidth={3} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{description}</span>
          )}
        </div>
      </label>

      {helperText && !errorMessage && (
        <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed ml-8">{helperText}</p>
      )}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in ml-8">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
