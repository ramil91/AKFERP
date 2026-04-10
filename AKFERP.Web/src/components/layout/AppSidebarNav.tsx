import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconChevronDown } from '@tabler/icons-react';
import type { NavItemDef } from '@/_nav';

function NavItem({ item }: { item: NavItemDef }) {
  if (item.isTitle) {
    return <li className="nav-item nav-item-header pt-3 pb-1 px-3 text-uppercase text-xs text-muted">{item.label}</li>;
  }

  if (item.to) {
    return (
      <li className="nav-item">
        <NavLink to={item.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
          <span className="nav-link-icon d-md-none d-lg-inline-block">{item.icon}</span>
          <span className="nav-link-title">{item.label}</span>
        </NavLink>
      </li>
    );
  }

  return null;
}

function NavGroup({ item }: { item: NavItemDef }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`nav-item dropdown${open ? ' show' : ''}`}>
      <a
        className={`nav-link dropdown-toggle${open ? '' : ' collapsed'}`}
        href="#"
        onClick={(e) => { e.preventDefault(); setOpen((p) => !p); }}
        aria-expanded={open}
      >
        <span className="nav-link-icon d-md-none d-lg-inline-block">{item.icon}</span>
        <span className="nav-link-title">{item.label}</span>
        <IconChevronDown size={16} className="nav-link-toggle-icon ms-auto" />
      </a>
      <div className={`dropdown-menu${open ? ' show' : ''}`}>
        <div className="dropdown-menu-columns">
          <div className="dropdown-menu-column">
            {item.children?.map((child, i) => (
              child.to ? (
                <NavLink key={i} to={child.to} className={({ isActive }) => `dropdown-item${isActive ? ' active' : ''}`}>
                  {child.label}
                </NavLink>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}

export function AppSidebarNav({ items }: { items: NavItemDef[] }) {
  return (
    <ul className="navbar-nav pt-lg-3">
      {items.map((item, i) =>
        item.children ? <NavGroup key={i} item={item} /> : <NavItem key={i} item={item} />,
      )}
    </ul>
  );
}
