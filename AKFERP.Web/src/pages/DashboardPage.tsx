import { useAuth } from '@/hooks/useAuth';

/** Example protected page — replace with ERP modules (employees, products, etc.). */
export function DashboardPage() {
  const { session } = useAuth();

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <p className="muted">This route is wrapped by <code>PrivateRoute</code>.</p>
      <section className="card">
        <h2>Session</h2>
        <dl className="dl">
          <dt>User id</dt>
          <dd>{session?.user.id}</dd>
          <dt>Email</dt>
          <dd>{session?.user.email}</dd>
          <dt>Roles</dt>
          <dd>{session?.user.roles.join(', ') || '—'}</dd>
          <dt>Token (truncated)</dt>
          <dd className="mono">{session?.token.slice(0, 24)}…</dd>
        </dl>
      </section>
    </div>
  );
}
