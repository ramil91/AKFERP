import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCallout,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSpeedometer, cilUser, cilLockLocked } from '@coreui/icons';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <CRow className="mb-4">
        <CCol>
          <h1 className="mb-1">Welcome to AKFERP</h1>
          <p className="text-body-secondary fs-5">
            ALKHIDMAT Foundation ERP — manage operations, records, and reports.
          </p>
        </CCol>
      </CRow>

      <CRow className="g-4 mb-4">
        <CCol sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody className="d-flex flex-column align-items-center text-center p-4">
              <CIcon icon={cilSpeedometer} size="3xl" className="text-primary mb-3" />
              <h5>Dashboard</h5>
              <p className="text-body-secondary">View real-time metrics and operational data at a glance.</p>
              {isAuthenticated ? (
                <CButton color="primary" as={Link} to="/admin/dashboard" className="mt-auto">
                  Go to Dashboard
                </CButton>
              ) : (
                <CButton color="primary" as={Link} to="/login" className="mt-auto">
                  Sign in to access
                </CButton>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody className="d-flex flex-column align-items-center text-center p-4">
              <CIcon icon={cilUser} size="3xl" className="text-success mb-3" />
              <h5>User Management</h5>
              <p className="text-body-secondary">Manage user accounts, roles, and permissions for the system.</p>
              {isAuthenticated ? (
                <CButton color="success" as={Link} to="/admin/users" className="mt-auto">
                  Manage Users
                </CButton>
              ) : (
                <CButton color="success" as={Link} to="/signup" className="mt-auto">
                  Create Account
                </CButton>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm={6} xl={4}>
          <CCard className="h-100">
            <CCardBody className="d-flex flex-column align-items-center text-center p-4">
              <CIcon icon={cilLockLocked} size="3xl" className="text-warning mb-3" />
              <h5>Security</h5>
              <p className="text-body-secondary">Role-based access control with JWT authentication and audit logs.</p>
              <CButton color="warning" as={Link} to={isAuthenticated ? '/admin/settings' : '/login'} className="mt-auto text-white">
                {isAuthenticated ? 'Settings' : 'Learn More'}
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <strong>Quick Start</strong>
            </CCardHeader>
            <CCardBody>
              <CCallout color="info" className="mb-0">
                <strong>Mock auth enabled:</strong> Use{' '}
                <code>demo@akferp.local</code> / <code>Demo@123</code> to sign in.
                Set <code>VITE_USE_MOCK_AUTH=true</code> in your environment.
              </CCallout>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}
