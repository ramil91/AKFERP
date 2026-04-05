import type { ToastVariant } from '@/types/ui';

export type ToastPayload = {
  id: string;
  message: string;
  variant: ToastVariant;
  durationMs: number;
};

type ToastListener = (toast: ToastPayload) => void;

/**
 * Imperative toast API usable from services or non-React code.
 * ToastProvider registers the bridge to React state (see ToastContext).
 */
class NotificationService {
  private listener: ToastListener | null = null;

  /** Called once from ToastProvider mount. */
  subscribe(listener: ToastListener | null) {
    this.listener = listener;
  }

  show(message: string, variant: ToastVariant = 'info', durationMs = 4000) {
    const id = crypto.randomUUID();
    this.listener?.({ id, message, variant, durationMs });
    return id;
  }

  success(message: string, durationMs = 4000) {
    return this.show(message, 'success', durationMs);
  }

  error(message: string, durationMs = 6000) {
    return this.show(message, 'error', durationMs);
  }

  warning(message: string, durationMs = 5000) {
    return this.show(message, 'warning', durationMs);
  }
}

export const notificationService = new NotificationService();
