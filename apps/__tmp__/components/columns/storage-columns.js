import React from 'react';
import ButtonOpenDetails from '../btn-open-details';
import Storage from './../../../pages/storage/[id]';
import ButtonOpenSingle from './../btn-open-single';

export const STORAGE_COLUMNS = {
  name: {
    field: 'name',
    width: 180,
    renderCell: ({ row }) => (
      <ButtonOpenSingle
        cellText={row.name}
        path={'cartes'}
        title={'Details du rack'}
        component={<Storage id={row.id} />}
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
