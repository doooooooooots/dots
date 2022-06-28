import enumList from '../../dots-system/utils/enum-list';

const Status = enumList({
  type: 'category',
  values: {
    ACTIVE: 11,
    INACTIVE: 10,
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
      PUBLISHED: 'publiée',
      UNPUBLISHED: 'non publiée',
      ARCHIVED: 'archivée',
    },
  },
});

export default Status;
