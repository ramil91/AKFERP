import axios, { type AxiosError } from 'axios';
import { AUTH_STORAGE_KEY } from '@/constants/storageKeys';

/**
 * Central HTTP client. Uses VITE_API_URL when set; otherwise same-origin `/api`
 * so Vite dev proxy can forward to AKFERP.API.
 */
const baseURL = import.meta.env.VITE_API_URL?.trim() || '';

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
});

/** Attach Bearer token from localStorage before each request. */
apiClient.interceptors.request.use((config) => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) return config;
  try {
    const { token } = JSON.parse(raw) as { token?: string };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    /* ignore */
  }
  return config;
});

/** Normalize failed ApiResponse<T> bodies into a thrown Error with a readable message. */
apiClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ errors?: string[]; message?: string }>) => {
    const data = error.response?.data;
    const first = data?.errors?.[0];
    const msg = first || data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(msg));
  },
);
