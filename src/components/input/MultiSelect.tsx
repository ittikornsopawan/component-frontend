"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, X } from "lucide-react";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  isLoading?: boolean;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  maxSelected?: number;
}

export function MultiSelect({
  label,
  helperText,
  errorMessage,
  isLoading,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select options",
  disabled,
  required,
  id,
  className,
  maxSelected,
}: MultiSelectProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue ?? []);
  const currentValue = value !== undefined ? value : internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (opt: MultiSelectOption) => {
    if (opt.disabled) return;
    let next: string[];
    if (currentValue.includes(opt.value)) {
      next = currentValue.filter((v) => v !== opt.value);
    } else {
      if (maxSelected && currentValue.length >= maxSelected) return;
      next = [...currentValue, opt.value];
    }
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const removeChip = (val: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = currentValue.filter((v) => v !== val);
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const selectedOptions = options.filter((o) => currentValue.includes(o.value));

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isOpen && "relative z-[100]")} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative w-full transition-all duration-200 ease-out", isOpen && "scale-[1.01]", hasError && "animate-shake-sm")}>
        <div
          id={inputId}
          role="combobox"
          tabIndex={disabled || isLoading ? -1 : 0}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          onClick={() => !(disabled || isLoading) && setIsOpen((v) => !v)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !(disabled || isLoading)) {
              e.preventDefault();
              setIsOpen((v) => !v);
            }
            if (e.key === "Escape") setIsOpen(false);
          }}
          className={cn(
            "w-full min-h-[48px] flex items-center flex-wrap gap-1.5 rounded-2xl px-3 py-2 pr-10 cursor-pointer select-none",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border border-white/20 dark:border-white/10",
            "shadow-lg shadow-black/10",
            "transition-all duration-200 ease-out",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50",
            (disabled || isLoading) && "opacity-50 cursor-not-allowed pointer-events-none",
            isOpen && "ring-2 ring-purple-300/50 border-purple-300/50",
            hasError && "border-red-300/60 ring-2 ring-red-300/40",
            className
          )}
        >
          {selectedOptions.length === 0 ? (
            <span className="text-sm text-gray-400 dark:text-gray-600 py-0.5">{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-xs font-medium bg-purple-100/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30 animate-fade-in"
              >
                {opt.label}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => removeChip(opt.value, e)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") removeChip(opt.value, e as unknown as React.MouseEvent); }}
                  className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors cursor-pointer"
                  aria-label={`Remove ${opt.label}`}
                >
                  <X className="w-3 h-3" />
                </span>
              </span>
            ))
          )}
          <span className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none", isOpen && "rotate-180")}>
            <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </span>
        </div>

        {isOpen && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            className="absolute z-50 w-full mt-2 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down max-h-60 overflow-auto scrollbar-hide"
          >
            {options.map((opt) => {
              const isSelected = currentValue.includes(opt.value);
              const isDisabledByMax = !isSelected && maxSelected !== undefined && currentValue.length >= maxSelected;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !isDisabledByMax && toggleOption(opt)}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all duration-150 mx-1.5 rounded-xl",
                    (opt.disabled || isDisabledByMax) ? "opacity-40 cursor-not-allowed" : "hover:bg-purple-100/40 dark:hover:bg-purple-900/30",
                    isSelected ? "bg-purple-100/50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium" : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {opt.label}
                  {isSelected && <Check className="w-3.5 h-3.5 text-purple-500" />}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {helperText && !errorMessage && (
        <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{helperText}</p>
      )}
      {errorMessage && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
