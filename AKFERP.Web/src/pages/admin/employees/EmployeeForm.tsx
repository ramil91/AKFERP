import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconDeviceFloppy, IconArrowLeft, IconUser,
  IconMail, IconPhone, IconMapPin,
} from '@tabler/icons-react';
import { employeeStore, type Employee } from '@/data/employees';

type Props = {
  existing?: Employee | null;
};

const DEPARTMENTS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office'];
const DESIGNATIONS = ['Manager', 'Senior Officer', 'Officer', 'Assistant', 'Coordinator', 'Director', 'Intern'];
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

export function EmployeeForm({ existing }: Props) {
  const navigate = useNavigate();
  const isEdit = !!existing;

  const [firstName, setFirstName] = useState(existing?.firstName ?? '');
  const [lastName, setLastName] = useState(existing?.lastName ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [department, setDepartment] = useState(existing?.department ?? DEPARTMENTS[0]);
  const [designation, setDesignation] = useState(existing?.designation ?? DESIGNATIONS[0]);
  const [joiningDate, setJoiningDate] = useState(existing?.joiningDate ?? '');
  const [salary, setSalary] = useState(String(existing?.salary ?? ''));
  const [status, setStatus] = useState<Employee['status']>(existing?.status ?? 'Active');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [city, setCity] = useState(existing?.city ?? CITIES[0]);
  const [sendWelcome, setSendWelcome] = useState(!isEdit);

  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState(0);

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
      department, designation, joiningDate,
      salary: Number(salary) || 0, status, address, city,
    };

    if (isEdit && existing) {
      employeeStore.update(existing.id, payload);
      setSuccessMsg(`Employee ${existing.id} updated successfully.`);
    } else {
      const emp = employeeStore.add(payload);
      setSuccessMsg(`Employee ${emp.id} created successfully.`);
    }
    setSubmitting(false);
  }

  const tabs = ['Personal Info', 'Job Details', 'Address & Other'];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title">{isEdit ? `Edit Employee \u2014 ${existing?.id}` : 'Add Employee'}</h3>
        <Link to="/admin/employees" className="btn btn-ghost-secondary btn-sm">
          <IconArrowLeft size={16} className="me-1" />
          Back to list
        </Link>
      </div>

      <div className="card-body">
        {successMsg && (
          <div className="alert alert-success alert-dismissible" role="alert">
            {successMsg}{' '}
            <Link to="/admin/employees" className="alert-link">Go to list</Link>
            <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
          </div>
        )}

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          {tabs.map((t, i) => (
            <li key={t} className="nav-item">
              <button
                className={`nav-link${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
                type="button"
              >
                {t}
              </button>
            </li>
          ))}
        </ul>

        <form noValidate className={validated ? 'was-validated' : ''} onSubmit={onSubmit}>
          {/* Tab 1: Personal */}
          <div className={activeTab === 0 ? '' : 'd-none'}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-fn">First Name *</label>
                <div className="input-group">
                  <span className="input-group-text"><IconUser size={16} /></span>
                  <input
                    id="emp-fn"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ahmed"
                    required
                  />
                  <div className="invalid-feedback">First name is required.</div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-ln">Last Name *</label>
                <div className="input-group">
                  <span className="input-group-text"><IconUser size={16} /></span>
                  <input
                    id="emp-ln"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Khan"
                    required
                  />
                  <div className="invalid-feedback">Last name is required.</div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-email">Email *</label>
                <div className="input-group">
                  <span className="input-group-text"><IconMail size={16} /></span>
                  <input
                    id="emp-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmed.khan@akferp.local"
                    required
                  />
                  <div className="invalid-feedback">Valid email is required.</div>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-phone">Phone</label>
                <div className="input-group">
                  <span className="input-group-text"><IconPhone size={16} /></span>
                  <input
                    id="emp-phone"
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tab 2: Job */}
          <div className={activeTab === 1 ? '' : 'd-none'}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-dept">Department *</label>
                <select id="emp-dept" className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-desig">Designation *</label>
                <select id="emp-desig" className="form-select" value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                  {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-join">Joining Date *</label>
                <input
                  id="emp-join"
                  type="date"
                  className="form-control"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  required
                />
                <div className="invalid-feedback">Joining date is required.</div>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-salary">Salary (PKR)</label>
                <div className="input-group">
                  <span className="input-group-text">Rs.</span>
                  <input
                    id="emp-salary"
                    type="number"
                    min={0}
                    step={1000}
                    className="form-control"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="50000"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="emp-status">Status</label>
                <select
                  id="emp-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Employee['status'])}
                >
                  <option>Active</option>
                  <option>On Leave</option>
                  <option>Resigned</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tab 3: Address */}
          <div className={activeTab === 2 ? '' : 'd-none'}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label" htmlFor="emp-addr">Street Address</label>
                <div className="input-group">
                  <span className="input-group-text"><IconMapPin size={16} /></span>
                  <input
                    id="emp-addr"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="10 Street 5, Block A"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="emp-city">City</label>
                <select id="emp-city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={sendWelcome}
                    onChange={(e) => setSendWelcome(e.target.checked)}
                  />
                  <span className="form-check-label">Send welcome email to the employee</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit row */}
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <IconDeviceFloppy size={16} className="me-1" />
              {submitting ? 'Saving\u2026' : isEdit ? 'Update Employee' : 'Create Employee'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/employees')}>
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="card-footer text-muted small">
        {isEdit
          ? `Editing ${existing?.firstName} ${existing?.lastName} (${existing?.id})`
          : 'Fill all required (*) fields across the tabs then click Create Employee.'}
      </div>
    </div>
  );
}
