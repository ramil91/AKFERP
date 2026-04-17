import { useParams, Navigate } from 'react-router-dom';
import { partyStore } from '@/data/parties';
import { PartyForm } from './PartyForm';

export function EditPartyPage() {
  const { id } = useParams<{ id: string }>();
  const party = id ? partyStore.getById(id) : null;

  if (!party) return <Navigate to="/admin/parties" replace />;

  return <PartyForm existing={party} />;
}
