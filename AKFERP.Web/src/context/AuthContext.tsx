import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { authService } from '@/services/authService';
import { notificationService } from '@/services/notificationService';
import type { AuthSession, LoginCredentials, RegisterPayload } from '@/types/auth';
import { clearAuthSession, isSessionExpired, loadAuthSession, saveAuthSession } from '@/utils/authStorage';

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (c: LoginCredentials) => Promise<void>;
  register: (p: RegisterPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function initialSession(): AuthSession | null {
  const s = loadAuthSession();
  if (!s) return null;
  if (isSessionExpired(s)) {
    clearAuthSession();
    return null;
  }
  return s;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => initialSession());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const next = await authService.login(credentials);
      saveAuthSession(next);
      setSession(next);
      notificationService.success('Signed in successfully.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Login failed.';
      notificationService.error(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const next = await authService.register(payload);
      saveAuthSession(next);
      setSession(next);
      notificationService.success('Account created. You are signed in.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Registration failed.';
      notificationService.error(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setSession(null);
    notificationService.show('Signed out.', 'info');
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: !!session,
      isLoading,
      login,
      register,
      logout,
    }),
    [session, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
