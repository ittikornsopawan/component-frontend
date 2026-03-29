"use client";

import React, { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

export interface TimeValue {
  hours: number;
  minutes: number;
  period?: "AM" | "PM";
}

export interface TimePickerProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: TimeValue;
  defaultValue?: TimeValue;
  onChange?: (time: TimeValue) => void;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  use24Hour?: boolean;
}

export function TimePicker({
  label, helperText, errorMessage, value, defaultValue, onChange,
  disabled, required, id, className, use24Hour = false,
}: TimePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [internalValue, setInternalValue] = useState<TimeValue>(
    defaultValue ?? { hours: 12, minutes: 0, period: "PM" }
  );
  const currentValue = value !== undefined ? value : internalValue;

  const update = (partial: Partial<TimeValue>) => {
    const next = { ...currentValue, ...partial };
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const stepHour = (dir: 1 | -1) => {
    const max = use24Hour ? 23 : 12;
    const min = use24Hour ? 0 : 1;
    let h = currentValue.hours + dir;
    if (h > max) h = min;
    if (h < min) h = max;
    update({ hours: h });
  };

  const stepMinute = (dir: 1 | -1) => {
    let m = currentValue.minutes + dir * 5;
    if (m >= 60) m = 0;
    if (m < 0) m = 55;
    update({ minutes: m });
  };

  const fmt = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div
        id={inputId}
        aria-invalid={hasError ? "true" : undefined}
        aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
        className={cn(
          "inline-flex items-center gap-2 rounded-2xl px-4 py-3",
          "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
          "border border-white/20 dark:border-white/10",
          "shadow-lg shadow-black/10",
          "transition-all duration-200 ease-out",
          hasError && "border-red-300/60 ring-2 ring-red-300/40",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />

        {/* Hours */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => stepHour(1)} disabled={disabled} className="text-gray-400 hover:text-purple-500 transition-colors rounded-lg p-0.5">
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-7 text-center tabular-nums">
            {fmt(currentValue.hours)}
          </span>
          <button type="button" onClick={() => stepHour(-1)} disabled={disabled} className="text-gray-400 hover:text-purple-500 transition-colors rounded-lg p-0.5">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-lg font-bold text-gray-400 dark:text-gray-500 -mt-0.5">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center gap-0.5">
          <button type="button" onClick={() => stepMinute(1)} disabled={disabled} className="text-gray-400 hover:text-purple-500 transition-colors rounded-lg p-0.5">
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-7 text-center tabular-nums">
            {fmt(currentValue.minutes)}
          </span>
          <button type="button" onClick={() => stepMinute(-1)} disabled={disabled} className="text-gray-400 hover:text-purple-500 transition-colors rounded-lg p-0.5">
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {!use24Hour && (
          <div className="flex flex-col gap-1 ml-1">
            {(["AM", "PM"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => update({ period: p })}
                disabled={disabled}
                className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-lg transition-all duration-150",
                  currentValue.period === p
                    ? "bg-purple-400/80 text-white shadow-sm"
                    : "text-gray-400 hover:text-purple-500 hover:bg-purple-100/30 dark:hover:bg-purple-900/30"
                )}
              >
                {p}
              </button>
            ))}
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
