import enumList from '../../../utils/enum-list';

const AreaWind = enumList({
  type: 'scale',
  values: {
    LOW: 10,
    MODERATE: 20,
    CONSIDERABLE: 30,
    HIGH: 40,
  },
  components: {
    option: '',
    inline: '',
  },
  labels: {
    fr: {
      LOW: '1',
      MODERATE: '2',
      CONSIDERABLE: '3',
      HIGH: '4',
    },
  },
});

export default AreaWind;
