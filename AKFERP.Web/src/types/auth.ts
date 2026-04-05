/** Logged-in user shape used across the UI (subset of Identity + claims). */
export type AuthUser = {
  id: string;
  email: string;
  roles: string[];
};

/**
 * Normalized session after login/register.
 * `expiresAtUtc` is ISO string from API; used to treat token as expired client-side.
 */
export type AuthSession = {
  user: AuthUser;
  token: string;
  expiresAtUtc: string | null;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginCredentials & {
  firstName?: string;
  lastName?: string;
};
