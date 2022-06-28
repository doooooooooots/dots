/* eslint-disable */
import { text, relationship, image, select } from './builder';
import * as yup from 'yup';

const offer = {
  singular: 'offer',
  plurial: 'offers',
  fields: {
    pid: text({
      isIndexed: true,
    }),
    status: text({}),
  },
};

export default offer;
