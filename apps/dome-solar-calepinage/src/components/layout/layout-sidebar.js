import { useStore } from '../context/useStore';
import { observer } from 'mobx-react';
import SideDefault from './side-default';
import SideSelect from './side-select';

const LayoutSidebar = () => {
  const store = useStore();

  return (
    <>
      {store.allSelected().length === 0 && <SideDefault />}
      {store.allSelected().length !== 0 && <SideSelect />}
    </>
  );
};

export default observer(LayoutSidebar);
