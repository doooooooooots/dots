import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import moment from 'moment';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import relationship from '../fields/atoms/relationship';
import entity from '../utils/entity';
import select from '../fields/atoms/select';
import timestamp from '../fields/atoms/timestamp';
import text from '../fields/atoms/text';
import dimension from '../fields/atoms/dimension';

// TODO: Export from dots data schema
const PROJECT_FIELDS = {
  identifier: text({
    label: 'Ref',
  }),
  name: text({
    label: 'Nom',
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
    select: 'Person', // should be ref
    getter: (item) => item.givenName, // should have a default from entity
  }),
};

const Project = entity({
  singular: 'project',
  fields: PROJECT_FIELDS,
  default: {
    query: ['identifier', 'name'],
    filterAttributes: ['identifier', 'name'],
    components: {
      Icon: PeopleAltOutlined,
      Option: ListItemDefault,
      Preview: SelectItemPreview,
    },
    getters: {
      icon: () => <PeopleAltOutlined fontSize="small" />,
      avatar: (option) => (
        <Avatar
          {...stringAvatar(option.givenName, option.familyName, {
            width: 30,
            height: 30,
          })}
        />
      ),
      primary: (option) => option.name,
      secondary: (option) => option.identifier,
      info: (option) => ``,
    },
  },
  templates: {
    byDate: {
      name: 'By date',
      query: ['identifier', 'name', 'dateReception'],
      filterAttributes: ['identifier'],
      getters: {
        primary: (option) =>
          `Recu le ${moment(option.dateReception).format('YYYY-MM-DD')}`,
      },
    },
  },
});

export default Project;
