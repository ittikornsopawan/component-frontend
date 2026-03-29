"use client";

import React, { useId, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { CalendarClock, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isToday } from "date-fns";

export interface DateTimeValue {
  date: Date | null;
  hours: number;
  minutes: number;
  period: "AM" | "PM";
}

export interface DateTimePickerProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: DateTimeValue;
  defaultValue?: DateTimeValue;
  onChange?: (dt: DateTimeValue) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function DateTimePicker({
  label, helperText, errorMessage, value, defaultValue, onChange,
  placeholder = "Select date & time", disabled, required, id, className,
}: DateTimePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;

  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const defaultDT: DateTimeValue = defaultValue ?? { date: null, hours: 12, minutes: 0, period: "PM" };
  const [internalValue, setInternalValue] = useState<DateTimeValue>(defaultDT);
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

  const update = (partial: Partial<DateTimeValue>) => {
    const next = { ...currentValue, ...partial };
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const stepHour = (dir: 1 | -1) => {
    let h = currentValue.hours + dir;
    if (h > 12) h = 1;
    if (h < 1) h = 12;
    update({ hours: h });
  };
  const stepMinute = (dir: 1 | -1) => {
    let m = currentValue.minutes + dir * 5;
    if (m >= 60) m = 0;
    if (m < 0) m = 55;
    update({ minutes: m });
  };
  const fmt = (n: number) => String(n).padStart(2, "0");

  const displayText = () => {
    if (!currentValue.date) return placeholder;
    return `${format(currentValue.date, "MMM dd, yyyy")} ${fmt(currentValue.hours)}:${fmt(currentValue.minutes)} ${currentValue.period}`;
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
          id={inputId} type="button" disabled={disabled} onClick={() => setIsOpen((v) => !v)}
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
          <CalendarClock className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className={cn("text-sm flex-1", currentValue.date ? "text-gray-800 dark:text-gray-200" : "text-gray-400 dark:text-gray-600")}>
            {displayText()}
          </span>
        </button>

        {isOpen && (
          <div role="dialog" aria-label="Date time picker"
            className="absolute z-50 w-80 mt-2 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 animate-slide-down">
            {/* Calendar */}
            <div className="flex items-center justify-between mb-3">
              <button type="button" onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 transition-colors text-gray-500 hover:text-purple-600">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{format(viewDate, "MMMM yyyy")}</span>
              <button type="button" onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-1.5 rounded-xl hover:bg-purple-100/40 transition-colors text-gray-500 hover:text-purple-600">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {WEEKDAYS.map((d) => <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5 mb-4">
              {Array.from({ length: startPad }).map((_, i) => <div key={`pad-${i}`} />)}
              {days.map((day) => {
                const isSelected = currentValue.date ? isSameDay(day, currentValue.date) : false;
                return (
                  <button key={day.toISOString()} type="button" onClick={() => update({ date: day })}
                    className={cn(
                      "aspect-square rounded-lg text-xs font-medium transition-all duration-100",
                      isSelected ? "bg-purple-400/80 dark:bg-purple-500/70 text-white shadow-sm" :
                      isToday(day) ? "bg-blue-100/60 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" :
                      "text-gray-700 dark:text-gray-300 hover:bg-purple-100/40 dark:hover:bg-purple-900/30"
                    )}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
            {/* Time */}
            <div className="border-t border-white/20 dark:border-white/10 pt-3 flex items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <button type="button" onClick={() => stepHour(1)} className="text-gray-400 hover:text-purple-500 transition-colors p-0.5"><ChevronUp className="w-4 h-4" /></button>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-8 text-center tabular-nums">{fmt(currentValue.hours)}</span>
                <button type="button" onClick={() => stepHour(-1)} className="text-gray-400 hover:text-purple-500 transition-colors p-0.5"><ChevronDown className="w-4 h-4" /></button>
              </div>
              <span className="text-lg font-bold text-gray-400 -mt-0.5">:</span>
              <div className="flex flex-col items-center gap-0.5">
                <button type="button" onClick={() => stepMinute(1)} className="text-gray-400 hover:text-purple-500 transition-colors p-0.5"><ChevronUp className="w-4 h-4" /></button>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-8 text-center tabular-nums">{fmt(currentValue.minutes)}</span>
                <button type="button" onClick={() => stepMinute(-1)} className="text-gray-400 hover:text-purple-500 transition-colors p-0.5"><ChevronDown className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-col gap-1">
                {(["AM", "PM"] as const).map((p) => (
                  <button key={p} type="button" onClick={() => update({ period: p })}
                    className={cn("text-[10px] font-bold px-2 py-0.5 rounded-lg transition-all",
                      currentValue.period === p ? "bg-purple-400/80 text-white" : "text-gray-400 hover:text-purple-500 hover:bg-purple-100/30"
                    )}>
                    {p}
                  </button>
                ))}
              </div>
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
