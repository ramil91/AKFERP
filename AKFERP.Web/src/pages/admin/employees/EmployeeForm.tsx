import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconDeviceFloppy, IconArrowLeft, IconUser, IconMail, IconPhone,
  IconMapPin, IconBriefcase, IconCalendar, IconCurrencyDollar,
  IconId, IconBuildingBank, IconHeart, IconDroplet,
} from '@tabler/icons-react';
import {
  employeeStore, type Employee,
  GENDER_OPTIONS, MARITAL_STATUS_OPTIONS, BLOOD_GROUP_OPTIONS,
  DEPARTMENT_OPTIONS, DESIGNATION_OPTIONS, EMPLOYMENT_TYPE_OPTIONS,
  STATUS_OPTIONS, BANK_OPTIONS, SALARY_PAYMENT_OPTIONS,
} from '@/data/employees';

type Props = { existing?: Employee | null };

export function EmployeeForm({ existing }: Props) {
  const navigate = useNavigate();
  const isEdit = !!existing;

  const [firstName, setFirstName] = useState(existing?.firstName ?? '');
  const [lastName, setLastName] = useState(existing?.lastName ?? '');
  const [cnic, setCnic] = useState(existing?.cnic ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(existing?.dateOfBirth ?? '');
  const [gender, setGender] = useState(existing?.gender ?? '');
  const [maritalStatus, setMaritalStatus] = useState(existing?.maritalStatus ?? '');
  const [bloodGroup, setBloodGroup] = useState(existing?.bloodGroup ?? '');
  const [personalEmail, setPersonalEmail] = useState(existing?.personalEmail ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');

  const [department, setDepartment] = useState(existing?.department ?? '');
  const [designation, setDesignation] = useState(existing?.designation ?? '');
  const [employmentType, setEmploymentType] = useState(existing?.employmentType ?? '');
  const [hireDate, setHireDate] = useState(existing?.hireDate ?? '');
  const [confirmationDate, setConfirmationDate] = useState(existing?.confirmationDate ?? '');
  const [reportingManagerId, setReportingManagerId] = useState(existing?.reportingManagerId ?? '');
  const [status, setStatus] = useState(existing?.status ?? 'Active');

  const [basicSalary, setBasicSalary] = useState(String(existing?.basicSalary ?? ''));
  const [allowances, setAllowances] = useState(String(existing?.allowances ?? ''));
  const [deductions, setDeductions] = useState(String(existing?.deductions ?? ''));
  const [bankName, setBankName] = useState(existing?.bankName ?? '');
  const [bankAccountNo, setBankAccountNo] = useState(existing?.bankAccountNo ?? '');
  const [salaryPaymentMethod, setSalaryPaymentMethod] = useState(existing?.salaryPaymentMethod ?? '');

  const [submitting, setSubmitting] = useState(false);
  const [validated, setValidated] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const managers = employeeStore.getAll().filter((e) => e.id !== existing?.id);

  const netSalary = (Number(basicSalary) || 0) + (Number(allowances) || 0) - (Number(deductions) || 0);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) { setValidated(true); return; }
    setSubmitting(true);
    setSuccessMsg('');
    await new Promise((r) => setTimeout(r, 400));

    const payload = {
      firstName, lastName, cnic, dateOfBirth, gender, maritalStatus, bloodGroup,
      personalEmail, phone, address, department, designation, employmentType,
      hireDate, confirmationDate, reportingManagerId, status,
      basicSalary: Number(basicSalary) || 0, allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0, bankName, bankAccountNo, salaryPaymentMethod,
    };

    if (isEdit && existing) {
      employeeStore.update(existing.id, payload);
      setSuccessMsg(`Employee ${existing.employeeCode} updated successfully.`);
    } else {
      const emp = employeeStore.add(payload);
      setSuccessMsg(`Employee ${emp.employeeCode} created successfully.`);
    }
    setSubmitting(false);
  }

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">Employee</div>
              <h2 className="page-title">{isEdit ? `Edit — ${existing?.employeeCode}` : 'Add New Employee'}</h2>
            </div>
            <div className="col-auto ms-auto">
              <Link to="/admin/employees" className="btn btn-outline-secondary">
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
              <Link to="/admin/employees" className="alert-link">Go to list</Link>
              <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
            </div>
          )}

          <form noValidate className={validated ? 'was-validated' : ''} onSubmit={onSubmit}>
            <div className="row g-3">
              {/* ── Left Column ── */}
              <div className="col-lg-8 d-flex">
                {/* Personal Information */}
                <div className="card mb-3 w-100">
                  <div className="card-header"><h3 className="card-title">Personal Information</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="emp-fn">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconUser size={16} /></span>
                          <input id="emp-fn" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Ahmed" required />
                          <div className="invalid-feedback">First name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label required" htmlFor="emp-ln">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconUser size={16} /></span>
                          <input id="emp-ln" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Khan" required />
                          <div className="invalid-feedback">Last name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="emp-cnic">CNIC</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconId size={16} /></span>
                          <input id="emp-cnic" className="form-control" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="35202-1234567-1" maxLength={15} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="emp-dob">Date of Birth</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCalendar size={16} /></span>
                          <input id="emp-dob" type="date" className="form-control" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-gender">Gender</label>
                        <select id="emp-gender" className="form-select" value={gender} onChange={(e) => setGender(e.target.value)}>
                          <option value="">Select...</option>
                          {GENDER_OPTIONS.map((g) => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-marital">Marital Status</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconHeart size={16} /></span>
                          <select id="emp-marital" className="form-select" value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)}>
                            <option value="">Select...</option>
                            {MARITAL_STATUS_OPTIONS.map((m) => <option key={m}>{m}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-blood">Blood Group</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconDroplet size={16} /></span>
                          <select id="emp-blood" className="form-select" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
                            <option value="">Select...</option>
                            {BLOOD_GROUP_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="emp-email">Personal Email</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMail size={16} /></span>
                          <input id="emp-email" type="email" className="form-control" value={personalEmail} onChange={(e) => setPersonalEmail(e.target.value)} placeholder="ahmed.khan@email.com" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="emp-phone">Phone</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconPhone size={16} /></span>
                          <input id="emp-phone" type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />
                        </div>
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="emp-addr">Address</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMapPin size={16} /></span>
                          <input id="emp-addr" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House 10, Street 5, Block A, Gulberg" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ── Right Column ── */}
              <div className="col-lg-4 d-flex flex-column">
                {/* Status */}
                <div className="card mb-3">
                  <div className="card-header"><h3 className="card-title">Status</h3></div>
                  <div className="card-body">
                    <label className="form-label required" htmlFor="emp-status">Employee Status</label>
                    <select id="emp-status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option value="">Select...</option>
                      {STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* Preview */}
                <div className="card mb-3 flex-grow-1 d-flex flex-column justify-content-center">
                  <div className="card-body text-center py-4">
                    <span className="avatar avatar-xl bg-primary text-white mb-3" style={{ fontSize: '1.5rem' }}>
                      {(firstName?.[0] ?? '?').toUpperCase()}{(lastName?.[0] ?? '').toUpperCase()}
                    </span>
                    <h3 className="mb-1">{firstName || 'First'} {lastName || 'Last'}</h3>
                    <p className="text-muted mb-1">{designation || 'Designation'}</p>
                    <p className="text-muted mb-0 small">{department || 'Department'}</p>
                    {isEdit && <span className="badge bg-primary-lt mt-2">{existing?.employeeCode}</span>}
                  </div>
                </div>
              </div>

              {/* ── Job Details (full width) ── */}
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-header"><h3 className="card-title">Job Details</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label required" htmlFor="emp-dept">Department</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconBriefcase size={16} /></span>
                          <select id="emp-dept" className="form-select" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="">Select...</option>
                            {DEPARTMENT_OPTIONS.map((d) => <option key={d}>{d}</option>)}
                          </select>
                          <div className="invalid-feedback">Department is required.</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label required" htmlFor="emp-desig">Designation</label>
                        <select id="emp-desig" className="form-select" value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                          <option value="">Select...</option>
                          {DESIGNATION_OPTIONS.map((d) => <option key={d}>{d}</option>)}
                        </select>
                        <div className="invalid-feedback">Designation is required.</div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-type">Employment Type</label>
                        <select id="emp-type" className="form-select" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
                          <option value="">Select...</option>
                          {EMPLOYMENT_TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-mgr">Reporting Manager</label>
                        <select id="emp-mgr" className="form-select" value={reportingManagerId} onChange={(e) => setReportingManagerId(e.target.value)}>
                          <option value="">None</option>
                          {managers.map((m) => (
                            <option key={m.id} value={m.id}>{m.firstName} {m.lastName} ({m.employeeCode})</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label required" htmlFor="emp-hire">Hire Date</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCalendar size={16} /></span>
                          <input id="emp-hire" type="date" className="form-control" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
                          <div className="invalid-feedback">Hire date is required.</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="emp-confirm">Confirmation Date</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCalendar size={16} /></span>
                          <input id="emp-confirm" type="date" className="form-control" value={confirmationDate} onChange={(e) => setConfirmationDate(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Salary & Banking (full width) ── */}
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-header"><h3 className="card-title">Salary & Banking</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="emp-basic">Basic Salary</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCurrencyDollar size={16} /></span>
                          <input id="emp-basic" type="number" min={0} step={1000} className="form-control" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} placeholder="50000" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="emp-allow">Allowances</label>
                        <div className="input-group">
                          <span className="input-group-text">+</span>
                          <input id="emp-allow" type="number" min={0} step={500} className="form-control" value={allowances} onChange={(e) => setAllowances(e.target.value)} placeholder="10000" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="emp-deduct">Deductions</label>
                        <div className="input-group">
                          <span className="input-group-text">−</span>
                          <input id="emp-deduct" type="number" min={0} step={500} className="form-control" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="5000" />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label">&nbsp;</label>
                        <div className="d-flex justify-content-between align-items-center border rounded px-3 py-2">
                          <strong>Net Salary</strong>
                          <strong className={netSalary >= 0 ? 'text-success' : 'text-danger'}>Rs. {netSalary.toLocaleString()}</strong>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="emp-payment">Payment Method</label>
                        <select id="emp-payment" className="form-select" value={salaryPaymentMethod} onChange={(e) => setSalaryPaymentMethod(e.target.value)}>
                          <option value="">Select...</option>
                          {SALARY_PAYMENT_OPTIONS.map((p) => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label" htmlFor="emp-bank">Bank Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconBuildingBank size={16} /></span>
                          <select id="emp-bank" className="form-select" value={bankName} onChange={(e) => setBankName(e.target.value)}>
                            <option value="">Select...</option>
                            {BANK_OPTIONS.map((b) => <option key={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="emp-acct">Account Number</label>
                        <input id="emp-acct" className="form-control" value={bankAccountNo} onChange={(e) => setBankAccountNo(e.target.value)} placeholder="PK36MEZN0001234567890" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <button type="submit" className={`btn btn-primary${submitting ? ' btn-loading' : ''}`} disabled={submitting}>
                    <IconDeviceFloppy size={16} className="me-1" />
                    {isEdit ? 'Update Employee' : 'Create Employee'}
                  </button>
                  <button type="button" className="btn ms-2" onClick={() => navigate('/admin/employees')}>
                    Cancel
                  </button>
                  {isEdit && (
                    <span className="text-muted ms-auto small">
                      Editing {existing?.firstName} {existing?.lastName} ({existing?.employeeCode})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
