"use client";

import React, { useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  showValue?: boolean;
  formatValue?: (v: number) => string;
}

export function Slider({
  label, helperText, errorMessage, value, defaultValue, onChange,
  min = 0, max = 100, step = 1, disabled, required, id, className,
  showValue = true, formatValue,
}: SliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const [internalValue, setInternalValue] = useState(defaultValue ?? min);
  const currentValue = value !== undefined ? value : internalValue;
  const pct = ((currentValue - min) / (max - min)) * 100;
  const display = formatValue ? formatValue(currentValue) : String(currentValue);

  const update = (v: number) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
              {label}{required && <span className="ml-1 text-red-400">*</span>}
            </label>
          )}
          {showValue && (
            <span className="text-sm font-semibold tabular-nums text-purple-600 dark:text-purple-400 min-w-[2.5rem] text-right">
              {display}
            </span>
          )}
        </div>
      )}

      <div className={cn("relative flex items-center w-full h-5", className)}>
        {/* Track */}
        <div className="absolute w-full h-2 rounded-full bg-white/40 dark:bg-white/10 border border-white/20 dark:border-white/10 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-400/80 to-blue-400/60 transition-all duration-150"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          disabled={disabled}
          onChange={(e) => update(Number(e.target.value))}
          aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          className={cn(
            "relative w-full h-2 appearance-none bg-transparent cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-400",
            "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-300/40",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:hover:shadow-purple-300/60",
            "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-400",
            "focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            hasError && "[&::-webkit-slider-thumb]:border-red-400"
          )}
        />
      </div>

      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-600 font-medium">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
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

export interface RangeSliderProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  id?: string;
  className?: string;
  formatValue?: (v: number) => string;
}

export function RangeSlider({
  label, helperText, errorMessage, value, defaultValue, onChange,
  min = 0, max = 100, step = 1, disabled, id, className, formatValue,
}: RangeSliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const [internalValue, setInternalValue] = useState<[number, number]>(defaultValue ?? [min, max]);
  const [low, high] = value !== undefined ? value : internalValue;
  const lowPct = ((low - min) / (max - min)) * 100;
  const highPct = ((high - min) / (max - min)) * 100;

  const updateLow = (v: number) => {
    const next: [number, number] = [Math.min(v, high - step), high];
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };
  const updateHigh = (v: number) => {
    const next: [number, number] = [low, Math.max(v, low + step)];
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const fmt = (v: number) => formatValue ? formatValue(v) : String(v);

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">{label}</label>
          <span className="text-sm font-semibold tabular-nums text-purple-600 dark:text-purple-400">
            {fmt(low)} – {fmt(high)}
          </span>
        </div>
      )}

      <div className={cn("relative flex items-center w-full h-6", className)}>
        <div className="absolute w-full h-2 rounded-full bg-white/40 dark:bg-white/10 border border-white/20 dark:border-white/10 overflow-hidden shadow-inner">
          <div
            className="absolute h-full bg-gradient-to-r from-purple-400/80 to-blue-400/60 transition-all duration-150"
            style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
          />
        </div>
        {/* Low handle — pointer-events-none on track, pointer-events-auto on thumb only.
            z-10 when low is pushed to the far right so it stays grabbable. */}
        <input type="range" min={min} max={max} step={step} value={low} disabled={disabled}
          onChange={(e) => updateLow(Number(e.target.value))}
          className={cn(
            "absolute w-full h-2 appearance-none bg-transparent pointer-events-none",
            low >= high - step ? "z-10" : "z-[3]",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-400",
            "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-purple-300/40",
            "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:hover:scale-125",
            "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-purple-400",
            "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer",
            "focus:outline-none disabled:opacity-50"
          )}
        />
        {/* High handle */}
        <input type="range" min={min} max={max} step={step} value={high} disabled={disabled}
          onChange={(e) => updateHigh(Number(e.target.value))}
          className={cn(
            "absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-[4]",
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5",
            "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-400",
            "[&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-blue-300/40",
            "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150",
            "[&::-webkit-slider-thumb]:hover:scale-125",
            "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-400",
            "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:cursor-pointer",
            "focus:outline-none disabled:opacity-50"
          )}
        />
      </div>

      <div className="flex justify-between text-[10px] text-gray-400 dark:text-gray-600 font-medium">
        <span>{fmt(min)}</span><span>{fmt(max)}</span>
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
