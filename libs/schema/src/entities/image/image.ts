import * as yup from 'yup';

import { text } from '../../fields/atoms';
import entity from '../../utils/entity';
import select from '../../fields/atoms/select/select';

const IMAGE = {
  name: text({
    label: 'Nom',
    isIndexed: true,
    defaultValue: 'Nom du projet',
    validation: yup.string().required(), // auto add depending on field
    width: 220,
  }),
  file: file({}),
};

const Image = entity<keyof typeof IMAGE>({
  singular: 'image',
  fields: IMAGE,
  allowedSort: ['name'],
  allowedFilter: [],
  // getters: {},
  // ui: {
  //   card: {},
  //   list: {},
  //   grid: {},
  // },
  searchFilters: {
    default: {
      name: 'name',
      query: ['name'],
      filterAttributes: ['name', 'name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.name}`,
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
      typeEmergency
      step
      numberOfRemainingTasks
      dateReception
      dateDelivery
      actualCost
      buyActions(take:10, orderBy:{createdAt: desc}) {
        id
        name
      }
      buyActionsCount
      areaField
      areaSnow
      areaWind
      altitude
      areaSea
      hasCommercial {
        id
        fullName
      }
    `,
    single: `
      fragment::details
      customer {
        id
        name
      }
    `,
  },
});

export default Image;
