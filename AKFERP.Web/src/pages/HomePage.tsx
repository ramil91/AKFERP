import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { IconDashboard, IconUser, IconLock } from '@tabler/icons-react';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title">Welcome to AKFERP</h2>
          <div className="text-muted mt-1">
            ALKHIDMAT Foundation ERP — manage operations, records, and reports.
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards g-4 mb-4">
            <div className="col-sm-6 col-xl-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  <IconDashboard size={48} className="text-primary mb-3" />
                  <h3 className="card-title">Dashboard</h3>
                  <p className="text-muted">View real-time metrics and operational data at a glance.</p>
                  {isAuthenticated ? (
                    <Link to="/admin/dashboard" className="btn btn-primary mt-auto">Go to Dashboard</Link>
                  ) : (
                    <Link to="/login" className="btn btn-primary mt-auto">Sign in to access</Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  <IconUser size={48} className="text-success mb-3" />
                  <h3 className="card-title">User Management</h3>
                  <p className="text-muted">Manage user accounts, roles, and permissions for the system.</p>
                  {isAuthenticated ? (
                    <Link to="/admin/users" className="btn btn-success mt-auto">Manage Users</Link>
                  ) : (
                    <Link to="/signup" className="btn btn-success mt-auto">Create Account</Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column align-items-center text-center p-4">
                  <IconLock size={48} className="text-warning mb-3" />
                  <h3 className="card-title">Security</h3>
                  <p className="text-muted">Role-based access control with JWT authentication and audit logs.</p>
                  <Link to={isAuthenticated ? '/admin/settings' : '/login'} className="btn btn-warning mt-auto">
                    {isAuthenticated ? 'Settings' : 'Learn More'}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header"><h3 className="card-title">Quick Start</h3></div>
                <div className="card-body">
                  <div className="alert alert-info mb-0">
                    <strong>Mock auth enabled:</strong> Use{' '}
                    <code>demo@akferp.local</code> / <code>Demo@123</code> to sign in.
                    Set <code>VITE_USE_MOCK_AUTH=true</code> in your environment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
