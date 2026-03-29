"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { Portal } from "./utility/Portal";
import { zIndex, surface } from "./base/tokens";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "bottom-right" | "bottom-center" | "top-center";

export interface ToastItem {
  id: string;
  variant?: ToastVariant;
  title: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextValue {
  show: (options: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

// ─── Variant config ───────────────────────────────────────────────────────────

const variantConfig: Record<ToastVariant, { icon: React.ReactNode; bar: string; glow: string }> = {
  info:    { icon: <Info className="w-5 h-5 text-blue-500" />,             bar: "bg-blue-400",    glow: "shadow-blue-100/30 dark:shadow-blue-900/20" },
  success: { icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,  bar: "bg-emerald-400", glow: "shadow-emerald-100/30 dark:shadow-emerald-900/20" },
  warning: { icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,   bar: "bg-amber-400",   glow: "shadow-amber-100/30 dark:shadow-amber-900/20" },
  error:   { icon: <XCircle className="w-5 h-5 text-red-500" />,           bar: "bg-red-400",     glow: "shadow-red-100/30 dark:shadow-red-900/20" },
};

// ─── Single Toast ─────────────────────────────────────────────────────────────

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 4000;
  const cfg = variantConfig[toast.variant ?? "info"];
  const startRef = useRef<number>(Date.now());
  const remainRef = useRef<number>(duration);

  useEffect(() => {
    if (paused) return;
    startRef.current = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / remainRef.current) * 100);
      setProgress(pct);
      if (pct <= 0) { clearInterval(tick); onDismiss(); }
    }, 30);
    return () => clearInterval(tick);
  }, [paused, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      onMouseEnter={() => { remainRef.current = (progress / 100) * duration; setPaused(true); }}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "relative flex gap-3 min-w-[320px] max-w-[400px] rounded-2xl px-4 py-3.5 overflow-hidden animate-slide-down",
        surface.overlay,
        "shadow-2xl",
        cfg.glow
      )}
    >
      <span className="flex-shrink-0 mt-0.5">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{toast.description}</p>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={() => { toast.action!.onClick(); onDismiss(); }}
            className="mt-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="flex-shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity p-0.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5">
        <div className={cn("h-full transition-none", cfg.bar)} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

// ─── Toast Container (portal-rendered) ───────────────────────────────────────

const positionStyles: Record<ToastPosition, string> = {
  "top-right":     "top-4 right-4 items-end",
  "bottom-right":  "bottom-4 right-4 items-end",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
};

function ToastContainer({ toasts, position, onDismiss }: {
  toasts: ToastItem[];
  position: ToastPosition;
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;
  return (
    <Portal>
      <div
        aria-label="Notifications"
        className={cn(
          "fixed flex flex-col gap-2 pointer-events-none [&>*]:pointer-events-auto",
          zIndex.toast,
          positionStyles[position]
        )}
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={() => onDismiss(t.id)} />
        ))}
      </div>
    </Portal>
  );
}

// ─── ToastProvider ────────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxVisible?: number;
}

export function ToastProvider({ children, position = "bottom-right", maxVisible = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((opts: Omit<ToastItem, "id">): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev.slice(-(maxVisible - 1)), { ...opts, id }]);
    return id;
  }, [maxVisible]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      <ToastContainer toasts={toasts} position={position} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}
