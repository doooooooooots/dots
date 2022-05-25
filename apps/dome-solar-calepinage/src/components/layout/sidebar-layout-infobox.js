import React from 'react';
import { Box, Typography } from '@mui/material';
import { round } from 'lodash';
import { observer } from 'mobx-react';
import { useStore } from '../context/useStore';

function SideInfobox() {
  const store = useStore();

  return (
    <Box p={2}>
      <Typography variant="h6">
        Nombre de panneaux : {store.totalModules()}
      </Typography>
      <Typography>Colonnes : {store.getCurrentMaxCol()}</Typography>
      <Typography>Rangées : {store.getCurrentMaxRow()}</Typography>
      <Typography>
        {`Puissance totale : ${store.getTotalPower()} kWc`}
      </Typography>
    </Box>
  );
}

export default observer(SideInfobox);
