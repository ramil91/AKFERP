import { IconDashboard, IconUsers, IconUserPlus, IconUser, IconCategory, IconBriefcase, IconUserCheck } from '@tabler/icons-react';
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
  {
    label: 'Projects',
    icon: <IconBriefcase size={20} />,
    children: [
      { label: 'All Projects', to: '/admin/projects' },
      { label: 'Add Project', to: '/admin/projects/new' },
    ],
  },
  {
    label: 'Parties',
    icon: <IconUserCheck size={20} />,
    children: [
      { label: 'All Parties', to: '/admin/parties' },
      { label: 'Add Party', to: '/admin/parties/new' },
    ],
  },
];

export default _nav;
