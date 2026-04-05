import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { CContainer } from '@coreui/react';

export function DefaultLayout() {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [sidebarUnfoldable, setSidebarUnfoldable] = useState(false);

  return (
    <div>
      <AppSidebar
        sidebarShow={sidebarShow}
        sidebarUnfoldable={sidebarUnfoldable}
        onVisibleChange={setSidebarShow}
        onToggleUnfoldable={() => setSidebarUnfoldable((p) => !p)}
      />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader onToggleSidebar={() => setSidebarShow((p) => !p)} />
        <div className="body flex-grow-1">
          <CContainer fluid className="px-4">
            <Outlet />
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}
