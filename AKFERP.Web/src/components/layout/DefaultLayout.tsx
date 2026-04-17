import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';

export function DefaultLayout() {
  const [sidebarShow, setSidebarShow] = useState(true);

  return (
    <div className="page">
      <AppSidebar
        sidebarShow={sidebarShow}
        onToggleSidebar={() => setSidebarShow((p) => !p)}
      />
      <div className="page-wrapper">
        <AppHeader onToggleSidebar={() => setSidebarShow((p) => !p)} />
        <Outlet />
        <AppFooter />
      </div>
    </div>
  );
}
