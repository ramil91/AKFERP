import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page">
      <h1>Welcome</h1>
      <p className="lead">
        Starter React 18 + Vite + TypeScript app with auth, routing, API client, and theme-ready CSS variables.
      </p>
      {isAuthenticated ? (
        <p>
          Go to the <Link to="/dashboard">dashboard</Link>.
        </p>
      ) : (
        <p>
          <Link to="/login">Log in</Link> or <Link to="/signup">create an account</Link>.
        </p>
      )}
      <section className="card">
        <h2>Mock auth</h2>
        <p className="muted">
          With <code>VITE_USE_MOCK_AUTH=true</code>, use <strong>demo@akferp.local</strong> / <strong>Demo@123</strong>.
        </p>
      </section>
    </div>
  );
}
