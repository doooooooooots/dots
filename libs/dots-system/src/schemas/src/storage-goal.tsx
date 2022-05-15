/* eslint-disable */
import * as yup from 'yup';
import { text, checkbox } from '../builder';
import * as forms from '@dots.cool/form-builder';
import schema from './schema';

const storage = {
  singular: 'storage',
  plurial: 'storages',
  fields: {
    name: text({
      validation: yup.string().required(),
      defaultValue: '',
      isIndexed: true,
      ui: {
        input: forms.textField({}),
      },
    }),
    description: text({}),
    genre: checkbox({}),
  },
};

export default schema(storage);
