import enumList from '../../utils/enum-list';

const StatusAction = enumList({
  type: 'category',
  values: {
    DRAFT: 10,
    OPEN: 20,
    DONE: 30,
    CANCELED: 40,
  },
  labels: {
    fr: {
      DRAFT: 'brouillon',
      OPEN: 'à faire',
      DONE: 'faite',
      CANCELED: 'annulée',
    },
  },
});

export default StatusAction;
