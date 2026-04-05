import { apiClient } from '@/services/apiClient';
import type { ApiResponse } from '@/types/api';
import type { AuthSession, LoginCredentials, RegisterPayload } from '@/types/auth';

/** Backend DTO: AKFERP.Application.Features.Auth.Common.AuthResponseDto */
type AuthResponseDto = {
  userId: string;
  email: string;
  accessToken: string;
  expiresAtUtc: string;
  roles: string[];
};

const useMock = () => import.meta.env.VITE_USE_MOCK_AUTH === 'true';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function mapDtoToSession(dto: AuthResponseDto): AuthSession {
  return {
    user: { id: dto.userId, email: dto.email, roles: [...dto.roles] },
    token: dto.accessToken,
    expiresAtUtc: dto.expiresAtUtc,
  };
}

/**
 * Mock auth for UI development without the API.
 * Demo user: demo@akferp.local / Demo@123
 */
async function mockLogin(credentials: LoginCredentials): Promise<AuthSession> {
  await delay(350);
  const { email, password } = credentials;
  if (email.toLowerCase() === 'demo@akferp.local' && password === 'Demo@123') {
    return {
      user: {
        id: 'mock-user-1',
        email: 'demo@akferp.local',
        roles: ['Admin'],
      },
      token: 'mock.jwt.token',
      expiresAtUtc: new Date(Date.now() + 3600_000).toISOString(),
    };
  }
  throw new Error('Invalid email or password (try demo@akferp.local / Demo@123).');
}

async function mockRegister(payload: RegisterPayload): Promise<AuthSession> {
  await delay(400);
  if (payload.password.length < 6) throw new Error('Password must be at least 6 characters.');
  return {
    user: {
      id: 'mock-user-new',
      email: payload.email.toLowerCase(),
      roles: ['User'],
    },
    token: 'mock.jwt.token',
    expiresAtUtc: new Date(Date.now() + 3600_000).toISOString(),
  };
}

async function apiLogin(credentials: LoginCredentials): Promise<AuthSession> {
  const { data } = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  if (!data.success || !data.data) throw new Error(data.errors?.[0] || 'Login failed.');
  return mapDtoToSession(data.data);
}

async function apiRegister(payload: RegisterPayload): Promise<AuthSession> {
  const { data } = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/register', {
    email: payload.email,
    password: payload.password,
    firstName: payload.firstName ?? null,
    lastName: payload.lastName ?? null,
  });
  if (!data.success || !data.data) throw new Error(data.errors?.[0] || 'Registration failed.');
  return mapDtoToSession(data.data);
}

/**
 * Auth API facade. Toggle mock vs real via VITE_USE_MOCK_AUTH in `.env`.
 * Swap implementations here if you move to refresh tokens, etc.
 */
export const authService = {
  login(credentials: LoginCredentials) {
    return useMock() ? mockLogin(credentials) : apiLogin(credentials);
  },

  register(payload: RegisterPayload) {
    return useMock() ? mockRegister(payload) : apiRegister(payload);
  },
};
