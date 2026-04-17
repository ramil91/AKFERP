import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppSidebarNav } from './AppSidebarNav';
import navigation from '@/_nav';

type Props = {
  sidebarShow: boolean;
  onToggleSidebar: () => void;
};

export function AppSidebar({ sidebarShow, onToggleSidebar }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (sidebarShow && window.innerWidth < 992) onToggleSidebar();
  }, [pathname]);

  return (
    <>
      {sidebarShow && (
        <div className="sidebar-overlay" onClick={onToggleSidebar} />
      )}
      <aside
        className={`navbar navbar-vertical navbar-expand-lg${sidebarShow ? ' show' : ''}`}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h1 className="navbar-brand">
            <a href="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <img
                src="/alkhidmat-logo.png"
                alt="ALKHIDMAT"
                width={36}
                height={36}
                className="navbar-brand-image rounded"
                style={{ objectFit: 'contain' }}
              />
              <span className="fw-bold text-white" style={{ fontSize: '1.1rem', lineHeight: 1.2 }}>
                AKF<span className="fw-normal" style={{ opacity: 0.7 }}>ERP</span>
              </span>
            </a>
          </h1>
          <div className={`navbar-collapse${sidebarShow ? ' show' : ' collapse'}`} id="sidebar-menu">
            <AppSidebarNav items={navigation} />
          </div>
        </div>
      </aside>
    </>
  );
}
