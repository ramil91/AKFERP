import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { IconUser, IconLock } from '@tabler/icons-react';

export function SignupPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register({
        email,
        password,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      });
      navigate('/admin/dashboard', { replace: true });
    } catch {
      /* toast */
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
            <h2 className="h2 text-center mb-4">Create new account</h2>
            <form onSubmit={onSubmit} autoComplete="off">
              <div className="mb-3">
                <label className="form-label" htmlFor="reg-fn">First name</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text"><IconUser size={16} /></span>
                  <input
                    id="reg-fn"
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="reg-ln">Last name</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text"><IconUser size={16} /></span>
                  <input
                    id="reg-ln"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="reg-email">Email address</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text">@</span>
                  <input
                    id="reg-email"
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
                <label className="form-label" htmlFor="reg-pw">Password</label>
                <div className="input-group input-group-flat">
                  <span className="input-group-text"><IconLock size={16} /></span>
                  <input
                    id="reg-pw"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
                  {submitting ? 'Creating\u2026' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}
