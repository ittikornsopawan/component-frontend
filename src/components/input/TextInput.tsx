"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { InputIcon } from "./core/InputIcon";
import { InputSpinner } from "./core/InputSpinner";

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isLoading?: boolean;
  floatingLabel?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      prefixIcon,
      suffixIcon,
      isLoading,
      floatingLabel,
      className,
      id,
      disabled,
      value,
      defaultValue,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = !!errorMessage;

    const [isFocused, setIsFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const controlledValue = value !== undefined ? value : internalValue;
    const hasValue = String(controlledValue).length > 0;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && !floatingLabel && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none"
          >
            {label}
            {props.required && <span className="ml-1 text-red-400">*</span>}
          </label>
        )}

        <div
          className={cn(
            "relative flex items-center w-full transition-all duration-200 ease-out",
            isFocused && "scale-[1.01]",
            hasError && "animate-shake-sm"
          )}
        >
          {floatingLabel && label && (
            <label
              htmlFor={inputId}
              className={cn(
                "absolute left-4 pointer-events-none select-none z-10",
                "transition-all duration-200 ease-out",
                isFocused || hasValue
                  ? "top-1.5 text-[10px] font-semibold tracking-wide"
                  : "top-1/2 -translate-y-1/2 text-sm",
                isFocused && !hasError && "text-purple-500 dark:text-purple-400",
                hasError && "text-red-400",
                !isFocused && !hasError && "text-gray-400 dark:text-gray-500"
              )}
            >
              {label}
              {props.required && <span className="ml-0.5 text-red-400">*</span>}
            </label>
          )}

          {prefixIcon && (
            <InputIcon position="left" className={prefixIcon ? "left-3.5" : ""}>
              {prefixIcon}
            </InputIcon>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled || isLoading}
            value={value !== undefined ? value : internalValue}
            onChange={(e) => {
              if (value === undefined) setInternalValue(e.target.value);
              props.onChange?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={
              errorMessage ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full rounded-2xl px-4 py-3",
              "bg-white/60 dark:bg-white/5",
              "backdrop-blur-lg",
              "border border-white/20 dark:border-white/10",
              "shadow-lg shadow-black/10",
              "text-gray-800 dark:text-gray-200",
              "placeholder:text-gray-400 dark:placeholder:text-gray-600",
              "caret-purple-400 outline-none",
              "transition-all duration-200 ease-out",
              "hover:bg-white/80 dark:hover:bg-white/10",
              "focus:ring-2 focus:ring-purple-300/50 focus:border-purple-300/50 focus:shadow-xl focus:shadow-purple-100/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              hasError &&
                "border-red-300/60 ring-2 ring-red-300/40 focus:ring-red-300/50",
              prefixIcon && "pl-10",
              (suffixIcon || isLoading) && "pr-10",
              floatingLabel && label && (isFocused || hasValue) && "pt-6 pb-2",
              className
            )}
            {...props}
          />

          {isLoading ? (
            <InputIcon position="right">
              <InputSpinner />
            </InputIcon>
          ) : suffixIcon ? (
            <InputIcon position="right">{suffixIcon}</InputIcon>
          ) : null}
        </div>

        {helperText && !errorMessage && (
          <p id={helperId} className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400 animate-fade-in">
            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
