import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import {
  alpha,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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
import ProjectCreate from '../project/create';
import {
  PAGE_PRODUCT,
  PAGE_SOLAR_MODULE,
  PAGE_PROJECT,
  PAGE_CLADDING,
} from '../../src/constants';
import SolarModuleCreate from '../../src/components/form/solar-module-create';
import CladdingCreate from '../../src/components/form/cladding-create';
import { Close } from '@mui/icons-material';

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

  const { handleSubmit, watch } = methods;

  useEffect(() => {
    const subscription = watch(() => {
      store.setNeedRerender(true);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  const onSubmit = (data) => {
    Object.entries(data).map(([key, value]) => {
      if (value) {
        store.setUserData(key, value);
      }
    });
    store.renderView();
  };

  return (
    <FormProvider {...methods}>
      {/*//* TOPBAR */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <LinksButtons />
        </Stack>

        {/*//* MAIN */}
        <Grid container>
          {/*//? Toolbar */}
          <Grid item width={36} sx={{ borderRight: 1, borderColor: 'divider' }}>
            <Toolbar />
          </Grid>
          {/*//? Main */}
          <Grid item flex={1} sx={{ overflow: 'hidden', position: 'relative' }}>
            {store.getCurrentPage() === 'layout' && <TabLayout />}
            {store.getCurrentPage() === 'render' && <TabPreview />}
            {store.getCurrentPage() === 'preview' && <StepSummary />}
            {store.getNeedRerender() && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="100%"
                backgroundColor={(theme) =>
                  alpha(theme.palette.neutralTints[700], 0.5)
                }
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  p={3}
                  spacing={2}
                  backgroundColor="background.default"
                  borderRadius={1}
                  boxShadow={(theme) => theme.shadows[10]}
                >
                  <Typography variant="h6">You need to render</Typography>
                  <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
                    Render
                  </Button>
                </Stack>
              </Box>
            )}
          </Grid>
          {/*//? Side */}
          <Grid item width={280} sx={{ borderLeft: 1, borderColor: 'divider' }}>
            <LayoutSidebar />
          </Grid>
        </Grid>
      </Box>

      {/*//* Dialog */}
      <Dialog
        fullWidth
        maxWidth={store.dialog.open === PAGE_PROJECT ? 'xl' : 'sm'}
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
        <DialogContent>
          {store.dialog.open === PAGE_SOLAR_MODULE && <SolarModuleCreate />}
          {store.dialog.open === PAGE_PRODUCT && <div>Product</div>}
          {store.dialog.open === PAGE_PROJECT && <ProjectCreate />}
          {store.dialog.open === PAGE_CLADDING && <CladdingCreate />}
          {store.dialog.open === false && <Box sx={{ height: 400 }} />}
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
};

export default observer(LayoutByProjectId);
