import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconDeviceFloppy, IconArrowLeft, IconUser, IconMail,
  IconPhone, IconBuilding, IconMapPin,
} from '@tabler/icons-react';
import {
  partyStore, type Party,
  PARTY_TYPE_OPTIONS, PARTY_CITY_OPTIONS,
} from '@/data/parties';

type Props = { existing?: Party | null };

export function PartyForm({ existing }: Props) {
  const navigate = useNavigate();
  const isEdit = !!existing;

  const [partyType, setPartyType] = useState(existing?.partyType ?? 'Person');
  const [displayName, setDisplayName] = useState(existing?.displayName ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [country, setCountry] = useState(existing?.country ?? 'Pakistan');
  const [city, setCity] = useState(existing?.city ?? '');
  const [isActive, setIsActive] = useState(existing?.isActive ?? true);

  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidated(true);
    const form = e.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) return;

    setSubmitting(true);
    const data = { partyType, displayName, phone, email, country, city, isActive };

    if (isEdit) {
      partyStore.update(existing!.id, data);
      setSuccessMsg('Party updated successfully.');
    } else {
      partyStore.add(data);
      setSuccessMsg('Party created successfully.');
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
                <Link to="/admin/parties" className="text-muted d-inline-flex align-items-center gap-1">
                  <IconArrowLeft size={14} /> Back to Parties
                </Link>
              </div>
              <h2 className="page-title">{isEdit ? 'Edit Party' : 'Add Party'}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          {successMsg && (
            <div className="alert alert-success alert-dismissible" role="alert">
              {successMsg}{' '}
              <Link to="/admin/parties" className="alert-link">Go to list</Link>
              <button type="button" className="btn-close" onClick={() => setSuccessMsg('')} aria-label="Close" />
            </div>
          )}

          <form noValidate className={validated ? 'was-validated' : ''} onSubmit={onSubmit}>
            <div className="row g-3">
              {/* ── Left Column ── */}
              <div className="col-lg-8 d-flex">
                <div className="card mb-3 w-100">
                  <div className="card-header"><h3 className="card-title">Party Information</h3></div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="form-label required" htmlFor="pty-type">Party Type</label>
                        <select id="pty-type" className="form-select" value={partyType} onChange={(e) => setPartyType(e.target.value)} required>
                          {PARTY_TYPE_OPTIONS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </div>
                      <div className="col-md-8">
                        <label className="form-label required" htmlFor="pty-name">Display Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            {partyType === 'Organization' ? <IconBuilding size={16} /> : <IconUser size={16} />}
                          </span>
                          <input id="pty-name" className="form-control" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={partyType === 'Organization' ? 'Green Crescent Trust' : 'Muhammad Aslam'} required />
                          <div className="invalid-feedback">Display name is required.</div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="pty-phone">Phone</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconPhone size={16} /></span>
                          <input id="pty-phone" type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="pty-email">Email</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMail size={16} /></span>
                          <input id="pty-email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contact@example.com" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="pty-city">City</label>
                        <div className="input-group">
                          <span className="input-group-text"><IconMapPin size={16} /></span>
                          <select id="pty-city" className="form-select" value={city} onChange={(e) => setCity(e.target.value)}>
                            <option value="">Select...</option>
                            {PARTY_CITY_OPTIONS.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="pty-country">Country</label>
                        <input id="pty-country" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
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
                    <label className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                      <span className="form-check-label">{isActive ? 'Active' : 'Inactive'}</span>
                    </label>
                  </div>
                </div>

                <div className="card mb-3 flex-grow-1 d-flex flex-column justify-content-center">
                  <div className="card-body text-center py-4">
                    <span className="avatar avatar-xl bg-info text-white mb-3" style={{ fontSize: '1.5rem' }}>
                      {partyType === 'Organization' ? <IconBuilding size={28} /> : (displayName?.[0] ?? '?').toUpperCase()}
                    </span>
                    <h3 className="mb-1">{displayName || 'Display Name'}</h3>
                    <p className="text-muted mb-1">{partyType}</p>
                    <p className="text-muted mb-0 small">{city || 'City'}{country ? `, ${country}` : ''}</p>
                    {isEdit && <span className="badge bg-primary-lt mt-2">PTY-{existing?.partyNumber}</span>}
                  </div>
                </div>
              </div>

              {/* ── Action Buttons ── */}
              <div className="col-12">
                <div className="d-flex align-items-center">
                  <button type="submit" className={`btn btn-primary${submitting ? ' btn-loading' : ''}`} disabled={submitting}>
                    <IconDeviceFloppy size={16} className="me-1" />
                    {isEdit ? 'Update Party' : 'Create Party'}
                  </button>
                  <button type="button" className="btn ms-2" onClick={() => navigate('/admin/parties')}>
                    Cancel
                  </button>
                  {isEdit && (
                    <span className="text-muted ms-auto small">
                      Editing {existing?.displayName} (PTY-{existing?.partyNumber})
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
