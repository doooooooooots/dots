/* eslint-disable */
import * as yup from 'yup';
import { text, relationship, timestamp } from './builder';
import * as forms from '@dots.cool/form-builder';

const storage = {
  singular: 'storage',
  plurial: 'storages',
  fields: {
    name: text({
      isIndexed: true,
      defaultValue: 'Alexis',
      validation: yup.string().required(),
      ui: {
        input: forms.textField({}),
      },
    }),
    game: relationship({
      ref: 'game',
      many: false,
      ui: {
        // columnField: 'name',
        // inputField: 'name'
      },
    }),
    stockUnits: relationship({
      ref: 'stockUnit',
      many: true,
      ui: {
        // columnField: 'id',
      },
      // ui: {
      //   // -- DISPLAY IN SELECT
      //   // displayMode: 'select',
      //   // labelField: 'name',
      //   // -- DISPLAY IN CARDS
      //   displayMode: 'cards',
      //   cardFields: [],
      //   linkToItem: true,
      //   removeMode: 'disconnect',
      //   inlineCreate: {
      //     fields: [],
      //   },
      //   inlineEdit: {
      //     fields: [],
      //   },
      //   inlineConnect: true,
      //   // -- DISPLAY IN COUNT
      //   // displayMode: 'count',
      // },
    }),
    createdAt: timestamp({}),
  },
};

export default storage;
