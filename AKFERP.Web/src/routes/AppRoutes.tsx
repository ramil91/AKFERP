import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { DefaultLayout } from '@/components/layout/DefaultLayout';
import { AdminAddFormPage } from '@/pages/admin/AdminAddFormPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminTablePage } from '@/pages/admin/AdminTablePage';
import { EmployeeListPage } from '@/pages/admin/employees/EmployeeListPage';
import { AddEmployeePage } from '@/pages/admin/employees/AddEmployeePage';
import { EditEmployeePage } from '@/pages/admin/employees/EditEmployeePage';
import { DashboardPage } from '@/pages/DashboardPage';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Auth pages — full-screen, no sidebar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/404" element={<NotFoundPage />} />

      {/* CoreUI DefaultLayout shell (sidebar + header + footer) */}
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="records" element={<AdminTablePage />} />
            <Route path="records/new" element={<AdminAddFormPage />} />
            <Route path="employees" element={<EmployeeListPage />} />
            <Route path="employees/new" element={<AddEmployeePage />} />
            <Route path="employees/:id/edit" element={<EditEmployeePage />} />
            {/* Placeholder routes for nav items — replace with real pages */}
            <Route path="users" element={<AdminTablePage />} />
            <Route path="users/new" element={<AdminAddFormPage />} />
            <Route path="analytics" element={<AdminDashboardPage />} />
            <Route path="profile" element={<AdminAddFormPage />} />
            <Route path="settings" element={<AdminAddFormPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
