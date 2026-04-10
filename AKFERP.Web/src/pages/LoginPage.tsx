import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { IconUser, IconLock } from '@tabler/icons-react';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@akferp.local');
  const [password, setPassword] = useState('Demo@123');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate('/admin/dashboard', { replace: true });
    } catch {
      /* toast handled in AuthContext */
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <img src="/alkhidmat-logo.png" alt="ALKHIDMAT" height={56} style={{ objectFit: 'contain' }} />
        </div>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <form onSubmit={onSubmit} autoComplete="off">
              <div className="mb-3">
                <label className="form-label" htmlFor="login-email">Email address</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text"><IconUser size={16} /></span>
                  <input
                    id="login-email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="login-pw">Password</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text"><IconLock size={16} /></span>
                  <input
                    id="login-pw"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? 'Signing in\u2026' : 'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          Don&apos;t have account yet? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
