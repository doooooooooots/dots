import { LayoutMain } from '@dots.cool/components';
import { Grid, Button } from '@mui/material';
import React from 'react';
import STORAGE_COLUMNS from '../../components/b_columns/storage';
import StorageDatagrid from '../../components/g_datagrids/storage-datagrid';
import { extractColumns } from '@dots.cool/utils';
import { useMemory } from '@dots.cool/form-builder';

const query = `
  id
  name
  game {
    name
  }
`;

const columns = extractColumns(STORAGE_COLUMNS, ['id', 'name', 'game']);
const views = [
  { id: 1, label: 'Status', value: 'status' },
  { id: 2, label: 'Personnes', value: 'people' },
  { id: 3, label: 'Clients', value: 'client' },
  { id: 4, label: 'Urgences', value: 'urgency' },
  { id: 5, label: 'Produits', value: 'product' },
];

const Storages = (props) => {
  const { actions } = useMemory();
  return (
    <>
      <Button onClick={actions.clearAllAction}>Clear local</Button>
      <StorageDatagrid
        {...props}
        columns={columns}
        query={query}
        views={views}
      />
    </>
  );
};

Storages.getLayout = (page) => (
  <Grid container>
    <LayoutMain>{page}</LayoutMain>
  </Grid>
);
export default Storages;

// TODO(Adrien): Import SSR LOGIC -- see getStaticObjects in pages/_utils
