/* eslint-disable */
import * as yup from 'yup';
import { text, relationship } from './builder';
import * as forms from '@dots.cool/form-builder';

const storage = {
  singular: 'storage',
  plurial: 'storages',
  fields: {
    name: text({
      isIndexed: true,
      defaultValue: 'lololol',
      validation: yup.string().required(),
      ui: {
        input: forms.textField({}),
      },
    }),
    game: relationship({
      query: `game {id name}`,
      valueGetter: ({ row }) => row.game.name,
      filterQuery: ({ row }) => ({
        where: {
          id: row.game.id,
        },
      }),
      many: false,
    }),
    // stockUnits: relationship({
    //   field: 'stockUnit',
    //   query: `stockUnitsCount`,
    //   count: ({ row }) => row.stockUnitsCount,
    // }),
  },
};

export default storage;
