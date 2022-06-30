import entity from '../../utils/entity';
import {
  text,
  integer,
  timestamp,
  relationship,
  file,
} from '../../fields/atoms';

const BUY_ACTION_FIELDS = {
  name: text({
    label: 'Nom',
    isIndexed: true,
  }),
  seller: text({
    label: 'Fournisseur',
  }),
  price: integer({
    label: 'Prix',
  }),
  priceCurrency: integer({
    label: 'Devise',
  }),
  startTime: timestamp({
    label: 'Date',
  }),
  file: file({
    label: 'File',
    many: false,
  }),
  project: relationship({
    label: 'Project',
    options: 'Project',
    target: 'buyActions',
    many: true,
  }),
  agent: relationship({
    label: 'Person',
    options: 'Person',
    target: 'agent',
    valueGetter: ({ row }) => `${row.agent.givenName} ${row.agent.familyName}`,
    many: false,
  }),
};

const BuyAction = entity<keyof typeof BUY_ACTION_FIELDS>({
  singular: 'buyAction',
  copyright: {
    form: 'Vous allez créer une dépense',
  },
  pictures: {
    form: '/assets/illustrations/buy-action.svg',
  },
  fields: BUY_ACTION_FIELDS,
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
      secondary: 'Veuillez indiquez le nom de la dépense',
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
      agent { id givenName familyName}
    `,
  },
});
export default BuyAction;
