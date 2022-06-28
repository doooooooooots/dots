import dimension2D from './dimensions-2d';

const length2D = ({ x = 'Longueur', y = 'Largeur' } = {}) =>
  dimension2D('length', { x, y });

export default length2D;