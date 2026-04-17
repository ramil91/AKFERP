import { useParams, Navigate } from 'react-router-dom';
import { projectStore } from '@/data/projects';
import { ProjectForm } from './ProjectForm';

export function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectStore.getById(id) : null;

  if (!project) return <Navigate to="/admin/projects" replace />;

  return <ProjectForm existing={project} />;
}
