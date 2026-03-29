"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const PRESET_COLORS = [
  "#a78bfa", "#818cf8", "#60a5fa", "#34d399", "#fbbf24",
  "#f87171", "#fb7185", "#c084fc", "#38bdf8", "#4ade80",
  "#e879f9", "#f472b6", "#94a3b8", "#1e293b", "#ffffff",
];

export interface ColorPickerProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  showPresets?: boolean;
}

export function ColorPicker({
  label, helperText, errorMessage, value, defaultValue, onChange,
  disabled, required, id, className, showPresets = true,
}: ColorPickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "#a78bfa");
  const [hexInput, setHexInput] = useState(defaultValue ?? "#a78bfa");
  const currentValue = value !== undefined ? value : internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHexInput(currentValue);
  }, [currentValue]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const update = (v: string) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
    setHexInput(v);
  };

  const handleHexInput = (raw: string) => {
    setHexInput(raw);
    if (/^#[0-9A-Fa-f]{6}$/.test(raw)) update(raw);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isOpen && "relative z-[100]")} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative w-full", className)}>
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((v) => !v)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-2xl px-4 py-3",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border border-white/20 dark:border-white/10",
            "shadow-lg shadow-black/10 transition-all duration-200",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-purple-300/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isOpen && "ring-2 ring-purple-300/50 border-purple-300/50 scale-[1.01]",
            hasError && "border-red-300/60 ring-2 ring-red-300/40"
          )}
        >
          <span
            className="w-6 h-6 rounded-lg border border-white/30 flex-shrink-0 shadow-sm transition-all duration-200"
            style={{ backgroundColor: currentValue }}
          />
          <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{currentValue}</span>
        </button>

        {isOpen && (
          <div
            role="dialog"
            aria-label="Color picker"
            className="absolute z-50 w-64 mt-2 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl animate-slide-down"
          >
            {/* Native color wheel */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white/30 shadow-md flex-shrink-0">
                <input
                  type="color"
                  value={currentValue}
                  onChange={(e) => update(e.target.value)}
                  className="absolute inset-0 w-[200%] h-[200%] -top-1/2 -left-1/2 cursor-pointer opacity-0 z-10"
                />
                <span className="block w-full h-full" style={{ backgroundColor: currentValue }} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexInput(e.target.value)}
                  maxLength={7}
                  placeholder="#000000"
                  className="w-full rounded-xl px-3 py-1.5 text-sm font-mono bg-white/60 dark:bg-white/10 border border-white/20 dark:border-white/10 text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-purple-300/50 transition-all"
                />
              </div>
            </div>

            {showPresets && (
              <>
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Presets</p>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => update(color)}
                      className={cn(
                        "w-9 h-9 rounded-xl border-2 transition-all duration-150 hover:scale-110 hover:shadow-md",
                        currentValue === color
                          ? "border-purple-400 scale-110 shadow-md"
                          : "border-white/30 dark:border-white/10"
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
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
