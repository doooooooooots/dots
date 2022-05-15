import uniqueId from '../../columns/unique-id';
import text from '../../columns/text';
import relashionship from '../../columns/relashionship';
import schema from './schema';

// types
import { EntitySchema } from '../index.d';

const Single = () => <div>Single</div>;
const Links = () => <div>Links</div>;

const storage: EntitySchema = schema({
  singular: 'storage',
  plurial: 'storages',
  defaultColumns: ['name', 'game', 'stockUnits'],
  defaultSingle: [],
  columns: {
    name: uniqueId({
      field: 'name',
      Component: Single,
    }),
    game: text({
      field: 'game',
      query: `game {id name}`,
      valueGetter: ({ row }) => `${row?.game?.name || '-'}`,
    }),
    stockUnits: relashionship({
      field: 'stockUnit',
      query: `stockUnitsCount`,
      count: ({ row }) => row.stockUnitsCount,
      Component: Links,
    }),
  },
});

export default storage;
