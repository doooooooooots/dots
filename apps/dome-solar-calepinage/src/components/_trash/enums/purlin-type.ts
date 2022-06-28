import enumList from '../../dots-system/utils/enum-list';

const PurlinType = enumList({
  type: 'category',
  values: {
    PAF: 1,
    LAC: 2,
    WOOD: 3,
  },
  labels: {
    fr: {
      PAF: 'paf',
      LAC: 'lac',
      WOOD: 'bois',
    },
  },
});

export default PurlinType;
