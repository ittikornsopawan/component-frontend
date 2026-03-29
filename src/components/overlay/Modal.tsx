"use client";

import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, AlertTriangle, Trash2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useScrollLock } from "./hooks/useScrollLock";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ModalVariant = "default" | "form" | "confirmation" | "fullscreen";
export type ModalSize    = "sm" | "md" | "lg" | "xl";

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "ghost";
  loading?: boolean;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  size?: ModalSize;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

// ─── Size map ─────────────────────────────────────────────────────────────────

const sizeMap: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

// ─── Action button ────────────────────────────────────────────────────────────

function ActionBtn({ action }: { action: ModalAction }) {
  const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed min-w-[80px]";
  const variants = {
    primary: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20",
    danger:  "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20",
    ghost:   "text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8",
  };
  return (
    <button
      type="button"
      onClick={action.onClick}
      disabled={action.loading}
      className={cn(base, variants[action.variant ?? "primary"])}
    >
      {action.label}
    </button>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

export function ModalHeader({
  title, description, icon, onClose, showClose = true, className,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  showClose?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-white/20 dark:border-white/10 flex-shrink-0", className)}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-purple-100/70 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">{title}</h2>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>}
        </div>
      </div>
      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 p-1.5 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className, scrollable = false }: {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean;
}) {
  return (
    <div className={cn("px-6 py-5 flex-1", scrollable && "overflow-y-auto", className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-end gap-3 px-6 py-4 border-t border-white/20 dark:border-white/10 flex-shrink-0", className)}>
      {children}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  variant = "default",
  size = "md",
  title,
  description,
  icon,
  children,
  footer,
  primaryAction,
  secondaryAction,
  closeOnBackdrop = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const trapRef = useFocusTrap(open);
  useScrollLock(open);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  if (!open) return null;

  const isFullscreen = variant === "fullscreen";

  const panel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-modal flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={trapRef}
        className={cn(
          "relative flex flex-col w-full animate-fade-in",
          "bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl",
          "border border-white/30 dark:border-white/10",
          "shadow-glass-xl",
          isFullscreen
            ? "rounded-none h-screen max-w-none"
            : cn("rounded-3xl max-h-[90vh]", sizeMap[size]),
          className
        )}
      >
        {/* Auto-header */}
        {title && (
          <ModalHeader
            title={title}
            description={description}
            icon={icon}
            onClose={onClose}
            showClose={showCloseButton}
          />
        )}

        {/* Body */}
        {children && (
          <ModalBody scrollable>
            {children}
          </ModalBody>
        )}

        {/* Auto-footer */}
        {(footer || primaryAction || secondaryAction) && (
          <ModalFooter>
            {footer ?? (
              <>
                {secondaryAction && <ActionBtn action={secondaryAction} />}
                {primaryAction  && <ActionBtn action={primaryAction} />}
              </>
            )}
          </ModalFooter>
        )}
      </div>
    </div>
  );

  return createPortal(panel, document.body);
}

// ─── ConfirmationModal ────────────────────────────────────────────────────────

export type ConfirmVariant = "danger" | "warning" | "info";

export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
}

const confirmConfig: Record<ConfirmVariant, {
  icon: React.ReactNode;
  iconBg: string;
  confirmClass: string;
}> = {
  danger: {
    icon:         <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />,
    iconBg:       "bg-red-100/70 dark:bg-red-900/30",
    confirmClass: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/20",
  },
  warning: {
    icon:         <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
    iconBg:       "bg-amber-100/70 dark:bg-amber-900/30",
    confirmClass: "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20",
  },
  info: {
    icon:         <CheckCircle2 className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
    iconBg:       "bg-purple-100/70 dark:bg-purple-900/30",
    confirmClass: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-md shadow-purple-500/20",
  },
};

export function ConfirmationModal({
  open, onClose, onConfirm,
  title, description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: ConfirmationModalProps) {
  const cfg = confirmConfig[variant];
  useFocusTrap(open);
  useScrollLock(open);

  const handleEsc = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  if (!open) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-modal flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl border border-white/30 dark:border-white/10 rounded-3xl shadow-glass-xl animate-fade-in">
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0", cfg.iconBg)}>
              {cfg.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{description}</p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 pt-1 border-t border-white/20 dark:border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/8 transition-all duration-150"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
                cfg.confirmClass
              )}
            >
              {loading ? "Loading…" : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
