/* eslint-disable */
import { text, relationship, image, select } from './builder';
import * as yup from 'yup';

const stockUnit = {
  singular: 'stockUnit',
  plurial: 'stockUnits',
  fields: {
    quantity: text({}),
    storage: relationship({
      ref: 'storage',
      many: false,
    }),
    article: relationship({
      ref: 'article',
      many: false,
    }),
    offers: relationship({
      ref: 'offer',
      many: true,
    }),
    image: image({
      path: `article.product.image.url`,
    }),
    condition: select({
      path: `article.condition.code`,
    }),
    status: select({
      path: `article.status`,
      variant: 'chip',
    }),
  },
};

export default stockUnit;
