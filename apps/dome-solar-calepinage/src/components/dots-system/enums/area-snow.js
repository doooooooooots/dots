import enumList from '../../../utils/enum-list';

const AreaSnow = enumList({
  type: 'category',
  values: {
    A1: 10,
    A2: 11,
    B1: 20,
    B2: 21,
    C1: 30,
    C2: 31,
    D: 40,
    E: 50,
  },
  labels: {
    fr: {
      A1: 'A1',
      A2: 'A2',
      B1: 'B1',
      B2: 'B2',
      C1: 'C1',
      C2: 'C2',
      D: 'D',
      E: 'E',
    },
  },
});

export default AreaSnow;
