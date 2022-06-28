/* eslint-disable */
import { text } from './builder';
import * as yup from 'yup';

const game = {
  singular: 'game',
  plurial: 'games',
  fields: {
    name: text({ isIndexed: true }),
    code: text({}),
    idMkm: text({ validation: yup.string().required() }),
  },
};

export default game;
