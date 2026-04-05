import { Link } from 'react-router-dom';
import {
  CButton,
  CCol,
  CContainer,
  CRow,
} from '@coreui/react';

export function NotFoundPage() {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6} className="text-center">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h4 className="mb-2">Oops! Page not found.</h4>
            <p className="text-body-secondary mb-4">
              The page you are looking for was not found. You may have mistyped the URL or the page has been moved.
            </p>
            <CButton color="primary" as={Link} to="/">
              Back to Home
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}
