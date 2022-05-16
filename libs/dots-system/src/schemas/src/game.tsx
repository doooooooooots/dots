/* eslint-disable */
import { text } from './builder';

const game = {
  singular: 'game',
  plurial: 'games',
  fields: {
    name: text({
      isIndexed: true,
    }),
    code: text({}),
  },
};

export default game;
