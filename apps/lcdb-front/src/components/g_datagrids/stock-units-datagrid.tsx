import { createDetails } from '@dots.cool/dots-system';
import { createSchema } from '@dots.cool/schemas';
import { extractColumns } from '@dots.cool/utils';
import { useMemo } from 'react';
import { STOCK_UNIT_COLUMNS } from '../b_columns/stock-unit';

const context = createSchema('stockUnit', 'stockUnits');
const columns = extractColumns(STOCK_UNIT_COLUMNS, [
  'id',
  'name',
  'image',
  'expAbbreviation',
  'number',
  'condition',
  'isFirstEd',
  'quantity',
  'offers',
]);

const StockUnitDatagrid = (props) => {
  const { variant = 'details', ...other } = props;

  const DatagridComponent = useMemo(
    () =>
      createDetails({
        singular: context.singular,
        plurial: context.plurial,
        graphql: context.graphql,
        variant: variant,
        defaultComponents: {
          // ViewBar,
          // FilterBar,
          // Datagrid,
          // Pagination,
          // Toolbar,
          // DialogContent,
          // Cards,
        },
        defaultComponentProps: {
          // Filterbar
          filterBar: {
            actionText: 'Créer un nouveau Lol',
            actionPage: {
              path: 'create.stockUnit',
              title: 'Créer un nouveau storage',
              width: 'md',
              Component: null,
            },
          },
          // Datagrid
          datagrid: {},
          // Dialog
          dialog: {
            components: {
              // PublishOneModal: StorageMoveManyModal,
              // PublishManyModal: StorageMoveManyModal,
              // MoveOneModal: StorageMoveManyModal,
              // MoveManyModal: StorageMoveManyModal,
              // DeleteOneModal: StorageMoveManyModal,
              // DeleteManyModal: StorageMoveManyModal,
              // UpdateOneModal: StorageMoveManyModal,
              // UpdateManyModal: StorageMoveManyModal,
            },
            componentProps: {},
          },
          topbar: {
            actionText: 'Créer un nouveau Lol',
            actionPage: {
              path: 'create.storage',
              title: 'Créer un nouveau storage',
              Component: null,
            },
            fullscreenPage: {
              path: 'view.stock',
              title: 'Détails de ...',
              Component: null,
            },
          },
        },
      }),
    [variant]
  );

  return <DatagridComponent {...other} columns={columns} />;
};

export default StockUnitDatagrid;
