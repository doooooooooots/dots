import dimension3d from '../dimension-3d/dimensions-3d';

const length3D = ({ x = 'Longueur', y = 'Largeur', z = 'Profondeur' } = {}) =>
  dimension3d('length', { x, y, z });

export default length3D;
