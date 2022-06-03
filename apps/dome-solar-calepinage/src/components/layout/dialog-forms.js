import React from 'react';
import { Close } from '@mui/icons-material';

import {
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  PAGE_PRODUCT,
  PAGE_SOLAR_MODULE,
  PAGE_PROJECT,
  PAGE_CLADDING,
  PAGE_ROOF,
} from '../../constants';

import SolarModuleCreate from '../form/solar-module-create';
import ProjectFormCreate from '../form/project-create';
import CladdingCreate from '../form/cladding-create';
import { Box } from '@mui/system';
import { useStore } from '../context/useStore';
import RoofFormCreate from '../form/roof-create';

const getDialogTitle = (open) => {
  switch (open) {
    case PAGE_SOLAR_MODULE:
      return 'Créer un panneau solaire';
    case PAGE_PRODUCT:
      return 'Creér un produit';
    case PAGE_PROJECT:
      return 'Créer un projet';
    case PAGE_CLADDING:
      return 'Créer un bac acier';
    case PAGE_ROOF:
      return 'Créer une toiture';
    default:
      return '';
  }
};

function DialogForms() {
  const store = useStore();

  return (
    <>
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
        {store.dialog.open === PAGE_PROJECT && <ProjectFormCreate />}
        {store.dialog.open === PAGE_ROOF && <RoofFormCreate />}
        {store.dialog.open === PAGE_CLADDING && <CladdingCreate />}
        {store.dialog.open === PAGE_SOLAR_MODULE && <SolarModuleCreate />}
        {store.dialog.open === PAGE_PRODUCT && <div>Product</div>}
        {store.dialog.open === false && <Box sx={{ height: 400 }} />}
      </DialogContent>
    </>
  );
}

export default DialogForms;
