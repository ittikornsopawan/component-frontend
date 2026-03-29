"use client";

import React, { forwardRef, useId, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "AU" },
  { code: "+81", flag: "🇯🇵", name: "JP" },
  { code: "+49", flag: "🇩🇪", name: "DE" },
  { code: "+33", flag: "🇫🇷", name: "FR" },
  { code: "+86", flag: "🇨🇳", name: "CN" },
  { code: "+91", flag: "🇮🇳", name: "IN" },
  { code: "+55", flag: "🇧🇷", name: "BR" },
  { code: "+65", flag: "🇸🇬", name: "SG" },
  { code: "+66", flag: "🇹🇭", name: "TH" },
  { code: "+84", flag: "🇻🇳", name: "VN" },
  { code: "+62", flag: "🇮🇩", name: "ID" },
  { code: "+60", flag: "🇲🇾", name: "MY" },
  { code: "+63", flag: "🇵🇭", name: "PH" },
];

export interface PhoneInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  countryCode?: string;
  onCountryCodeChange?: (code: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

export function PhoneInput({
  label, helperText, errorMessage, value, defaultValue, onChange,
  countryCode, onCountryCodeChange, placeholder = "000 000 0000",
  disabled, required, id, className,
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [internalCode, setInternalCode] = useState("+1");
  const currentValue = value !== undefined ? value : internalValue;
  const currentCode = countryCode !== undefined ? countryCode : internalCode;
  const selectedCountry = COUNTRY_CODES.find((c) => c.code === currentCode) ?? COUNTRY_CODES[0];

  const handleCodeSelect = (code: string) => {
    if (countryCode === undefined) setInternalCode(code);
    onCountryCodeChange?.(code);
    setIsDropdownOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isDropdownOpen && "relative z-[100]")}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative flex items-center w-full transition-all duration-200 ease-out", isFocused && "scale-[1.01]", hasError && "animate-shake-sm")}>
        {/* Country code picker */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((v) => !v)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 h-full rounded-l-2xl px-3 py-3",
              "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
              "border border-r-0 border-white/20 dark:border-white/10",
              "text-sm text-gray-700 dark:text-gray-300",
              "hover:bg-white/80 dark:hover:bg-white/10",
              "transition-all duration-200 focus:outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              isFocused && "border-purple-300/50",
              hasError && "border-red-300/60"
            )}
          >
            <span>{selectedCountry.flag}</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{currentCode}</span>
            <ChevronDown className={cn("w-3 h-3 text-gray-400 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
          </button>

          {isDropdownOpen && (
            <ul className="absolute z-50 left-0 mt-2 w-40 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl animate-slide-down max-h-48 overflow-auto scrollbar-hide">
              {COUNTRY_CODES.map((c) => (
                <li
                  key={c.code}
                  onClick={() => handleCodeSelect(c.code)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-xs cursor-pointer transition-all duration-150 mx-1 rounded-xl",
                    currentCode === c.code
                      ? "bg-purple-100/50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-purple-100/40 dark:hover:bg-purple-900/30"
                  )}
                >
                  <span>{c.flag}</span>
                  <span className="font-medium">{c.name}</span>
                  <span className="ml-auto text-gray-400">{c.code}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          id={inputId}
          type="tel"
          disabled={disabled}
          value={currentValue}
          onChange={(e) => {
            if (value === undefined) setInternalValue(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={() => { setIsFocused(true); setIsDropdownOpen(false); }}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          className={cn(
            "flex-1 rounded-r-2xl px-4 py-3",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border border-l-0 border-white/20 dark:border-white/10",
            "text-gray-800 dark:text-gray-200 text-sm",
            "placeholder:text-gray-400 dark:placeholder:text-gray-600",
            "caret-purple-400 outline-none",
            "transition-all duration-200 ease-out",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError && "border-red-300/60 focus:ring-red-300/50",
            className
          )}
        />
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
