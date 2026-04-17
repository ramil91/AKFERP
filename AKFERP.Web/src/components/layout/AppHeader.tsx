import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconMenu2, IconSun, IconMoon, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { AppBreadcrumb } from './AppBreadcrumb';

type Props = {
  onToggleSidebar: () => void;
};

export function AppHeader({ onToggleSidebar }: Props) {
  const { session, isAuthenticated, logout } = useAuth();
  const { resolved, toggleLightDark } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const initials = (() => {
    const email = session?.user.email ?? '';
    const local = email.split('@')[0] ?? '';
    const parts = local.split(/[._-]+/).filter(Boolean);
    if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0])
      return (parts[0][0] + parts[1][0]).toUpperCase();
    return (local.slice(0, 2) || '?').toUpperCase();
  })();

  return (
    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row g-2 align-items-center">
          <div className="col-auto d-lg-none">
            <button className="btn btn-ghost-secondary btn-icon" onClick={onToggleSidebar} aria-label="Toggle sidebar">
              <IconMenu2 size={20} />
            </button>
          </div>
          <div className="col">
            <AppBreadcrumb />
          </div>
          <div className="col-auto ms-auto d-flex align-items-center gap-2">
            <button
              className="btn btn-ghost-secondary btn-icon"
              onClick={toggleLightDark}
              title={`Theme: ${resolved}`}
            >
              {resolved === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
            </button>

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
              <NavLink to="/login" className="btn btn-outline-primary btn-sm">Log in</NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
