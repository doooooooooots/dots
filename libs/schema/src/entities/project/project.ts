import moment from 'moment';
import * as yup from 'yup';

import { text } from '../../fields/atoms';
import entity from '../../utils/entity';
import relationship from '../../fields/atoms/relationship/relationship';
import select from '../../fields/atoms/select/select';
import timestamp from '../../fields/atoms/timestamp/timestamp';
import dimension from '../../fields/atoms/dimension/dimension';
import float from '../../fields/atoms/float/float';
import { isEmpty } from 'lodash';

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
  actionPourcentageCompletion: float({
    label: 'Progression',
  }),
  numberOfRemainingTasks: float({
    label: 'Tâches restantes',
  }),
  actualCost: float({
    label: 'Cout total',
  }),
  actionsCount: relationship({
    label: 'Actions',
    options: 'action',
    many: false,
    target: 'project',
    onClick: 'open',
    width: 80,
  }),
  buyActionsCount: relationship({
    label: 'Dépenses',
    options: 'buyAction',
    target: 'project',
    many: false,
    onClick: 'open',
  }),
  hasTechnician: relationship({
    label: 'Technicien',
    options: 'Person',
    target: 'isProjectTechnicianFor',
    many: true,
    valueGetter: ({ row }) =>
      `${
        !isEmpty(row.hasTechnician) &&
        row.hasTechnician.map((item) => item.fullName).join(' ')
      }`,
  }),
  hasProjectManager: relationship({
    label: 'Responsable',
    options: 'Person',
    target: 'isProjectManagerFor',
    many: true,
    valueGetter: ({ row }) => `${row?.hasProjectManager?.givenName || '-'}`,
  }),
  customer: relationship({
    label: 'client',
    options: 'Organization',
    target: 'projects',
    many: true,
  }),
  hasCommercial: relationship({
    label: 'Commercial',
    options: 'Person',
    target: 'isCommercialFor',
    many: true,
  }),

  // hasCommercial: relationship({
  //   label: 'Commercial',
  //   many: true,
  //   options: 'Person',
  // }),
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
      numberOfRemainingTasks
      dateReception
      dateDelivery
      actualCost
      actionsCount
      buyActionsCount
      hasCommercialCount
      hasTechnician {
        id fullName givenName
      }
      hasProjectManager {
        id fullName givenName
      }
      areaField
      areaSnow
      areaWind
      altitude
      areaSea
    `,
    single: `
      fragment::details
      buyActions(take:10, orderBy:{createdAt: desc}) {
        id
        name
      }
      hasCommercial(take:10, orderBy:{createdAt: desc}) {
        id
        fullName
      }
    `,
  },
});

export default Project;
