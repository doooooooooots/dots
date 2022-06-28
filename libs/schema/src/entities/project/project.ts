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
  }),
  step: select({
    label: 'Etape',
    options: 'ProjectStep',
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
    type: 'relationship',
    label: 'Commercial',
    many: true,
    options: 'Person',
  }),
};

const Project = entity({
  singular: 'project',
  fields: PROJECT_FIELDS,
  filters: {
    default: {
      name: 'identifier',
      query: `
        id
        identifier
      `,
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
        name: { col: 12, renderInput: null },
      },
    },
    basicInfos: {
      primary: 'Information de base',
      secondary: 'Veuillez indiquez les informations de base pour le projet',
      description: '',
      fields: {
        step: { col: 12 },
      },
    },
    typeEmergency: {
      primary: 'Etapes',
      secondary: "Quelle est l'urgence du projet",
      fields: {
        typeEmergency: { col: 12 },
      },
    },
    areaField: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaField: { col: 12 },
      },
    },
    areaSea: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaSea: { col: 12 },
      },
    },
    areaSnow: {
      primary: 'Etapes',
      secondary: 'Dans quel type de terrain ?',
      fields: {
        areaSnow: {
          col: 12,
        },
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
    default: `
      name
      step
      typeEmergency
      dateReception
      dateDelivery
      customer {
        id
        name
      }
    `,
    single: `
      fragment::default
      hasTechnician {
        id
        fullName
      }
      hasCommercial {
        id
        fullname
      }
    `,
    index: `
      ...fragment:default
    `,
    layout: `
      identifier
      name
    `,
    person: `
      identifier
      dateDelivery
    `,
  },
});

export default Project;
