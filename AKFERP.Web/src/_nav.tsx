import { IconDashboard, IconUsers, IconUserPlus, IconUser, IconCategory } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export type NavItemDef = {
  label: string;
  to?: string;
  icon?: ReactNode;
  children?: NavItemDef[];
  isTitle?: boolean;
};

const _nav: NavItemDef[] = [
  {
    label: 'Dashboard',
    to: '/admin/dashboard',
    icon: <IconDashboard size={20} />,
  },
  {
    label: 'Management',
    isTitle: true,
  },
  {
    label: 'Employees',
    icon: <IconUsers size={20} />,
    children: [
      { label: 'All Employees', to: '/admin/employees' },
      { label: 'Add Employee', to: '/admin/employees/new', icon: <IconUserPlus size={20} /> },
    ],
  },
  {
    label: 'Users',
    icon: <IconUser size={20} />,
    children: [
      { label: 'All Users', to: '/admin/users' },
      { label: 'Add User', to: '/admin/users/new' },
    ],
  },
];

export default _nav;
