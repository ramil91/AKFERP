import { AUTH_STORAGE_KEY } from '@/constants/storageKeys';
import type { AuthSession } from '@/types/auth';

/** Serialize session to localStorage (call after login/register). */
export function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/** Read session on app load; returns null if missing or corrupt. */
export function loadAuthSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.token || !parsed?.user?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function isSessionExpired(session: AuthSession): boolean {
  if (!session.expiresAtUtc) return false;
  return new Date(session.expiresAtUtc) <= new Date();
}
