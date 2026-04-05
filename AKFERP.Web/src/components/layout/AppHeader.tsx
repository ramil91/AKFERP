import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavItem,
  CNavLink,
  CAvatar,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMenu, cilSun, cilMoon, cilAccountLogout } from '@coreui/icons';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { AppBreadcrumb } from './AppBreadcrumb';

type Props = {
  onToggleSidebar: () => void;
};

export function AppHeader({ onToggleSidebar }: Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const { session, isAuthenticated, logout } = useAuth();
  const { resolved, toggleLightDark } = useTheme();

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
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler onClick={onToggleSidebar} style={{ marginInlineStart: '-14px' }}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/dashboard">Dashboard</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink as={NavLink} to="/admin/records">Records</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink as="button" className="btn border-0" onClick={toggleLightDark} title={`Theme: ${resolved}`}>
              <CIcon icon={resolved === 'dark' ? cilSun : cilMoon} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>
          <li className="nav-item py-1"><div className="vr h-100 mx-2 text-body text-opacity-75" /></li>
          {isAuthenticated ? (
            <CDropdown variant="nav-item" placement="bottom-end">
              <CDropdownToggle caret={false} className="py-0 pe-0">
                <CAvatar color="primary" textColor="white" size="md">{initials}</CAvatar>
              </CDropdownToggle>
              <CDropdownMenu className="pt-0">
                <CDropdownItem disabled className="fw-semibold text-truncate" style={{ maxWidth: 200 }}>
                  {session?.user.email}
                </CDropdownItem>
                <CDropdownItem as="button" onClick={logout}>
                  <CIcon icon={cilAccountLogout} className="me-2" />
                  Log out
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          ) : (
            <CNavItem>
              <CNavLink as={NavLink} to="/login">Log in</CNavLink>
            </CNavItem>
          )}
        </CHeaderNav>
      </CContainer>

      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
}
