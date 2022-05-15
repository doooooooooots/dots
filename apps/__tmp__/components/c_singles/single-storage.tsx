import React from 'react';
import { Typography, Stack, Chip } from '@mui/material';
import StockUnitDatagrid from '../g_datagrids/stock-units-datagrid';
import { Box } from '@mui/system';
import { FIND_ONE } from '@dots.cool/tokens';
import withQuery from '../b_hoc/with-query';

function SingleStorage(props) {
  const { loading, data, refetch } = props;

  if (loading) return null;
  const { storage } = data;

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Typography variant="h2">{storage.name}</Typography>
        <Chip label={storage.game.name} />
      </Stack>
      <StockUnitDatagrid variant="preview" lang={'fr'} />
    </Box>
  );
}

export default withQuery('storage')(true)(FIND_ONE)(SingleStorage);
