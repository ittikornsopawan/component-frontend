"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  direction?: "vertical" | "horizontal";
}

export function CheckboxGroup({
  label,
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  id,
  direction = "vertical",
}: CheckboxGroupProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;
  const hasError = !!errorMessage;

  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue ?? []);
  const currentValue = value !== undefined ? value : internalValue;

  const toggle = (optValue: string) => {
    const next = currentValue.includes(optValue)
      ? currentValue.filter((v) => v !== optValue)
      : [...currentValue, optValue];
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <fieldset
      id={groupId}
      aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
      className="flex flex-col gap-2"
    >
      {label && (
        <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </legend>
      )}

      <div className={cn(
        "flex gap-3",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap"
      )}>
        {options.map((opt) => {
          const isChecked = currentValue.includes(opt.value);
          const isDisabled = disabled || opt.disabled;
          const optId = `${groupId}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={cn(
                "flex items-start gap-3 cursor-pointer group",
                isDisabled && "cursor-not-allowed opacity-50"
              )}
            >
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  id={optId}
                  type="checkbox"
                  disabled={isDisabled}
                  checked={isChecked}
                  onChange={() => !isDisabled && toggle(opt.value)}
                  aria-invalid={hasError ? "true" : undefined}
                  className="sr-only"
                />
                <div className={cn(
                  "w-5 h-5 rounded-lg border-2 flex items-center justify-center",
                  "transition-all duration-200 ease-out",
                  "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
                  isChecked
                    ? "bg-purple-400/80 dark:bg-purple-500/60 border-purple-400 shadow-md shadow-purple-200/40"
                    : "border-white/40 dark:border-white/20 group-hover:border-purple-300/60",
                  hasError && !isChecked && "border-red-400/60"
                )}>
                  {isChecked && <Check className="w-3 h-3 text-white animate-fade-in" strokeWidth={3} />}
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{opt.label}</span>
                {opt.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{opt.description}</span>
                )}
              </div>
            </label>
          );
        })}
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
    </fieldset>
  );
}
