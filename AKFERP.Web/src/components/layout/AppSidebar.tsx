import { AppSidebarNav } from './AppSidebarNav';
import navigation from '@/_nav';

type Props = {
  sidebarShow: boolean;
  onToggleSidebar: () => void;
};

export function AppSidebar({ sidebarShow, onToggleSidebar }: Props) {
  return (
    <aside className={`navbar navbar-vertical navbar-expand-lg navbar-dark${sidebarShow ? ' show' : ''}`}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a href="/" className="navbar-brand navbar-brand-autodark">
          <img src="/alkhidmat-logo.png" alt="ALKHIDMAT" height={40} style={{ objectFit: 'contain' }} />
        </a>
        <div className={`navbar-collapse${sidebarShow ? ' show' : ' collapse'}`}>
          <AppSidebarNav items={navigation} />
        </div>
      </div>
    </aside>
  );
}
