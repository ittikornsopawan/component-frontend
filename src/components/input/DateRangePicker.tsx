"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isBefore, isAfter, isToday, startOfDay, isWithinInterval } from "date-fns";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DateRangePicker({
  label, helperText, errorMessage, value, defaultValue, onChange,
  placeholder = "Select date range", disabled, required, id, className,
}: DateRangePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<DateRange>(defaultValue ?? { from: null, to: null });
  const [viewDate, setViewDate] = useState(new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [selecting, setSelecting] = useState<"from" | "to">("from");
  const currentValue = value !== undefined ? value : internalValue;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const days = eachDayOfInterval({ start: startOfMonth(viewDate), end: endOfMonth(viewDate) });
  const startPad = getDay(startOfMonth(viewDate));

  const handleDayClick = (day: Date) => {
    let next: DateRange;
    if (selecting === "from" || (currentValue.from && currentValue.to)) {
      next = { from: day, to: null };
      setSelecting("to");
    } else {
      if (currentValue.from && isBefore(day, currentValue.from)) {
        next = { from: day, to: currentValue.from };
      } else {
        next = { from: currentValue.from, to: day };
      }
      setSelecting("from");
      setIsOpen(false);
    }
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const isInRange = (day: Date) => {
    const { from, to } = currentValue;
    const end = to ?? hoverDate;
    if (!from || !end) return false;
    const rangeStart = isBefore(from, end) ? from : end;
    const rangeEnd = isBefore(from, end) ? end : from;
    return isWithinInterval(day, { start: rangeStart, end: rangeEnd });
  };

  const displayText = () => {
    const { from, to } = currentValue;
    if (!from) return placeholder;
    if (!to) return format(from, "MMM dd, yyyy") + " → …";
    return `${format(from, "MMM dd, yyyy")} → ${format(to, "MMM dd, yyyy")}`;
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
          id={inputId} type="button" disabled={disabled} onClick={() => { setIsOpen((v) => !v); setSelecting("from"); }}
          aria-haspopup="dialog" aria-expanded={isOpen} aria-invalid={hasError ? "true" : undefined}
          aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
          className={cn(
            "w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left",
            "bg-white/60 dark:bg-white/5 backdrop-blur-lg border border-white/20 dark:border-white/10",
            "shadow-lg shadow-black/10 transition-all duration-200 ease-out",
            "hover:bg-white/80 dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isOpen && "ring-2 ring-purple-300/50 border-purple-300/50",
            hasError && "border-red-300/60 ring-2 ring-red-300/40", className
          )}
        >
          <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={cn("text-sm flex-1", currentValue.from ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-600")}>
            {displayText()}
          </span>
          {(currentValue.from || currentValue.to) && (
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
          )}
        </button>

        {isOpen && (
          <div role="dialog" aria-label="Date range picker"
            className="absolute z-50 w-72 mt-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down">
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 dark:hover:bg-purple-900/30 transition-colors text-gray-500 hover:text-purple-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{format(viewDate, "MMMM yyyy")}</span>
              <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 dark:hover:bg-purple-900/30 transition-colors text-gray-500 hover:text-purple-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-[10px] text-purple-500 dark:text-purple-400 mb-2 font-medium">
              {selecting === "from" ? "Select start date" : "Select end date"}
            </p>
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {WEEKDAYS.map((d) => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
              {days.map((day) => {
                const isFrom = currentValue.from ? isSameDay(day, currentValue.from) : false;
                const isTo = currentValue.to ? isSameDay(day, currentValue.to) : false;
                const inRange = isInRange(day);
                return (
                  <button key={day.toISOString()} type="button"
                    onClick={() => handleDayClick(day)}
                    onMouseEnter={() => selecting === "to" && setHoverDate(day)}
                    onMouseLeave={() => setHoverDate(null)}
                    className={cn(
                      "aspect-square rounded-lg text-xs font-medium transition-all duration-100",
                      (isFrom || isTo) ? "bg-purple-400/80 dark:bg-purple-500/70 text-white shadow-sm" : "",
                      inRange && !isFrom && !isTo ? "bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-none" : "",
                      !isFrom && !isTo && !inRange && isToday(day) ? "bg-blue-100/60 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" : "",
                      !isFrom && !isTo && !inRange && !isToday(day) ? "text-gray-700 dark:text-gray-300 hover:bg-purple-100/40 dark:hover:bg-purple-900/30" : ""
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
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
