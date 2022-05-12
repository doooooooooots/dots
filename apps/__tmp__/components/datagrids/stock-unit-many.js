import ToolbarData from 'src/design-system/datagrid/toolbar/toolbar-data';
import defaultComponents from './default-components';
import createDatagridMany from 'src/templater/template-many';
import context from 'src/schemas/schemas';
import StockUnitCreate from '@components/forms/stock-unit-create';

const StockUnitMany = createDatagridMany({
  plurial: context.stockUnit.plurial,
  graphql: context.stockUnit.graphql,
  defaultComponents,
  defaultComponentProps: {
    filterBar: {
      actionText: 'Ajouter une entrée',
      ActionComponent: StockUnitCreate,
      actionProps: {
        path: 'stockUnit',
        title: 'Ajouter une entrée'
      }
    },
    datagrid: {
      components: {
        Toolbar: ToolbarData
      },
      renderModals: () => null
    }
  }
});

export default StockUnitMany;

// TO DO: Import SSR LOGIC
