import dimension2D from './dimensions-2d';
import lengthZ from './length-z';

const dimension3D = ({ x = '', y = '', z = '' } = {}) => ({
  ...dimension2D({ x, y }),
  ...lengthZ(z),
});

export default dimension3D;
