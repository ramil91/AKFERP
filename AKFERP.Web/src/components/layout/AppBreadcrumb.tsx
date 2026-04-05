import { useLocation } from 'react-router-dom';
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react';

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/login': 'Login',
  '/signup': 'Register',
  '/admin': 'Admin',
  '/admin/dashboard': 'Dashboard',
  '/admin/records': 'Records',
  '/admin/records/new': 'Add Record',
  '/admin/employees': 'Employees',
  '/admin/employees/new': 'Add Employee',
  '/admin/users': 'Users',
  '/admin/users/new': 'Add User',
  '/admin/analytics': 'Analytics',
  '/admin/profile': 'Profile',
  '/admin/settings': 'Settings',
};

const EDIT_PATTERNS = [
  { regex: /^\/admin\/employees\/[^/]+\/edit$/, name: 'Edit Employee', parent: '/admin/employees' },
];

export function AppBreadcrumb() {
  const currentPath = useLocation().pathname;

  const crumbs: { name: string; pathname: string; active: boolean }[] = [];
  currentPath.split('/').reduce((prev, curr, idx, arr) => {
    const path = `${prev}/${curr}`.replace('//', '/');
    const name = routeNames[path];
    if (name) {
      crumbs.push({ name, pathname: path, active: idx + 1 === arr.length });
    }
    return path;
  });

  if (crumbs.length === 0 || !crumbs[crumbs.length - 1]?.active) {
    const match = EDIT_PATTERNS.find((p) => p.regex.test(currentPath));
    if (match) {
      const parentName = routeNames[match.parent];
      if (parentName && !crumbs.some((c) => c.pathname === match.parent)) {
        crumbs.push({ name: parentName, pathname: match.parent, active: false });
      }
      crumbs.push({ name: match.name, pathname: currentPath, active: true });
    }
  }

  return (
    <CBreadcrumb className="my-0">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {crumbs
        .filter((c) => c.pathname !== '/')
        .map((c) => (
          <CBreadcrumbItem key={c.pathname} {...(c.active ? { active: true } : { href: c.pathname })}>
            {c.name}
          </CBreadcrumbItem>
        ))}
    </CBreadcrumb>
  );
}
