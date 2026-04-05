import { useCallback } from 'react';
import { CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import { AppSidebarNav } from './AppSidebarNav';
import navigation from '@/_nav';

type Props = {
  sidebarShow: boolean;
  sidebarUnfoldable: boolean;
  onVisibleChange: (v: boolean) => void;
  onToggleUnfoldable: () => void;
};

export function AppSidebar({ sidebarShow, sidebarUnfoldable, onVisibleChange, onToggleUnfoldable }: Props) {
  const handleVisible = useCallback((v: boolean) => onVisibleChange(v), [onVisibleChange]);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={handleVisible}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand className="d-flex align-items-center gap-2" as="a" href="/">
          <img src="/alkhidmat-logo.png" alt="ALKHIDMAT" height={40} style={{ objectFit: 'contain' }} />
        </CSidebarBrand>
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={onToggleUnfoldable} />
      </CSidebarFooter>
    </CSidebar>
  );
}
