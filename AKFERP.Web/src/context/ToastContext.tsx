import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { notificationService, type ToastPayload } from '@/services/notificationService';
import type { ToastVariant } from '@/types/ui';

export type { ToastVariant };

type ToastContextValue = {
  /** Prefer `notificationService` from services for imperative calls; this mirrors it in React. */
  push: (message: string, variant?: ToastVariant, durationMs?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const listener = (toast: ToastPayload) => {
      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => remove(toast.id), toast.durationMs);
    };
    notificationService.subscribe(listener);
    return () => notificationService.subscribe(null);
  }, [remove]);

  const push = useCallback((message: string, variant: ToastVariant = 'info', durationMs = 4000) => {
    notificationService.show(message, variant, durationMs);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Simple stacked toasts; swap for react-hot-toast later if you prefer. */}
      <div className="toast-viewport" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.variant}`} role="status">
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be used within ToastProvider');
  return ctx;
}
