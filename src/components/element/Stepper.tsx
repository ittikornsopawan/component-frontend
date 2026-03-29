"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export type StepperVariant = "horizontal" | "vertical";
export type StepState = "completed" | "active" | "pending";

export interface StepperProps {
  steps: string[];
  currentStep: number;
  variant?: StepperVariant;
  onStepClick?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, variant = "horizontal", onStepClick, className }: StepperProps) {
  const getState = (i: number): StepState => {
    if (i < currentStep) return "completed";
    if (i === currentStep) return "active";
    return "pending";
  };

  if (variant === "vertical") {
    return (
      <ol className={cn("flex flex-col gap-0", className)}>
        {steps.map((step, i) => {
          const state = getState(i);
          const isLast = i === steps.length - 1;
          const clickable = state === "completed" && !!onStepClick;
          return (
            <li key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={clickable ? () => onStepClick(i) : undefined}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 flex-shrink-0 z-10",
                    state === "completed" && "bg-purple-400 text-white",
                    state === "active" && "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 ring-2 ring-purple-300/60 dark:ring-purple-500/40 shadow-sm",
                    state === "pending" && "bg-white/40 dark:bg-white/8 text-gray-400 dark:text-gray-600 border border-white/30",
                    clickable && "cursor-pointer hover:scale-105"
                  )}
                  aria-current={state === "active" ? "step" : undefined}
                >
                  {state === "completed" ? <Check className="w-4 h-4" /> : i + 1}
                </button>
                {!isLast && (
                  <div className={cn(
                    "w-0.5 flex-1 min-h-[24px] mt-1 mb-1 rounded-full transition-colors duration-300",
                    state === "completed" ? "bg-purple-300/60 dark:bg-purple-600/40" : "bg-white/20 dark:bg-white/10"
                  )} />
                )}
              </div>
              <div className={cn("pb-6 pt-1", isLast && "pb-0")}>
                <span className={cn(
                  "text-sm font-medium leading-snug",
                  state === "active" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                )}>
                  {step}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("flex items-center w-full", className)}>
      {steps.map((step, i) => {
        const state = getState(i);
        const isLast = i === steps.length - 1;
        const clickable = state === "completed" && !!onStepClick;
        return (
          <li key={i} className={cn("flex items-center", !isLast && "flex-1")}>
            <div className="flex flex-col items-center gap-1.5">
              <button
                type="button"
                disabled={!clickable}
                onClick={clickable ? () => onStepClick(i) : undefined}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 flex-shrink-0",
                  state === "completed" && "bg-purple-400 text-white",
                  state === "active" && "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 ring-2 ring-purple-300/60 dark:ring-purple-500/40 shadow-sm",
                  state === "pending" && "bg-white/40 dark:bg-white/8 text-gray-400 dark:text-gray-600 border border-white/30",
                  clickable && "cursor-pointer hover:scale-105"
                )}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "completed" ? <Check className="w-4 h-4" /> : i + 1}
              </button>
              <span className={cn(
                "text-xs font-medium whitespace-nowrap",
                state === "active" ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
              )}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div className={cn(
                "flex-1 h-0.5 mx-3 mb-5 rounded-full transition-colors duration-300",
                state === "completed" ? "bg-purple-300/60 dark:bg-purple-600/40" : "bg-white/20 dark:bg-white/10"
              )} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
