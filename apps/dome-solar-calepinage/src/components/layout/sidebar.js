import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import SideBarLayout from './sidebar-layout';
import SideBarSelect from './sidebar-select';
import SidePreview from './sidebar-preview';
import SidebarPdf from './sidebar-pdf';

const LayoutSidebar = () => {
  const store = useStore();

  // if (!store.hasRequiredInfos()) return null;

  if (store.getCurrentPage() === 'preview') return <SidePreview />;
  if (store.getCurrentPage() === 'pdf') return <SidebarPdf />;
  if (store.allSelected().length !== 0) return <SideBarSelect />;

  return <SideBarLayout />;
};

export default observer(LayoutSidebar);
