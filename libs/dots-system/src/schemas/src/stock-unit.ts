/* eslint-disable */
import { text } from './builder';
import * as yup from 'yup';

const stockUnit = {
  singular: 'stockUnit',
  plurial: 'stockUnits',
  fields: {
    quantity: text({}),
  },
};

export default stockUnit;
