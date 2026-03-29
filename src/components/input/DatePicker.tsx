"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isBefore, isAfter, isToday, startOfDay } from "date-fns";

export interface DatePickerProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DatePicker({
  label,
  helperText,
  errorMessage,
  value,
  defaultValue,
  onChange,
  placeholder = "Select date",
  disabled,
  required,
  id,
  className,
  minDate,
  maxDate,
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null);
  const [viewDate, setViewDate] = useState(defaultValue ?? new Date());
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

  const days = eachDayOfInterval({ start: startOfMonth(viewDate), end: endOfMonth(viewDate) });
  const startPad = getDay(startOfMonth(viewDate));

  const handleSelectDay = (day: Date) => {
    if (minDate && isBefore(day, startOfDay(minDate))) return;
    if (maxDate && isAfter(day, startOfDay(maxDate))) return;
    if (value === undefined) setInternalValue(day);
    onChange?.(day);
    setIsOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", isOpen && "relative z-[100]")} ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn("relative w-full transition-all duration-200 ease-out", isOpen && "scale-[1.01]", hasError && "animate-shake-sm")}>
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
            "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
            "border border-white/20 dark:border-white/10",
            "shadow-lg shadow-black/10",
            "transition-all duration-200 ease-out",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isOpen && "ring-2 ring-purple-300/50 border-purple-300/50",
            hasError && "border-red-300/60 ring-2 ring-red-300/40",
            className
          )}
        >
          <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={cn("text-sm flex-1", currentValue ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-600")}>
            {currentValue ? format(currentValue, "MMM dd, yyyy") : placeholder}
          </span>
        </button>

        {isOpen && (
          <div
            role="dialog"
            aria-label="Date picker"
            className="absolute z-50 w-72 mt-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down"
          >
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 dark:hover:bg-purple-900/30 transition-colors text-gray-500 dark:text-gray-400 hover:text-purple-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{format(viewDate, "MMMM yyyy")}</span>
              <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 dark:hover:bg-purple-900/30 transition-colors text-gray-500 dark:text-gray-400 hover:text-purple-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold text-gray-400 dark:text-gray-600 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
              {days.map((day) => {
                const isSelected = currentValue ? isSameDay(day, currentValue) : false;
                const isDisabled = (minDate && isBefore(day, startOfDay(minDate))) || (maxDate && isAfter(day, startOfDay(maxDate)));
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    disabled={!!isDisabled}
                    onClick={() => handleSelectDay(day)}
                    className={cn(
                      "aspect-square rounded-xl text-xs font-medium transition-all duration-150",
                      isSelected
                        ? "bg-purple-400/80 dark:bg-purple-500/70 text-white shadow-md shadow-purple-200/30"
                        : isToday(day)
                        ? "bg-blue-100/60 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-purple-100/40 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300",
                      isDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-700 dark:hover:text-gray-300"
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
            {currentValue && (
              <button type="button" onClick={() => { if (value === undefined) setInternalValue(null); onChange?.(null); setIsOpen(false); }} className="mt-3 w-full text-xs text-gray-400 hover:text-red-400 transition-colors py-1">
                Clear
              </button>
            )}
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
