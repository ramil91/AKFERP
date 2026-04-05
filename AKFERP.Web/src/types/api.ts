/**
 * Mirrors AKFERP.Shared.Responses.ApiResponse<T> from the backend.
 * Keep in sync when the API contract changes.
 */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  errors?: string[];
  message?: string | null;
};
