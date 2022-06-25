import { observer } from 'mobx-react';
import { Dialog as MuiDialog, Grid, Box } from '@mui/material';
import { useStore } from '../../src/contexts/useStore';
import {
  Topbar,
  Main,
  Toolbar,
  Sidebar,
  Dialog,
} from '../../src/components/layout-create';

import {
  PAGE_PROJECT,
  SIDEBAR_WIDTH,
  TOPBAR_SIZE,
} from '../../src/constants/constants';

const PageCreateLayout = () => {
  const store = useStore();

  const { dialog, closeDialog, isDialogOpen } = store;
  const isOpen = isDialogOpen();

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      {/* TOPBAR */}
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: (theme) => theme.spacing(TOPBAR_SIZE),
          overflow: 'hidden',
        }}
      >
        <Topbar />
      </Box>

      {/* MAIN */}
      <Grid
        container
        sx={{
          pt: TOPBAR_SIZE,
          width: '100%',
          height: '100vh',
          typography: 'body1',
          overflow: 'hidden',
          flexWrap: 'nowrap',
        }}
      >
        <Grid item xs>
          <Main />
        </Grid>

        {/* Toolbar */}
        <Grid item width={36} sx={{ borderLeft: 1, borderColor: 'divider' }}>
          <Toolbar />
        </Grid>

        {/* Side */}
        <Grid
          item
          flex={`0 0 ${SIDEBAR_WIDTH}px`}
          sx={{ borderLeft: 1, borderColor: 'divider' }}
        >
          <Sidebar />
        </Grid>
      </Grid>

      {/*Dialog */}
      <MuiDialog
        open={isOpen}
        onClose={closeDialog}
        maxWidth={dialog.open === PAGE_PROJECT ? 'lg' : 'sm'}
        fullWidth
      >
        <Dialog />
      </MuiDialog>
    </Box>
  );
};

const LayoutCreate = observer(PageCreateLayout);

LayoutCreate.getLayout = function getLayout(page) {
  return page;
  // return <AuthGuard>{page}</AuthGuard>;
};

export default LayoutCreate;
