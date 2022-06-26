import { useStore } from '../../contexts/useStore';
import { observer } from 'mobx-react';

import SideBarLayout from './sidebar/sidebar-layout';
import SideBarSelect from './sidebar/sidebar-select';
import SidePreview from './sidebar/sidebar-preview';
import SidebarPdf from './sidebar/sidebar-pdf';

const LayoutSidebar = () => {
  const store = useStore();
  const { hasRequiredInfos, getCurrentPage } = store;

  const currentPage = getCurrentPage();

  if (!hasRequiredInfos()) return null;
  if (currentPage === 'preview') return <SidePreview />;
  if (currentPage === 'pdf') return <SidebarPdf />;
  if (store.allSelected().length !== 0) return <SideBarSelect />;
  return <SideBarLayout />;
};

export default observer(LayoutSidebar);
