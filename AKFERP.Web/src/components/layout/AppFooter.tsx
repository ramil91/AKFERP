import { CFooter } from '@coreui/react';

export function AppFooter() {
  return (
    <CFooter className="px-4">
      <div>
        <span className="me-1">&copy; {new Date().getFullYear()}</span>
        <a href="/" className="text-decoration-none">ALKHIDMAT</a>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
          CoreUI for React
        </a>
      </div>
    </CFooter>
  );
}
