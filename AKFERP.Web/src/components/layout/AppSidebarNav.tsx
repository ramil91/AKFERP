import { NavLink } from 'react-router-dom';
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import type { ReactNode } from 'react';

type NavBadge = { color: string; text: string };
type NavItemDef = {
  component: React.ElementType;
  name: string | ReactNode;
  to?: string;
  href?: string;
  icon?: ReactNode;
  badge?: NavBadge;
  items?: NavItemDef[];
  [key: string]: unknown;
};

function renderLink(name: string | ReactNode, icon?: ReactNode, badge?: NavBadge, indent = false) {
  return (
    <>
      {icon || (indent && <span className="nav-icon"><span className="nav-icon-bullet" /></span>)}
      {name && name}
      {badge && <CBadge color={badge.color} className="ms-auto">{badge.text}</CBadge>}
    </>
  );
}

function renderItem(item: NavItemDef, index: number, indent = false) {
  const { component: Component, name, badge, icon, ...rest } = item;
  return (
    <Component key={index} {...rest}>
      {rest.to || rest.href ? (
        <CNavLink as={NavLink} {...(rest.to ? { to: rest.to } : { href: rest.href })}>
          {renderLink(name, icon, badge, indent)}
        </CNavLink>
      ) : (
        renderLink(name, icon, badge, indent)
      )}
    </Component>
  );
}

function renderGroup(item: NavItemDef, index: number) {
  const { component: Component, name, icon, items, ...rest } = item;
  return (
    <Component key={index} toggler={renderLink(name, icon)} {...rest}>
      {items?.map((child, i) =>
        child.items ? renderGroup(child, i) : renderItem(child, i, true),
      )}
    </Component>
  );
}

export function AppSidebarNav({ items }: { items: NavItemDef[] }) {
  return (
    <CSidebarNav as={SimpleBar}>
      {items.map((item, i) => (item.items ? renderGroup(item, i) : renderItem(item, i)))}
    </CSidebarNav>
  );
}
