"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onInputChange?: (input: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export function Combobox({
  label,
  helperText,
  errorMessage,
  options,
  value,
  defaultValue,
  onChange,
  onInputChange,
  placeholder = "Search or select…",
  disabled,
  required,
  id,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((o) => o.value === currentValue);

  const filtered = query === ""
    ? options
    : options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: ComboboxOption) => {
    if (opt.disabled) return;
    if (value === undefined) setInternalValue(opt.value);
    onChange?.(opt.value);
    setQuery("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    onInputChange?.(e.target.value);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isOpen && "relative z-[100]")} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative w-full transition-all duration-200 ease-out", isOpen && "scale-[1.01]", hasError && "animate-shake-sm")}>
        <input
          ref={inputRef}
          id={inputId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          disabled={disabled}
          value={isOpen ? query : (selectedOption?.label ?? "")}
          onChange={handleInputChange}
          onFocus={() => { setIsOpen(true); setQuery(""); }}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full rounded-2xl px-4 py-3 pr-10",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border border-white/20 dark:border-white/10",
            "shadow-lg shadow-black/10",
            "text-gray-800 dark:text-gray-200",
            "placeholder:text-gray-400 dark:placeholder:text-gray-600",
            "caret-purple-400 outline-none",
            "transition-all duration-200 ease-out",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50 focus:shadow-xl focus:shadow-purple-100/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isOpen && "ring-2 ring-purple-300/50 border-purple-300/50",
            hasError && "border-red-300/60 ring-2 ring-red-300/40",
            className
          )}
        />
        <span className={cn("absolute right-3.5 top-1/2 -translate-y-1/2 transition-all duration-200 pointer-events-none", isOpen && "rotate-180")}>
          <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
        </span>

        {isOpen && filtered.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-50 w-full mt-2 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down max-h-60 overflow-auto scrollbar-hide"
          >
            {filtered.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={currentValue === opt.value}
                onClick={() => handleSelect(opt)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all duration-150 mx-1.5 rounded-xl",
                  opt.disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-purple-100/40 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300",
                  currentValue === opt.value ? "bg-purple-100/50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {opt.label}
                {currentValue === opt.value && <Check className="w-3.5 h-3.5 text-purple-500" />}
              </li>
            ))}
          </ul>
        )}
        {isOpen && filtered.length === 0 && (
          <div className="absolute z-50 w-full mt-2 py-4 px-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl animate-slide-down text-sm text-gray-400 dark:text-gray-500 text-center">
            No options found
          </div>
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
