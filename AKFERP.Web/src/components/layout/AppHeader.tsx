import { useRef, useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconMenu2, IconSun, IconMoon, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { AppBreadcrumb } from './AppBreadcrumb';

type Props = {
  onToggleSidebar: () => void;
};

export function AppHeader({ onToggleSidebar }: Props) {
  const headerRef = useRef<HTMLElement>(null);
  const { session, isAuthenticated, logout } = useAuth();
  const { resolved, toggleLightDark } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      headerRef.current?.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  const initials = (() => {
    const email = session?.user.email ?? '';
    const local = email.split('@')[0] ?? '';
    const parts = local.split(/[._-]+/).filter(Boolean);
    if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0])
      return (parts[0][0] + parts[1][0]).toUpperCase();
    return (local.slice(0, 2) || '?').toUpperCase();
  })();

  return (
    <header className="navbar navbar-expand-md d-print-none" ref={headerRef}>
      <div className="container-xl">
        <button className="navbar-toggler" type="button" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <IconMenu2 size={20} />
        </button>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item me-2">
            <button
              className="nav-link px-0 btn border-0"
              onClick={toggleLightDark}
              title={`Theme: ${resolved}`}
            >
              {resolved === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </button>
          </div>

          {isAuthenticated ? (
            <div className={`nav-item dropdown${userMenuOpen ? ' show' : ''}`}>
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                onClick={(e) => { e.preventDefault(); setUserMenuOpen((p) => !p); }}
                aria-expanded={userMenuOpen}
              >
                <span className="avatar avatar-sm bg-primary text-white">{initials}</span>
                <div className="d-none d-xl-block ps-2">
                  <div className="small text-muted">{session?.user.email}</div>
                </div>
              </a>
              <div className={`dropdown-menu dropdown-menu-end${userMenuOpen ? ' show' : ''}`}>
                <button className="dropdown-item" onClick={logout}>
                  <IconLogout size={16} className="me-2" />
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="nav-item">
              <NavLink to="/login" className="nav-link">Log in</NavLink>
            </div>
          )}
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/records" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                Records
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-xl">
        <div className="page-pretitle mt-2">
          <AppBreadcrumb />
        </div>
      </div>
    </header>
  );
}
