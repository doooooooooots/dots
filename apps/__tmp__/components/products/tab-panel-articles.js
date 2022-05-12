import React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Stack, Typography } from '@mui/material';
import createArticleColumns from '@helpers/stock-units/columns';
import StyledTabsHorizontal from '@components/StyledTabsHorizontal';
import StyledTabHorizontal from '@components/StyledTabHorizontal';

export default function TabPanelArticles() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const rows = [];

  return (
    <Stack width={'100%'} height='calc(100vh - 100px)'>
      <Typography variant='h4'>Products</Typography>
      <StyledTabsHorizontal value={value} onChange={handleChange} sx={{ mb: 2 }}>
        <StyledTabHorizontal label='Not started' />
        <StyledTabHorizontal label='Assigned' />
        <StyledTabHorizontal label='Finished' />
      </StyledTabsHorizontal>
      <DataGridPro rows={rows} columns={createArticleColumns(['id', 'image', 'nameFr'])} density='compact' />
    </Stack>
  );
}
