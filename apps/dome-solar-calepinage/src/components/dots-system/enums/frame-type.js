import enumList from '../../../utils/enum-list';

const FrameType = enumList({
  type: 'category',
  values: {
    NATURAL: 1,
    BLACK: 2,
    ROLLED: 3,
  },
  labels: {
    fr: {
      NATURAL: 'Aluminium naturel',
      BLACK: 'Aluminium noir',
      ROLLED: 'Laminé',
    },
  },
});

export default FrameType;
