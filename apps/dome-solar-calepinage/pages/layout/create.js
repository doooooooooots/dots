import { observer } from 'mobx-react';
import { Dialog, Grid, Box, Stack, Typography, Button } from '@mui/material';
import Toolbar from '../../src/components/layout/toolbar';
import TopBar from '../../src/components/layout/topbar-tabs';
import { useStore } from '../../src/context/useStore';
import {
  PAGE_PROJECT,
  SIDEBAR_WIDTH,
  TOPBAR_SIZE,
} from '../../src/constants/constants';
import MainCanvas from '../../src/components/layout/main-canvas';
import LayoutSidebar from '../../src/components/layout/sidebar';
import MainOnboarding from '../../src/components/layout/main-onboarding';
import DialogForms from '../../src/components/layout/dialog-forms';
import SidePreview from '../../src/components/layout/sidebar-preview';
import { AuthGuard } from '../../src/components/authentication/auth-guard';
import { useKey } from 'react-use';
import { toast } from 'react-hot-toast';

const PageCreateLayout = () => {
  const store = useStore();

  // useEffect(() => {
  //   const subscription = watch(() => {
  //     store.setNeedRerender(true);
  //   });
  //   return () => subscription.unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [watch]);

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      {/*//* TOPBAR */}
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          height: (theme) => theme.spacing(TOPBAR_SIZE),
          overflow: 'hidden',
        }}
      >
        <TopBar />
      </Box>

      {/*//* MAIN */}
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
        {/*//? Canvas */}
        {/*-> We need at least solarModules and a product */}
        <Grid item xs>
          {store.hasRequiredInfos() && store.hasConfirmedOnBoarding() ? (
            <MainCanvas />
          ) : (
            <MainOnboarding />
          )}
        </Grid>

        {/*//? Toolbar */}
        <Grid item width={36} sx={{ borderLeft: 1, borderColor: 'divider' }}>
          <Toolbar />
        </Grid>

        {/*//? Side */}
        <Grid
          item
          flex={`0 0 ${SIDEBAR_WIDTH}px`}
          sx={{ borderLeft: 1, borderColor: 'divider' }}
        >
          {store.getCurrentPage() !== 'preview' ? (
            <LayoutSidebar />
          ) : (
            <SidePreview />
          )}
        </Grid>
      </Grid>

      {/*//* Dialog */}
      <Dialog
        open={store.isDialogOpen()}
        onClose={store.closeDialog}
        maxWidth={store.dialog.open === PAGE_PROJECT ? 'lg' : 'sm'}
        fullWidth
      >
        <DialogForms />
      </Dialog>
    </Box>
  );
};

const LayoutCreate = observer(PageCreateLayout);

LayoutCreate.getLayout = function getLayout(page) {
  return <AuthGuard>{page}</AuthGuard>;
};

export default LayoutCreate;
