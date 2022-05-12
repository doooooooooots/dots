import { ButtonOpenDetails, ButtonOpenSingle } from '@dots.cool/dots-system';
import React from 'react';
import StorageSingle from '../c_singles/single-storage';

const STORAGE_COLUMNS = {
  name: {
    field: 'name',
    width: 180,
    renderCell: ({ row }) => (
      <ButtonOpenSingle
        cellText={row.name}
        path={'cartes'}
        title={'Details du rack'}
        Component={StorageSingle}
        componentProps={{ id: row.id }}
        linkText={'Cartes'}
        count={row.offersCount}
      />
    ),
  },
  game: {
    field: 'game',
    valueGetter: ({ row }) => `${row?.game?.name || '-'}`,
  },
  stockUnits: {
    field: 'stockUnits',
    headerName: 'Cartes',
    align: 'left',
    flex: 1,
    renderCell: ({ row }) => (
      <ButtonOpenDetails
        path={'cartes'}
        title={'Details du rack'}
        component={() => null}
        linkText={'Cartes'}
        count={row.offersCount}
      />
    ),
  },
};

export default STORAGE_COLUMNS;
