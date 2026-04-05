import { Navigate } from 'react-router-dom';

/** Legacy `/dashboard` URL — admin UI lives under `/admin`. */
export function DashboardPage() {
  return <Navigate to="/admin/dashboard" replace />;
}
