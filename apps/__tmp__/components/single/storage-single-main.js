import StockUnitCreate from '@components/forms/stock-unit-create';
import { useHistory } from '@hooks/use-history-shared';
import { Typography } from '@mui/material';
import React, { useCallback } from 'react';
import PreviewStockUnits from '@components/datagrid/stock-units-preview';
import SingleMainTitle from '../layouts/single-main-title';
import StockUnits from '@pages/stock-unit';

function StorageSingleMain(props) {
  const { item } = props;
  const { id } = item;
  const { push } = useHistory();

  const handleClickAction = useCallback(() => {
    push({ path: 'stockUnit.create', title: 'Ajouter une unité', component: <StockUnitCreate /> });
  }, [push]);

  const handleFullClick = useCallback(() => {
    push({
      title: 'Test',
      path: 'full',
      component: <StockUnits filter={{ storage: { id: { equals: id } } }} />
    });
  }, [id, push]);

  return (
    <>
      <SingleMainTitle title={item.name} />
      <Typography variant='h1'></Typography>
      <PreviewStockUnits
        actionText='Créer'
        onActionClick={handleClickAction}
        onFullClick={handleFullClick}
        where={{ storage: { id: { equals: item.id } } }}
      />
    </>
  );
}

export default StorageSingleMain;
