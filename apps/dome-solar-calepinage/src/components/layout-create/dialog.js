import React from 'react';
import { useStore } from '../../contexts/useStore';

import {
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { Box } from '@mui/system';

import {
  PAGE_PRODUCT,
  PAGE_SOLAR_MODULE,
  PAGE_PROJECT,
  PAGE_CLADDING,
  PAGE_ROOF,
  PAGE_LAYOUT,
} from '../../constants/constants';

import SolarModuleCreate from './forms/solar-module-create';
import ProjectFormCreate from './forms/project-create';
import CladdingCreate from './forms/cladding-create';
import RoofFormCreate from './forms/roof-create';
import LayoutFormCreate from './forms/layout-create';
import EntityCreate from './forms/entity-create';

const TITLES = {
  [PAGE_SOLAR_MODULE]: 'Créer un panneau solaire',
  [PAGE_PRODUCT]: 'Creér un produit',
  [PAGE_PROJECT]: 'Créer un projet',
  [PAGE_CLADDING]: 'Créer un bac acier',
  [PAGE_ROOF]: 'Créer une toiture',
  [PAGE_LAYOUT]: 'Créer un calepinage',
};

function DialogForms() {
  const store = useStore();
  const open = store.getCurrentOpen();

  return (
    <>
      <DialogTitle sx={{ bgcolor: 'background.default' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">{TITLES[open]}</Typography>
          <IconButton size="small" onClick={store.closeDialog}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ bgcolor: 'background.default' }}>
        {open && <EntityCreate entityName={open} />}
        {/* {open === PAGE_LAYOUT && <LayoutFormCreate />} */}
        {/* {open === PAGE_ROOF && <RoofFormCreate />} */}
        {/* {open === PAGE_CLADDING && <CladdingCreate />} */}
        {/* {open === PAGE_SOLAR_MODULE && <SolarModuleCreate />} */}
        {/* {open === PAGE_PRODUCT && <div>Product</div>} */}
        {/* {open === false && <Box sx={{ height: 400 }} />} */}
      </DialogContent>
    </>
  );
}

export default DialogForms;
