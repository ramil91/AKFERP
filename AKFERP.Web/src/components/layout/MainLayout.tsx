import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

/** Shared chrome: header, nav, theme toggle, auth actions. */
export function MainLayout() {
  const { isAuthenticated, session, logout } = useAuth();
  const { resolved, toggleLightDark } = useTheme();

  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/" className="layout__brand">
          AKFERP
        </Link>
        <nav className="layout__nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Dashboard
            </NavLink>
          )}
        </nav>
        <div className="layout__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={toggleLightDark}
            title={`Theme: ${resolved} (click to toggle)`}
          >
            {resolved === 'dark' ? 'Light' : 'Dark'}
          </button>
          {isAuthenticated ? (
            <>
              <span className="muted layout__user">{session?.user.email}</span>
              <button type="button" className="btn" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">
                Log in
              </Link>
              <Link to="/signup" className="btn">
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
