import { CNavItem, CNavTitle, CNavGroup } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilUser,
  cilPeople,
} from '@coreui/icons';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management',
  },
  {
    component: CNavGroup,
    name: 'Employees',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'All Employees', to: '/admin/employees' },
      { component: CNavItem, name: 'Add Employee', to: '/admin/employees/new' },
    ],
  },
  {
    component: CNavGroup,
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'All Users', to: '/admin/users' },
      { component: CNavItem, name: 'Add User', to: '/admin/users/new' },
    ],
  },
];

export default _nav;
