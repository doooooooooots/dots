import { observer } from 'mobx-react';
import { Dialog, Grid, Box } from '@mui/material';
import Toolbar from '../../src/components/layout/toolbar';
import TopBar from '../../src/components/layout/topbar-tabs';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStore } from '../../src/components/context/useStore';
import { PAGE_PROJECT, SIDEBAR_WIDTH, TOPBAR_SIZE } from '../../src/constants';
import MainCanvas from '../../src/components/layout/main-canvas';
import LayoutSidebar from '../../src/components/layout/sidebar';
import MainOnboarding from '../../src/components/layout/main-onboarding';
import DialogForms from '../../src/components/layout/dialog-forms';
import SidePreview from '../../src/components/layout/sidebar-preview';

const LayoutByProjectId = () => {
  const store = useStore();

  const methods = useForm({
    defaultValues: {
      Tx: store.getUserDatas('Tx'),
      Ty: store.getUserDatas('Ty'),
    },
  });

  const { watch } = methods;

  useEffect(() => {
    const subscription = watch(() => {
      store.setNeedRerender(true);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <FormProvider {...methods}>
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
          {/*//? Toolbar */}
          <Grid item width={36} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Toolbar />
          </Grid>

          {/*//? Canvas */}
          {/*-> We need at least solarModules and a product */}
          <Grid item xs>
            {store.hasRequiredInfos() && store.hasConfirmedOnBoarding() ? (
              <MainCanvas />
            ) : (
              <MainOnboarding />
            )}
          </Grid>

          {/*//? Side */}
          <Grid
            item
            flex={`0 0 ${store.hasRequiredInfos() ? SIDEBAR_WIDTH : 35}px`}
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
    </FormProvider>
  );
};

export default observer(LayoutByProjectId);
