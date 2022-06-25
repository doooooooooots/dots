import React from 'react';
import { Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useStore } from '../../../contexts/useStore';

function SideInfobox(props) {
  const { sx = { p: 2 } } = props;
  const store = useStore();

  return (
    <Box sx={sx}>
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
