/**
 * Re-export auth context hook from a single `hooks/` entry point
 * (keeps components from importing `@/context/*` directly if you prefer).
 */
export { useAuthContext as useAuth } from '@/context/AuthContext';
