import StorageCreate from '@components/forms/storage-create';
import ToolbarData from 'src/design-system/datagrid/toolbar/toolbar-data';
import context from 'src/schemas/schemas';
import createDatagridMany from 'src/templater/template-many';

const StorageMany = createDatagridMany({
  singular: context.storage.singular,
  plurial: context.storage.plurial,
  graphql: context.storage.graphql,
  defaultComponentProps: {
    filterBar: {
      ActionComponent: StorageCreate,
    },
    datagrid: {
      components: {
        Toolbar: ToolbarData,
      },
      renderModals: () => null,
    },
  },
});

export default StorageMany;

// TO DO: Import SSR LOGIC
