"use client";

import React, { useId, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Search, Check } from "lucide-react";
import { InputSpinner } from "./core/InputSpinner";

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options?: AutocompleteOption[];
  onSearch?: (query: string) => Promise<AutocompleteOption[]>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  debounceMs?: number;
}

export function Autocomplete({
  label,
  helperText,
  errorMessage,
  options: staticOptions,
  onSearch,
  value,
  onChange,
  placeholder = "Search…",
  disabled,
  required,
  id,
  className,
  debounceMs = 300,
}: AutocompleteProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value ?? "");
  const [options, setOptions] = useState<AutocompleteOption[]>(staticOptions ?? []);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (staticOptions) setOptions(staticOptions);
  }, [staticOptions]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = useCallback(async (q: string) => {
    setQuery(q);
    setIsOpen(true);
    if (!onSearch) {
      const filtered = (staticOptions ?? []).filter((o) =>
        o.label.toLowerCase().includes(q.toLowerCase())
      );
      setOptions(filtered);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await onSearch(q);
        setOptions(results);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);
  }, [onSearch, staticOptions, debounceMs]);

  const handleSelect = (opt: AutocompleteOption) => {
    setQuery(opt.label);
    onChange?.(opt.value);
    setIsOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isOpen && "relative z-[100]")} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative w-full transition-all duration-200 ease-out", isFocused && "scale-[1.01]", hasError && "animate-shake-sm")}>
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10 pointer-events-none">
          {isLoading ? <InputSpinner /> : <Search className="w-4 h-4" />}
        </span>
        <input
          id={inputId}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          disabled={disabled}
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => { setIsFocused(true); setIsOpen(true); }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full rounded-2xl pl-10 pr-4 py-3",
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
            hasError && "border-red-300/60 ring-2 ring-red-300/40",
            className
          )}
        />

        {isOpen && options.length > 0 && (
          <ul role="listbox" className="absolute z-50 w-full mt-2 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down max-h-60 overflow-auto scrollbar-hide">
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={value === opt.value}
                onClick={() => handleSelect(opt)}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-all duration-150 mx-1.5 rounded-xl",
                  "hover:bg-purple-100/40 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300",
                  value === opt.value ? "bg-purple-100/50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-medium" : "text-gray-700 dark:text-gray-300"
                )}
              >
                {opt.label}
                {value === opt.value && <Check className="w-3.5 h-3.5 text-purple-500" />}
              </li>
            ))}
          </ul>
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
