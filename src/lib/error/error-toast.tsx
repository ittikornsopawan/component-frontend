"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id' | 'createdAt'>) => string;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

// ─── Toast Context ───────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ─── Toast Provider Component ───────────────────────────────────────────────

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
}

export function ToastProvider({ 
  children, 
  maxToasts = 5, 
  defaultDuration = 5000 
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // ─── Toast Management ─────────────────────────────────────────────────────

  const showToast = useCallback((toastData: Omit<Toast, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      ...toastData,
      id,
      createdAt: new Date(),
      duration: toastData.duration ?? defaultDuration,
    };

    setToasts(prev => {
      const newToasts = [...prev, toast];
      
      // Limit number of toasts
      if (newToasts.length > maxToasts) {
        return newToasts.slice(-maxToasts);
      }
      
      return newToasts;
    });

    // Auto-hide toast after duration (if not persistent)
    if (!toast.persistent && toast.duration && toast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, toast.duration);
    }

    return id;
  }, [defaultDuration, maxToasts]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // ─── Context Value ─────────────────────────────────────────────────────────

  const contextValue: ToastContextType = {
    toasts,
    showToast,
    hideToast,
    clearAllToasts,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// ─── Toast Container Component ─────────────────────────────────────────────

function ToastContainer() {
  const { toasts, hideToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onClose={() => hideToast(toast.id)} />
      ))}
    </div>
  );
}

// ─── Toast Item Component ───────────────────────────────────────────────────

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  React.useEffect(() => {
    // Enter animation
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    
    // Wait for exit animation before removing
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    
    switch (toast.type) {
      case 'success':
        return <CheckCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-green-500" />;
      case 'error':
        return <AlertCircle {...iconProps} className="w-5 h-5 flex-shrink-0 text-red-500" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="w-5 h-5 flex-shrink-0 text-amber-500" />;
      case 'info':
        return <Info {...iconProps} className="w-5 h-5 flex-shrink-0 text-blue-500" />;
      default:
        return <Info {...iconProps} className="w-5 h-5 flex-shrink-0 text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTitleColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-800 dark:text-green-200';
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-amber-800 dark:text-amber-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  const getMessageColor = () => {
    switch (toast.type) {
      case 'success':
        return 'text-green-700 dark:text-green-300';
      case 'error':
        return 'text-red-700 dark:text-red-300';
      case 'warning':
        return 'text-amber-700 dark:text-amber-300';
      case 'info':
        return 'text-blue-700 dark:text-blue-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div
      className={cn(
        "max-w-sm w-full border rounded-lg shadow-lg p-4 transition-all duration-300 transform",
        getBackgroundColor(),
        isVisible && !isLeaving && "translate-x-0 opacity-100 scale-100",
        !isVisible && !isLeaving && "translate-x-full opacity-0 scale-95",
        isLeaving && "translate-x-full opacity-0 scale-95"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        {getIcon()}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn("text-sm font-semibold", getTitleColor())}>
            {toast.title}
          </h4>
          
          {toast.message && (
            <p className={cn("text-sm mt-1", getMessageColor())}>
              {toast.message}
            </p>
          )}

          {/* Action */}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        {!toast.persistent && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Bar (for non-persistent toasts) */}
      {!toast.persistent && toast.duration && toast.duration > 0 && (
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
          <div
            className={cn(
              "h-1 rounded-full transition-all duration-linear",
              toast.type === 'success' && "bg-green-500",
              toast.type === 'error' && "bg-red-500",
              toast.type === 'warning' && "bg-amber-500",
              toast.type === 'info' && "bg-blue-500"
            )}
            style={{
              animation: `shrink ${toast.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Hook for Using Toast Context ─────────────────────────────────────────────

export function useToast() {
  const context = useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
}

// ─── Convenience Functions ─────────────────────────────────────────────────

export function useToastHelpers() {
  const { showToast } = useToast();

  const showSuccess = (title: string, message?: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'type' | 'title' | 'message'>>) => {
    return showToast({ type: 'success', title, message, ...options });
  };

  const showError = (title: string, message?: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'type' | 'title' | 'message'>>) => {
    return showToast({ type: 'error', title, message, persistent: true, ...options });
  };

  const showWarning = (title: string, message?: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'type' | 'title' | 'message'>>) => {
    return showToast({ type: 'warning', title, message, ...options });
  };

  const showInfo = (title: string, message?: string, options?: Partial<Omit<Toast, 'id' | 'createdAt' | 'type' | 'title' | 'message'>>) => {
    return showToast({ type: 'info', title, message, ...options });
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showToast,
  };
}

// ─── CSS Animation ───────────────────────────────────────────────────────────

// Add this to your global CSS or Tailwind config
const toastStyles = `
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
`;
