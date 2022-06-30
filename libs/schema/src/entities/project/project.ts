import moment from 'moment';
import relationship from '../../fields/atoms/relationship/relationship';
import entity from '../../utils/entity';
import select from '../../fields/atoms/select/select';
import timestamp from '../../fields/atoms/timestamp/timestamp';
import { text } from '../../fields/atoms';
import dimension from '../../fields/atoms/dimension/dimension';
import * as yup from 'yup';

const PROJECT_FIELDS = {
  identifier: text({
    label: 'Ref',
  }),
  name: text({
    label: 'Nom',
    isIndexed: true,
    defaultValue: 'Nom du projet',
    validation: yup.string().required(), // auto add depending on field
    width: 220,
  }),
  step: select({
    label: 'Etape',
    options: 'ProjectStep',
    width: 200,
  }),
  typeEmergency: select({
    label: 'Urgence ?',
    options: 'Progress',
  }),
  dateReception: timestamp({
    label: 'Date de reception',
  }),
  dateDelivery: timestamp({
    label: 'Livraison prévue',
  }),
  areaField: select({
    label: 'Catégorie de terrain',
    options: 'AreaField',
  }),
  areaSea: select({
    label: 'Distance a la mer',
    options: 'AreaSea',
  }),
  areaSnow: select({
    label: 'Zone de neige',
    options: 'AreaSnow',
  }),
  areaWind: select({
    label: 'Zone de vent',
    options: 'AreaWind',
  }),
  altitude: dimension({
    label: 'Altitude',
  }),
  hasCommercial: relationship({
    label: 'Commercial',
    many: true,
    options: 'Person',
  }),
};

const Project = entity<keyof typeof PROJECT_FIELDS>({
  singular: 'project',
  fields: PROJECT_FIELDS,
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
      name: 'identifier',
      query: ['identifier', 'name'],
      filterAttributes: ['identifier', 'name'],
      getters: {
        primary: (option) => `${option.name}`,
        secondary: (option) => `${option.identifier}`,
        info: () => ``,
      },
    },
    byDate: {
      name: 'By date',
      query: `
        id
        name
        dateReception
      `,
      filterAttributes: ['identifier'],
      getters: {
        primary: (option) =>
          `Recu le ${moment(`${option.dateReception}`).format('YYYY-MM-DD')}`,
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
    basicInfos: {
      primary: 'Information de base',
      secondary: 'Veuillez indiquez les informations de base pour le projet',
      description: '',
      fields: {
        step: {},
      },
    },
    typeEmergency: {
      primary: 'Etapes',
      secondary: "Quelle est l'urgence du projet",
      fields: {
        typeEmergency: {},
      },
    },
    areaField: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaField: {},
      },
    },
    areaSea: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaSea: {},
      },
    },
    areaSnow: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaSnow: {},
      },
    },
    dates: {
      primary: 'Dates et deadlines',
      secondary: 'Quand est-ce que vous avez reçu la demande ?',
      fields: {
        dateReception: {},
        dateDelivery: {},
      },
    },
  },
  fragments: {
    details: `
      name
      typeEmergency
      step
      areaField
      areaSnow
      areaWind
      altitude
      areaSea
      dateReception
      dateDelivery
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

export default Project;
