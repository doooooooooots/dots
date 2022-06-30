import entity from '../../utils/entity';
import { text } from '../../fields/atoms';

const POSTAL_ADDRESS = {
  name: text({
    label: 'Nom',
    isIndexed: true,
  }),
  city: text({
    label: 'Ville',
    isIndexed: true,
  }),
  addressCountry: text({
    label: 'Pays',
    isIndexed: true,
  }),
  addressLocality: text({
    label: 'Nom de rue',
    isIndexed: true,
  }),
  addressRegion: text({
    label: 'Région',
    isIndexed: true,
  }),
  postalCode: text({
    label: 'Code Postal',
    isIndexed: true,
  }),
  streetAddress: text({
    label: 'N° de rue',
    isIndexed: true,
  }),
};

const PostalAddress = entity<keyof typeof POSTAL_ADDRESS>({
  singular: 'buyAction',
  copyright: {
    form: 'Vous allez créer une adresse',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: POSTAL_ADDRESS,
  allowedSort: ['name'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'name',
      query: ['name'],
      filterAttributes: ['name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.city}`,
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
      city
      addressCountry
      postalCode
      streetAddress
    `,
  },
});
export default PostalAddress;
