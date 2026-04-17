import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconDeviceFloppy, IconArrowLeft, IconUser,
  IconMail, IconPhone, IconShield, IconBriefcase,
} from '@tabler/icons-react';
import { userStore, type User, type UserRole, type UserStatus } from '@/data/users';

type Props = {
  existing?: User | null;
};

const ROLES: UserRole[] = ['Admin', 'Manager', 'User', 'Viewer'];
const DEPARTMENTS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office'];

export function UserForm({ existing }: Props) {
  const navigate = useNavigate();
  const isEdit = !!existing;

  const [firstName, setFirstName] = useState(existing?.firstName ?? '');
  const [lastName, setLastName] = useState(existing?.lastName ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [role, setRole] = useState<UserRole>(existing?.role ?? 'User');
  const [status, setStatus] = useState<UserStatus>(existing?.status ?? 'Active');
  const [department, setDepartment] = useState(existing?.department ?? DEPARTMENTS[0]);

  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    setSubmitting(true);
    setSuccessMsg('');
    await new Promise((r) => setTimeout(r, 400));

    const payload = {
      firstName, lastName, email, phone,
      role, status, department,
      createdAt: existing?.createdAt ?? new Date().toISOString().split('T')[0],
      lastLogin: existing?.lastLogin ?? '',
    };

    if (isEdit && existing) {
      userStore.update(existing.id, payload);
      setSuccessMsg(`User ${existing.id} updated successfully.`);
    } else {
      const user = userStore.add(payload);
      setSuccessMsg(`User ${user.id} created successfully.`);
    }
    setSubmitting(false);
  }

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">User Management</div>
              <h2 className="page-title">{isEdit ? `Edit User — ${existing?.id}` : 'Add New User'}</h2>
            </div>
            <div className="col-auto ms-auto">
              <Link to="/admin/users" className="btn btn-outline-secondary">
                <IconArrowLeft size={16} className="me-1" />
                Back to list
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          {successMsg && (
            <div className="alert alert-success alert-dismissible" role="alert">
              {successMsg}{' '}
              <Link to="/admin/users" className="alert-link">Go to list</Link>
              <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
            </div>
          )}

          <form noValidate className={validated ? 'was-validated' : ''} onSubmit={onSubmit}>
            <div className="row row-cards">
              {/* Account Information */}
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Account Information</h3>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="usr-fn">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconUser size={16} /></span>
                          <input
                            id="usr-fn"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Saad"
                            required
                          />
                          <div className="invalid-feedback">First name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="usr-ln">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconUser size={16} /></span>
                          <input
                            id="usr-ln"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Malik"
                            required
                          />
                          <div className="invalid-feedback">Last name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="usr-email">Email Address</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMail size={16} /></span>
                          <input
                            id="usr-email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="saad.malik@akferp.local"
                            required
                          />
                          <div className="invalid-feedback">Valid email is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="usr-phone">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconPhone size={16} /></span>
                          <input
                            id="usr-phone"
                            type="tel"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+92 300 1234567"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="usr-dept">Department</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconBriefcase size={16} /></span>
                          <select id="usr-dept" className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role & Status */}
              <div className="col-lg-4">
                <div className="row row-cards">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Role & Access</h3>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label required" htmlFor="usr-role">Role</label>
                          <div className="input-group">
                            <span className="input-group-text"><IconShield size={16} /></span>
                            <select id="usr-role" className="form-select" value={role} onChange={(e) => setRole(e.target.value as UserRole)} required>
                              {ROLES.map((r) => <option key={r}>{r}</option>)}
                            </select>
                          </div>
                          <small className="form-hint">
                            {role === 'Admin' && 'Full access to all features and settings.'}
                            {role === 'Manager' && 'Can manage team members and view reports.'}
                            {role === 'User' && 'Standard access to assigned modules.'}
                            {role === 'Viewer' && 'Read-only access to dashboards and reports.'}
                          </small>
                        </div>
                        <div className="mb-0">
                          <label className="form-label" htmlFor="usr-status">Account Status</label>
                          <select
                            id="usr-status"
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as UserStatus)}
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Suspended</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body text-center py-4">
                        <span className="avatar avatar-xl bg-primary text-white mb-3" style={{ fontSize: '1.5rem' }}>
                          {(firstName?.[0] ?? '?').toUpperCase()}{(lastName?.[0] ?? '').toUpperCase()}
                        </span>
                        <h3 className="mb-0">{firstName || 'First'} {lastName || 'Last'}</h3>
                        <p className="text-muted mb-0">{role} — {department}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="col-12">
                <div className="card">
                  <div className="card-footer d-flex align-items-center">
                    <button type="submit" className={`btn btn-primary${submitting ? ' btn-loading' : ''}`} disabled={submitting}>
                      <IconDeviceFloppy size={16} className="me-1" />
                      {isEdit ? 'Update User' : 'Create User'}
                    </button>
                    <button type="button" className="btn btn-outline-secondary ms-2" onClick={() => navigate('/admin/users')}>
                      Cancel
                    </button>
                    {isEdit && (
                      <span className="text-muted ms-auto small">Editing {existing?.firstName} {existing?.lastName} ({existing?.id})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
