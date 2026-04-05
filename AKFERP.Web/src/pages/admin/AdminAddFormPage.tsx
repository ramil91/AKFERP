import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilSave } from '@coreui/icons';

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
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Add Record</strong>
            <CButton color="secondary" variant="ghost" size="sm" as={Link} to="/admin/records">
              <CIcon icon={cilArrowLeft} className="me-1" />
              Back to list
            </CButton>
          </CCardHeader>
          <CCardBody>
            {done && (
              <CAlert color="success" dismissible onClose={() => setDone(false)}>
                Record saved successfully (demo). Wire to your API for real persistence.
              </CAlert>
            )}
            <CForm onSubmit={onSubmit}>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="rec-name">Name</CFormLabel>
                  <CFormInput
                    id="rec-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Community program"
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3 g-3">
                <CCol sm={6}>
                  <CFormLabel htmlFor="rec-cat">Category</CFormLabel>
                  <CFormSelect id="rec-cat" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Programs</option>
                    <option>Services</option>
                    <option>Support</option>
                  </CFormSelect>
                </CCol>
                <CCol sm={6}>
                  <CFormLabel htmlFor="rec-pri">Priority</CFormLabel>
                  <CFormSelect id="rec-pri" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormLabel htmlFor="rec-notes">Notes</CFormLabel>
                  <CFormTextarea
                    id="rec-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional details"
                  />
                </CCol>
              </CRow>
              <div className="d-flex gap-2">
                <CButton type="submit" color="primary" disabled={submitting}>
                  <CIcon icon={cilSave} className="me-1" />
                  {submitting ? 'Saving…' : 'Save'}
                </CButton>
                <CButton color="secondary" variant="outline" onClick={() => navigate('/admin/records')}>
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
