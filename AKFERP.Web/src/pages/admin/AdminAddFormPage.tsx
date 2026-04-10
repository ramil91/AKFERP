import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';

export function AdminAddFormPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Programs');
  const [priority, setPriority] = useState('Medium');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setDone(false);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setDone(true);
  }

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="card-title">Add Record</h3>
        <Link to="/admin/records" className="btn btn-ghost-secondary btn-sm">
          <IconArrowLeft size={16} className="me-1" />
          Back to list
        </Link>
      </div>
      <div className="card-body">
        {done && (
          <div className="alert alert-success alert-dismissible" role="alert">
            Record saved successfully (demo). Wire to your API for real persistence.
            <button type="button" className="btn-close" onClick={() => setDone(false)} aria-label="Close" />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="rec-name">Name</label>
            <input
              id="rec-name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Community program"
              required
            />
          </div>
          <div className="row mb-3 g-3">
            <div className="col-sm-6">
              <label className="form-label" htmlFor="rec-cat">Category</label>
              <select id="rec-cat" className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Programs</option>
                <option>Services</option>
                <option>Support</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label" htmlFor="rec-pri">Priority</label>
              <select id="rec-pri" className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="rec-notes">Notes</label>
            <textarea
              id="rec-notes"
              className="form-control"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional details"
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <IconDeviceFloppy size={16} className="me-1" />
              {submitting ? 'Saving\u2026' : 'Save'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/records')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
