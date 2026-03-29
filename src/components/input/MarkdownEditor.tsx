"use client";

import React, { useId, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Bold, Italic, Link, List, Code, Eye, Edit3 } from "lucide-react";

export interface MarkdownEditorProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  minRows?: number;
}

const TOOLBAR = [
  { icon: Bold, label: "Bold", wrap: ["**", "**"] },
  { icon: Italic, label: "Italic", wrap: ["_", "_"] },
  { icon: Code, label: "Code", wrap: ["`", "`"] },
  { icon: Link, label: "Link", wrap: ["[", "](url)"] },
  { icon: List, label: "List", prefix: "- " },
];

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-mono">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-500 underline" target="_blank">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="list-disc ml-4 text-sm">$1</li>')
    .replace(/\n/g, "<br/>");
}

export function MarkdownEditor({
  label, helperText, errorMessage, value, defaultValue, onChange,
  placeholder = "Write markdown here…", disabled, required, id, className, minRows = 6,
}: MarkdownEditorProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const hasError = !!errorMessage;
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value !== undefined ? value : internalValue;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const update = (v: string) => {
    if (value === undefined) setInternalValue(v);
    onChange?.(v);
  };

  const applyFormat = (tool: typeof TOOLBAR[0]) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = currentValue.slice(start, end);
    let next: string;
    if (tool.prefix) {
      next = currentValue.slice(0, start) + tool.prefix + selected + currentValue.slice(end);
    } else {
      const [open, close] = tool.wrap!;
      next = currentValue.slice(0, start) + open + selected + close + currentValue.slice(end);
    }
    update(next);
    setTimeout(() => {
      el.focus();
      const pos = start + (tool.prefix ? tool.prefix.length : tool.wrap![0].length);
      el.setSelectionRange(pos, pos + selected.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700 dark:text-gray-300 select-none">
          {label}{required && <span className="ml-1 text-red-400">*</span>}
        </label>
      )}

      <div className={cn(
        "rounded-2xl overflow-hidden transition-all duration-200 ease-out",
        "bg-white/60 dark:bg-white/5 backdrop-blur-lg",
        "border border-white/20 dark:border-white/10",
        "shadow-lg shadow-black/10",
        isFocused && mode === "write" && "ring-2 ring-purple-300/50 border-purple-300/50 shadow-xl shadow-purple-100/20",
        hasError && "border-red-300/60 ring-2 ring-red-300/40",
        disabled && "opacity-50 pointer-events-none",
        className
      )}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5">
          <div className="flex items-center gap-0.5">
            {TOOLBAR.map((tool) => (
              <button
                key={tool.label}
                type="button"
                onClick={() => applyFormat(tool)}
                disabled={disabled || mode === "preview"}
                title={tool.label}
                className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100/40 dark:hover:bg-purple-900/30 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label={tool.label}
              >
                <tool.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150",
                mode === "write"
                  ? "bg-purple-100/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50/30"
              )}
            >
              <Edit3 className="w-3 h-3" /> Write
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-150",
                mode === "preview"
                  ? "bg-purple-100/60 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                  : "text-gray-500 hover:text-purple-600 hover:bg-purple-50/30"
              )}
            >
              <Eye className="w-3 h-3" /> Preview
            </button>
          </div>
        </div>

        {mode === "write" ? (
          <textarea
            ref={textareaRef}
            id={inputId}
            value={currentValue}
            onChange={(e) => update(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            rows={minRows}
            aria-invalid={hasError ? "true" : undefined}
            aria-describedby={errorMessage ? errorId : helperText ? helperId : undefined}
            className="w-full px-4 py-3 bg-transparent text-gray-800 dark:text-gray-200 text-sm leading-relaxed placeholder:text-gray-400 dark:placeholder:text-gray-600 caret-purple-400 outline-none resize-none font-mono"
          />
        ) : (
          <div
            className="w-full px-4 py-3 text-sm text-gray-800 dark:text-gray-200 leading-relaxed min-h-[120px] prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentValue ? renderMarkdown(currentValue) : `<span class="text-gray-400">Nothing to preview</span>` }}
          />
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
