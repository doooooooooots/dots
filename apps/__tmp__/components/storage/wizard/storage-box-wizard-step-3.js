import { Box } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { isEmpty } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { getMultiple as getInventories } from '@api/inventory-api';
import { getMultiple as getProducts } from '@api/product-api';
import { CONDITIONS } from '@enums/conditions';
import useConnectedForm from '@hooks/use-connected-form';
import { useDatagrid } from '@hooks/use-datagrid';
import createArticleColumns from '@helpers/stock-units/columns';

export default function StorageBoxWizardStep3() {
  const { rows, loadRows, selectionModel, onSelectionModelChange } = useDatagrid();
  const { form } = useConnectedForm();
  const { expansionIdIn, expansionFrom, expansionTo, conditionFrom, conditionTo, numberFrom, numberTo } = form;

  useEffect(() => {
    const asyncFetch = async () => {
      let products = [];

      if (!isEmpty(expansionIdIn)) {
        products = await getProducts(
          {
            filter: {
              expansionIdIn
            },
            pagination: {
              first: -1
            }
          },
          ['id', 'number', 'expansion {abbreviation}', 'image']
        );
      }

      if (!isEmpty(products)) {
        const inventories = await getInventories(
          {
            filter: {
              productIdIn: products.map((item) => item.id)
            },
            pagination: {
              first: -1
            }
          },
          ['id', 'guid', 'comment', 'isFirstEd', 'languageId', 'condition', 'productId', 'aggregateCount']
        );
        loadRows(
          inventories.map((item) => {
            const productItem = products.find((product) => product.id === item.productId) || {};
            return {
              ...item,
              number: productItem?.number || null,
              image: productItem?.image,
              expansion: productItem.expansion.abbreviation,
              count: item.aggregateCount
            };
          })
        );
      } else {
        loadRows([]);
      }
    };

    asyncFetch();
  }, [loadRows, expansionIdIn]);

  const filteredRows = useMemo(() => {
    if (isEmpty(rows)) return [];
    return rows.filter((item) => {
      let doPrint = 1;
      const first = expansionFrom;
      const last = expansionTo;
      if (item.guid.includes(first.abbreviation)) {
        doPrint *=
          CONDITIONS.indexOf(item.condition) > CONDITIONS.indexOf(conditionFrom) ||
          (CONDITIONS.indexOf(item.condition) === CONDITIONS.indexOf(conditionFrom) && item.number >= numberFrom);
      }

      if (item.guid.includes(last.abbreviation)) {
        doPrint *=
          CONDITIONS.indexOf(item.condition) < CONDITIONS.indexOf(conditionTo) ||
          (CONDITIONS.indexOf(item.condition) === CONDITIONS.indexOf(conditionTo) && item.number <= numberTo);
      }
      return doPrint;
    });
  }, [expansionFrom, expansionTo, conditionFrom, conditionTo, numberFrom, numberTo, rows]);

  return (
    <Box width='100%' height='100%'>
      <DataGridPro
        rows={filteredRows}
        columns={createArticleColumns([
          'guid',
          'condition',
          'isFirstEd',
          'expansion',
          'languageId',
          'image',
          'number',
          'comment',
          'count'
        ])}
        density='compact'
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        checkboxSelection
      />
    </Box>
  );
}
