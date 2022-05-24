import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import {
  alpha,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import TabLayout from '../../src/components/layout/tab-layout';
import LayoutSidebar from '../../src/components/layout/layout-sidebar';
import Toolbar from '../../src/components/layout/toolbar';
import LinksButtons from '../../src/components/layout/links-buttons';
import TabPreview from '../../src/components/layout/tab-preview';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useStore } from '../../src/components/context/useStore';
import StepSummary from '../../src/components/StepSummary';
import {
  PAGE_PRODUCT,
  PAGE_SOLAR_MODULE,
  PAGE_PROJECT,
  PAGE_CLADDING,
} from '../../src/constants';
import SolarModuleCreate from '../../src/components/form/solar-module-create';
import CladdingCreate from '../../src/components/form/cladding-create';
import { Close } from '@mui/icons-material';
import ProjectFormCreate from '../../src/components/form/project-create';
import { isEmpty } from 'lodash';
import RenderActionOverlay from '../../src/components/render-action-overlay';
import OnboardingLayout from '../../src/components/onboarding-layout';

const getDialogTitle = (open) => {
  switch (open) {
    case PAGE_SOLAR_MODULE:
      return 'Créer un panneau solaire';
    case PAGE_PRODUCT:
      return 'Creér un produit';
    case PAGE_PROJECT:
      return 'Créer un projet';
    case PAGE_CLADDING:
      return 'Créer un panneau';
    default:
      return '';
  }
};

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
      <Grid
        container
        sx={{
          width: '100%',
          height: '100vh',
          typography: 'body1',
          overflow: 'hidden',
        }}
      >
        {/*//* TOPBAR */}
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <LinksButtons />
          </Stack>
        </Grid>

        {/*//* MAIN */}
        <Grid container item xs={12} sx={{ height: '100%' }}>
          {/*//? Toolbar */}
          <Grid item width={36} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Toolbar />
          </Grid>
          {/*//? Main */}
          <Grid item xs sx={{ overflow: 'hidden', position: 'relative' }}>
            {/*//? We need at least solarModules and a product */}
            {isEmpty(store.getRelatedData('solarModule')) ||
            isEmpty(store.getRelatedData('product')) ? (
              <OnboardingLayout />
            ) : (
              <>
                {store.getCurrentPage() === 'layout' && <TabLayout />}
                {store.getCurrentPage() === 'render' && <TabPreview />}
                {store.getCurrentPage() === 'preview' && <StepSummary />}
                {store.getNeedRerender() && <RenderActionOverlay />}
              </>
            )}
          </Grid>
          {/*//? Side */}
          <Grid item width={280} sx={{ borderLeft: 1, borderColor: 'divider' }}>
            <LayoutSidebar />
          </Grid>
        </Grid>
      </Grid>

      {/*//* Dialog */}
      <Dialog
        fullWidth
        maxWidth={store.dialog.open === PAGE_PROJECT ? 'lg' : 'sm'}
        open={store.isDialogOpen()}
        onClose={store.closeDialog}
      >
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">
              {getDialogTitle(store.dialog.open)}
            </Typography>
            <IconButton size="small" onClick={store.closeDialog}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {store.dialog.open === PAGE_SOLAR_MODULE && <SolarModuleCreate />}
          {store.dialog.open === PAGE_PRODUCT && <div>Product</div>}
          {store.dialog.open === PAGE_PROJECT && <ProjectFormCreate />}
          {store.dialog.open === PAGE_CLADDING && <CladdingCreate />}
          {store.dialog.open === false && <Box sx={{ height: 400 }} />}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default observer(LayoutByProjectId);
