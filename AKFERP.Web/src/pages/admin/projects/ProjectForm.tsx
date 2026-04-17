import { type FormEvent, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconDeviceFloppy, IconArrowLeft, IconBriefcase, IconCalendar,
  IconCurrencyDollar, IconMapPin, IconBuilding, IconUser, IconFileText,
} from '@tabler/icons-react';
import {
  projectStore, type Project,
  PROJECT_TYPE_OPTIONS, PROJECT_STATUS_OPTIONS,
  PROVINCE_OPTIONS, CITY_OPTIONS,
} from '@/data/projects';
import { employeeStore } from '@/data/employees';

type Props = { existing?: Project | null };

export function ProjectForm({ existing }: Props) {
  const navigate = useNavigate();
  const isEdit = !!existing;

  const [projectName, setProjectName] = useState(existing?.projectName ?? '');
  const [projectType, setProjectType] = useState(existing?.projectType ?? '');
  const [startDate, setStartDate] = useState(existing?.startDate ?? '');
  const [endDate, setEndDate] = useState(existing?.endDate ?? '');
  const [status, setStatus] = useState(existing?.status ?? 'Planning');
  const [locationAddress, setLocationAddress] = useState(existing?.locationAddress ?? '');
  const [city, setCity] = useState(existing?.city ?? '');
  const [province, setProvince] = useState(existing?.province ?? '');
  const [country, setCountry] = useState(existing?.country ?? 'Pakistan');
  const [budgetAllocated, setBudgetAllocated] = useState(existing?.budgetAllocated?.toString() ?? '');
  const [donorName, setDonorName] = useState(existing?.donorName ?? '');
  const [projectManagerId, setProjectManagerId] = useState(existing?.projectManagerId ?? '');
  const [parentProjectId, setParentProjectId] = useState(existing?.parentProjectId ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');

  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const managers = useMemo(() => employeeStore.getAll(), []);
  const parentProjects = useMemo(
    () => projectStore.getAll().filter((p) => p.id !== existing?.id),
    [],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) return;

    setSubmitting(true);
    const data = {
      projectName, projectType, startDate, endDate, status,
      locationAddress, city, province, country,
      budgetAllocated: Number(budgetAllocated) || 0,
      donorName, projectManagerId, parentProjectId, description,
    };

    if (isEdit) {
      projectStore.update(existing!.id, data);
      setSuccessMsg('Project updated successfully.');
    } else {
      projectStore.add(data);
      setSuccessMsg('Project created successfully.');
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">
                <Link to="/admin/projects" className="text-muted d-inline-flex align-items-center gap-1">
                  <IconArrowLeft size={14} /> Back to Projects
                </Link>
              </div>
              <h2 className="page-title">{isEdit ? 'Edit Project' : 'Add Project'}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          {successMsg && (
            <div className="alert alert-success alert-dismissible" role="alert">
              {successMsg}{' '}
              <Link to="/admin/projects" className="alert-link">Go to list</Link>
              <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
            </div>
          )}

          <form noValidate className={validated ? 'was-validated' : ''} onSubmit={onSubmit}>
            <div className="row g-3">
              {/* ── Left Column ── */}
              <div className="col-lg-8 d-flex">
                <div className="card mb-3 w-100">
                  <div className="card-header"><h3 className="card-title">Project Information</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-8">
                        <label className="form-label required" htmlFor="prj-name">Project Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconBriefcase size={16} /></span>
                          <input id="prj-name" className="form-control" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Clean Water Initiative" required />
                          <div className="invalid-feedback">Project name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label required" htmlFor="prj-type">Project Type</label>
                        <select id="prj-type" className="form-select" value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
                          <option value="">Select...</option>
                          {PROJECT_TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <div className="invalid-feedback">Type is required.</div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-start">Start Date</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCalendar size={16} /></span>
                          <input id="prj-start" type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-end">End Date</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCalendar size={16} /></span>
                          <input id="prj-end" type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-donor">Donor Name</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconUser size={16} /></span>
                          <input id="prj-donor" className="form-control" value={donorName} onChange={(e) => setDonorName(e.target.value)} placeholder="USAID / Private Donor" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-budget">Budget Allocated (PKR)</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconCurrencyDollar size={16} /></span>
                          <input id="prj-budget" type="number" min={0} step={10000} className="form-control" value={budgetAllocated} onChange={(e) => setBudgetAllocated(e.target.value)} placeholder="1000000" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-manager">Project Manager</label>
                        <select id="prj-manager" className="form-select" value={projectManagerId} onChange={(e) => setProjectManagerId(e.target.value)}>
                          <option value="">None</option>
                          {managers.map((m) => (
                            <option key={m.id} value={m.id}>{m.firstName} {m.lastName} ({m.employeeCode})</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-parent">Parent Project</label>
                        <select id="prj-parent" className="form-select" value={parentProjectId} onChange={(e) => setParentProjectId(e.target.value)}>
                          <option value="">None (Top Level)</option>
                          {parentProjects.map((p) => (
                            <option key={p.id} value={p.id}>{p.projectName} ({p.projectCode})</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label" htmlFor="prj-desc">Description</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconFileText size={16} /></span>
                          <textarea id="prj-desc" className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project description…" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Right Column ── */}
              <div className="col-lg-4 d-flex flex-column">
                <div className="card mb-3">
                  <div className="card-header"><h3 className="card-title">Status</h3></div>
                  <div className="card-body">
                    <label className="form-label required" htmlFor="prj-status">Project Status</label>
                    <select id="prj-status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                      <option value="">Select...</option>
                      {PROJECT_STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="card mb-3 flex-grow-1 d-flex flex-column justify-content-center">
                  <div className="card-body text-center py-4">
                    <span className="avatar avatar-xl bg-primary text-white mb-3" style={{ fontSize: '1.5rem' }}>
                      <IconBriefcase size={28} />
                    </span>
                    <h3 className="mb-1">{projectName || 'Project Name'}</h3>
                    <p className="text-muted mb-1">{projectType || 'Type'}</p>
                    <p className="text-muted mb-0 small">{city || 'City'}{province ? `, ${province}` : ''}</p>
                    {budgetAllocated && (
                      <span className="badge bg-green-lt mt-2">Rs. {Number(budgetAllocated).toLocaleString()}</span>
                    )}
                    {isEdit && <span className="badge bg-primary-lt mt-2 ms-1">{existing?.projectCode}</span>}
                  </div>
                </div>
              </div>

              {/* ── Location (full width) ── */}
              <div className="col-12">
                <div className="card mb-3">
                  <div className="card-header"><h3 className="card-title">Location</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-addr">Address</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMapPin size={16} /></span>
                          <input id="prj-addr" className="form-control" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} placeholder="25 Main Road, Sector B" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="prj-city">City</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconBuilding size={16} /></span>
                          <select id="prj-city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select...</option>
                            {CITY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="prj-province">Province</label>
                        <select id="prj-province" className="form-select" value={province} onChange={(e) => setProvince(e.target.value)}>
                          <option value="">Select...</option>
                          {PROVINCE_OPTIONS.map((p) => <option key={p}>{p}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label" htmlFor="prj-country">Country</label>
                        <input id="prj-country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
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
                    {isEdit ? 'Update Project' : 'Create Project'}
                  </button>
                  <button type="button" className="btn ms-2" onClick={() => navigate('/admin/projects')}>
                    Cancel
                  </button>
                  {isEdit && (
                    <span className="text-muted ms-auto small">
                      Editing {existing?.projectName} ({existing?.projectCode})
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
