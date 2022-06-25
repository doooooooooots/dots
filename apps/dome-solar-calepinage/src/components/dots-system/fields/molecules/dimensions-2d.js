import lengthX from './length-x';
import lengthY from './length-y';

const dimension2D = ({ x = '', y = '' } = {}) => ({
  ...lengthX(x),
  ...lengthY(y),
});

export default dimension2D;
