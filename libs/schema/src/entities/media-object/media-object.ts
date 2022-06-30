import entity from '../../utils/entity';
import { text, integer } from '../../fields/atoms';

const MEDIA_OBJECT_FIELDS = {
  url: text({
    label: 'Nom',
    isIndexed: true,
  }),
  name: text({
    label: 'Fournisseur',
  }),
  description: integer({
    label: 'Prix',
  }),
  alt: integer({
    label: 'Prix',
  }),
  versionNumber: integer({
    label: 'Prix',
  }),
};

const MediaObject = entity<keyof typeof MEDIA_OBJECT_FIELDS>({
  singular: 'buyAction',
  copyright: {
    form: 'Vous allez créer une dépense',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: MEDIA_OBJECT_FIELDS,
  allowedSort: ['name'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'seller',
      query: ['name'],
      filterAttributes: ['name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.seller}`,
        info: () => ``,
      },
    },
  },
  form: {
    required: {
      primary: "L'essentiel",
      secondary: 'Veuillez indiquez le nom du projet',
      description: '',
      fields: {
        name: { col: 12 },
      },
    },
  },
  fragments: {
    details: `
      name
      seller
      price
      priceCurrency
      startTime
      project { id name}
    `,
  },
});
export default MediaObject;
