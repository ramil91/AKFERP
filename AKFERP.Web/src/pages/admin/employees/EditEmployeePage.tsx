import { useParams, Navigate } from 'react-router-dom';
import { employeeStore } from '@/data/employees';
import { EmployeeForm } from './EmployeeForm';

export function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
  const employee = id ? employeeStore.getById(id) : null;

  if (!employee) return <Navigate to="/admin/employees" replace />;

  return <EmployeeForm existing={employee} />;
}
