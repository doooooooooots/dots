import { createDetails } from '@dots.cool/datagrid-builder';
import { createSchema } from '@dots.cool/schemas';
import StorageMoveManyModal from './modals/storage-modal-move';
import StorageFormCreate from '../forms/storage-form-create';
import { useMemo } from 'react';

const context = createSchema('storage', 'storages');

const StorageDatagrid = (props) => {
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
              path: 'create.storage',
              title: 'Créer un nouveau storage',
              width: 'md',
              Component: StorageFormCreate,
            },
          },
          // Datagrid
          datagrid: {},
          // Dialog
          dialog: {
            components: {
              PublishOneModal: StorageMoveManyModal,
              PublishManyModal: StorageMoveManyModal,
              MoveOneModal: StorageMoveManyModal,
              MoveManyModal: StorageMoveManyModal,
              DeleteOneModal: StorageMoveManyModal,
              DeleteManyModal: StorageMoveManyModal,
              UpdateOneModal: StorageMoveManyModal,
              UpdateManyModal: StorageMoveManyModal,
            },
            componentProps: {},
          },
          topbar: {
            actionText: 'Créer un nouveau Lol',
            actionPage: {
              path: 'create.storage',
              title: 'Créer un nouveau storage',
              Component: StorageFormCreate,
            },
            fullscreenPage: {
              path: 'view.stock',
              title: 'Détails de ...',
              Component: StorageFormCreate,
            },
          },
        },
      }),
    [variant]
  );

  return <DatagridComponent {...other} sort={[{ createdAt: 'desc' }]} />;
};

export default StorageDatagrid;
