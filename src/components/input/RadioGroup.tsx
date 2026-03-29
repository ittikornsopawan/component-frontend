"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  direction?: "vertical" | "horizontal";
}

export function RadioGroup({
  label,
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  name,
  id,
  direction = "vertical",
}: RadioGroupProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const groupName = name ?? groupId;
  const helperId = `${groupId}-helper`;
  const errorId = `${groupId}-error`;
  const hasError = !!errorMessage;

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string) => {
    if (value === undefined) setInternalValue(val);
    onChange?.(val);
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

      <div className={cn("flex gap-3", direction === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
        {options.map((opt) => {
          const isSelected = currentValue === opt.value;
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
                  type="radio"
                  name={groupName}
                  value={opt.value}
                  disabled={isDisabled}
                  checked={isSelected}
                  onChange={() => !isDisabled && handleChange(opt.value)}
                  aria-invalid={hasError ? "true" : undefined}
                  className="sr-only"
                />
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  "transition-all duration-200 ease-out",
                  "bg-white/60 dark:bg-white/5 backdrop-blur-sm",
                  isSelected
                    ? "border-purple-400 shadow-md shadow-purple-200/40"
                    : "border-white/40 dark:border-white/20 group-hover:border-purple-300/60",
                  hasError && !isSelected && "border-red-400/60"
                )}>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-fade-in" />
                  )}
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
