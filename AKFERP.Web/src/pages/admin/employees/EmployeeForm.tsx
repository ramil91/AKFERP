import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CCard, CCardBody, CCardHeader, CCardFooter,
  CCol, CRow,
  CForm, CFormLabel, CFormInput, CFormSelect, CFormCheck, CFormFeedback,
  CButton, CAlert, CNav, CNavItem, CNavLink, CTabContent, CTabPane,
  CInputGroup, CInputGroupText,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSave, cilArrowLeft, cilUser, cilEnvelopeClosed, cilPhone, cilLocationPin } from '@coreui/icons';
import { employeeStore, type Employee } from '@/data/employees';

type Props = {
  existing?: Employee | null;
};

const DEPARTMENTS = ['Administration', 'Programs', 'Finance', 'HR', 'IT', 'Operations', 'Field Office'];
const DESIGNATIONS = ['Manager', 'Senior Officer', 'Officer', 'Assistant', 'Coordinator', 'Director', 'Intern'];
const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Peshawar', 'Quetta', 'Multan', 'Faisalabad'];

/** Shared form for Add + Edit employee pages. */
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>{isEdit ? `Edit Employee — ${existing?.id}` : 'Add Employee'}</strong>
            <CButton color="secondary" variant="ghost" size="sm" as={Link} to="/admin/employees">
              <CIcon icon={cilArrowLeft} className="me-1" />
              Back to list
            </CButton>
          </CCardHeader>

          <CCardBody>
            {successMsg && (
              <CAlert color="success" dismissible onClose={() => setSuccessMsg('')}>
                {successMsg}{' '}
                <Link to="/admin/employees" className="alert-link">Go to list</Link>
              </CAlert>
            )}

            {/* ——— Tabs ——— */}
            <CNav variant="tabs" className="mb-3">
              <CNavItem>
                <CNavLink active={activeTab === 0} onClick={() => setActiveTab(0)} role="button">
                  Personal Info
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 1} onClick={() => setActiveTab(1)} role="button">
                  Job Details
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink active={activeTab === 2} onClick={() => setActiveTab(2)} role="button">
                  Address &amp; Other
                </CNavLink>
              </CNavItem>
            </CNav>

            <CForm noValidate validated={validated} onSubmit={onSubmit}>
              <CTabContent>
                {/* ——— Tab 1: Personal ——— */}
                <CTabPane visible={activeTab === 0}>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-fn">First Name *</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                        <CFormInput
                          id="emp-fn"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Ahmed"
                          required
                        />
                        <CFormFeedback invalid>First name is required.</CFormFeedback>
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-ln">Last Name *</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText><CIcon icon={cilUser} /></CInputGroupText>
                        <CFormInput
                          id="emp-ln"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Khan"
                          required
                        />
                        <CFormFeedback invalid>Last name is required.</CFormFeedback>
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-email">Email *</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText><CIcon icon={cilEnvelopeClosed} /></CInputGroupText>
                        <CFormInput
                          id="emp-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ahmed.khan@akferp.local"
                          required
                        />
                        <CFormFeedback invalid>Valid email is required.</CFormFeedback>
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-phone">Phone</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText><CIcon icon={cilPhone} /></CInputGroupText>
                        <CFormInput
                          id="emp-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+92 300 1234567"
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                </CTabPane>

                {/* ——— Tab 2: Job ——— */}
                <CTabPane visible={activeTab === 1}>
                  <CRow className="g-3">
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-dept">Department *</CFormLabel>
                      <CFormSelect id="emp-dept" value={department} onChange={(e) => setDepartment(e.target.value)} required>
                        {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-desig">Designation *</CFormLabel>
                      <CFormSelect id="emp-desig" value={designation} onChange={(e) => setDesignation(e.target.value)} required>
                        {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
                      </CFormSelect>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-join">Joining Date *</CFormLabel>
                      <CFormInput
                        id="emp-join"
                        type="date"
                        value={joiningDate}
                        onChange={(e) => setJoiningDate(e.target.value)}
                        required
                      />
                      <CFormFeedback invalid>Joining date is required.</CFormFeedback>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-salary">Salary (PKR)</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText>Rs.</CInputGroupText>
                        <CFormInput
                          id="emp-salary"
                          type="number"
                          min={0}
                          step={1000}
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          placeholder="50000"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="emp-status">Status</CFormLabel>
                      <CFormSelect
                        id="emp-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Employee['status'])}
                      >
                        <option>Active</option>
                        <option>On Leave</option>
                        <option>Resigned</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </CTabPane>

                {/* ——— Tab 3: Address ——— */}
                <CTabPane visible={activeTab === 2}>
                  <CRow className="g-3">
                    <CCol md={8}>
                      <CFormLabel htmlFor="emp-addr">Street Address</CFormLabel>
                      <CInputGroup>
                        <CInputGroupText><CIcon icon={cilLocationPin} /></CInputGroupText>
                        <CFormInput
                          id="emp-addr"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="10 Street 5, Block A"
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="emp-city">City</CFormLabel>
                      <CFormSelect id="emp-city" value={city} onChange={(e) => setCity(e.target.value)}>
                        {CITIES.map((c) => <option key={c}>{c}</option>)}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={12}>
                      <CFormCheck
                        id="emp-welcome"
                        label="Send welcome email to the employee"
                        checked={sendWelcome}
                        onChange={(e) => setSendWelcome(e.target.checked)}
                      />
                    </CCol>
                  </CRow>
                </CTabPane>
              </CTabContent>

              {/* ——— Submit row ——— */}
              <div className="d-flex gap-2 mt-4">
                <CButton type="submit" color="primary" disabled={submitting}>
                  <CIcon icon={cilSave} className="me-1" />
                  {submitting ? 'Saving…' : isEdit ? 'Update Employee' : 'Create Employee'}
                </CButton>
                <CButton type="button" color="secondary" variant="outline" onClick={() => navigate('/admin/employees')}>
                  Cancel
                </CButton>
              </div>
            </CForm>
          </CCardBody>

          <CCardFooter className="text-body-secondary small">
            {isEdit
              ? `Editing ${existing?.firstName} ${existing?.lastName} (${existing?.id})`
              : 'Fill all required (*) fields across the tabs then click Create Employee.'}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
}
