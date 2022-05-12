import context from 'src/schemas/schemas';
import createSinglePage from 'src/templater/template-single';
import StorageSingleSidebar from './storage-single-sidebar';
import StorageSingleMain from './storage-single-main';

const StorageSingle = createSinglePage({
  singular: context.storage.singular,
  graphql: context.storage.graphql,
  defaultComponents: {
    Main: StorageSingleMain,
    Sidebar: StorageSingleSidebar
  },
  defaultComponentProps: {
    main: {},
    sidebar: {}
  },
  defaultText: {
    main: 'Créer un rack',
    sidebar: 'Créer un rack'
  }
});

export default StorageSingle;

// TO DO: Import SSR LOGIC
