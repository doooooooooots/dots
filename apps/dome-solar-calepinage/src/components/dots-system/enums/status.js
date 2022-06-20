import enumList from '../utils/enum-list';

const Status = enumList({
  type: 'category',
  values: {
    INACTIVE: 10,
    ACTIVE: 11,
    DRAFT: 20,
    PUBLISHED: 21,
    UNPUBLISHED: 22,
    ARCHIVED: 30,
  },
  labels: {
    fr: {
      ACTIVE: 'actif',
      INACTIVE: 'inactif',
      DRAFT: 'brouillon',
      AVAILABLE: 'disponible',
      ARCHIVED: 'archivé',
      UNPUBLISHED: 'non publié',
    },
  },
});

export default Status;
