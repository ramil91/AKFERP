import { Link, useLocation } from 'react-router-dom';

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
  '/admin/projects': 'Projects',
  '/admin/projects/new': 'Add Project',
  '/admin/parties': 'Parties',
  '/admin/parties/new': 'Add Party',
  '/admin/analytics': 'Analytics',
  '/admin/profile': 'Profile',
  '/admin/settings': 'Settings',
};

const EDIT_PATTERNS = [
  { regex: /^\/admin\/employees\/[^/]+\/edit$/, name: 'Edit Employee', parent: '/admin/employees' },
  { regex: /^\/admin\/users\/[^/]+\/edit$/, name: 'Edit User', parent: '/admin/users' },
  { regex: /^\/admin\/projects\/[^/]+\/edit$/, name: 'Edit Project', parent: '/admin/projects' },
  { regex: /^\/admin\/parties\/[^/]+\/edit$/, name: 'Edit Party', parent: '/admin/parties' },
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
    <ol className="breadcrumb" aria-label="breadcrumbs">
      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
      {crumbs
        .filter((c) => c.pathname !== '/')
        .map((c) =>
          c.active ? (
            <li key={c.pathname} className="breadcrumb-item active" aria-current="page">{c.name}</li>
          ) : (
            <li key={c.pathname} className="breadcrumb-item"><Link to={c.pathname}>{c.name}</Link></li>
          ),
        )}
    </ol>
  );
}
