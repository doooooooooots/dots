import * as React from 'react';
import { useStore } from '../../context/useStore';
import { observer } from 'mobx-react';
import { Dialog, DialogContent } from '@mui/material';
import SidebarLayoutTest from './sidebar-layout-test';
import SidebarObstacles from './sidebar-layout-obstacles';
import dynamic from 'next/dynamic';
import SidebarLayoutExport from './sidebar-layout-export';

// Allow svg import
const SidebarAlignment = dynamic(() => import('./sidebar-layout-alignment'), {
  ssr: false,
});

function SideDefault() {
  const store = useStore();
  const { getActionMode, getRelatedData } = store;

  //-> Dialog
  const [open, setOpen] = React.useState(false);
  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      {getActionMode() === 'alignment' && <SidebarAlignment />}
      {getActionMode() === 'obstacles' && <SidebarObstacles />}
      {getActionMode() === 'tests' && <SidebarLayoutTest />}
      {getActionMode() === 'export' && <SidebarLayoutExport />}

      {/*//* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogContent>
          <pre>
            <code>
              {JSON.stringify(getRelatedData('massBalance'), null, 2)}
            </code>
          </pre>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default observer(SideDefault);
