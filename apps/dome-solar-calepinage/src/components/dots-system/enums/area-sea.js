import enumList from '../utils/enum-list';

const AreaSea = enumList({
  type: 'scale',
  values: {
    CLOSE: 10,
    MEDIUM: 20,
    DISTANT: 30,
  },
  labels: {
    fr: {
      CLOSE: 'Moins de 2 km',
      MEDIUM: 'Entre 2 et 3 km',
      DISTANT: 'Plus de 3km',
    },
  },
});

export default AreaSea;
