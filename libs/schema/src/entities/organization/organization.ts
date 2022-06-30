import entity from '../../utils/entity';
import { text, relationship } from '../../fields/atoms';

const ORGANIZATION = {
  name: text({
    label: 'Nom',
    isIndexed: true,
  }),
  website: text({
    label: 'Site web',
  }),
  image: relationship({
    label: 'Image',
    options: 'Image',
  }),
  projects: relationship({
    label: 'Projets',
    options: 'Project',
    many: true,
  }),
  postalAddress: relationship({
    label: 'Adresse',
    options: 'PostalAddress',
  }),
};

const Organization = entity<keyof typeof ORGANIZATION>({
  singular: 'organization',
  copyright: {
    form: 'Vous allez créer une entreprise',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: ORGANIZATION,
  allowedSort: ['name'],
  allowedFilter: [],
  searchFilters: {
    default: {
      name: 'seller',
      query: ['name'],
      filterAttributes: ['name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.website}`,
        info: () => ``,
      },
    },
  },
  form: {
    required: {
      primary: "L'essentiel",
      secondary: "Veuillez indiquez le nom de l'entreprise",
      description: '',
      fields: {
        name: { col: 12 },
      },
    },
  },
  fragments: {
    details: `
      name
      website
      image { name image {
        id url width height
      }}
      projects { id name}
    `,
  },
});
export default Organization;
