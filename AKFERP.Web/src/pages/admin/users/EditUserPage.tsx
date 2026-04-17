import { useParams, Navigate } from 'react-router-dom';
import { userStore } from '@/data/users';
import { UserForm } from './UserForm';

export function EditUserPage() {
  const { id } = useParams<{ id: string }>();
  const user = id ? userStore.getById(id) : null;

  if (!user) return <Navigate to="/admin/users" replace />;

  return <UserForm existing={user} />;
}
