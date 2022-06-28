/* eslint-disable */
import { text, relationship } from './builder';
import * as yup from 'yup';

const condition = {
  singular: 'condition',
  plurial: 'conditions',
  fields: {
    code: text({
      isIndexed: true,
    }),
  },
};

export default condition;
