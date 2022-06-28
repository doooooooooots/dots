import moment from 'moment';
import relationship from '../../fields/atoms/relationship/relationship';
import entity from '../../utils/entity';
import select from '../../fields/atoms/select/select';
import timestamp from '../../fields/atoms/timestamp/timestamp';
import text from '../../fields/atoms/text/text';
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
      query: ['identifier', 'name', 'dateReception'],
      filterAttributes: ['identifier'],
      getters: {
        primary: (option) =>
          `Recu le ${moment(`${option.dateReception}`).format('YYYY-MM-DD')}`,
      },
    },
  },
  form: {
    basicInfos: {
      primary: 'Information de base',
      secondary: '',
      description: '',
      fields: {
        name: { col: 4, renderInput: null },
        step: { col: 4 },
        typeEmergency: { col: 4 },
      },
    },
    step: {
      primary: 'Etapes',
      fields: {
        areaField: { col: 4 },
        areaSea: { col: 4 },
        areaSnow: {
          col: 6,
        },
      },
    },
    dates: {
      primary: 'Dates et deadlines',
      fields: {
        dateReception: {},
        dateDelivery: {},
      },
    },
  },
});

export default Project;
