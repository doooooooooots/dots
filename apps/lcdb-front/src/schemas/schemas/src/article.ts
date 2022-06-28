/* eslint-disable */
import { text, relationship } from './builder';
import * as yup from 'yup';

const article = {
  singular: 'article',
  plurial: 'articles',
  fields: {
    condition: relationship({
      ref: 'condition',
      many: false,
    }),
  },
};

export default article;
