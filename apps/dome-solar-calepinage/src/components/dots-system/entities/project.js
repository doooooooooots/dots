import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import moment from 'moment';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import entity from '../utils/entity';

// TODO: Export from dots data schema
const PROJECT_FIELDS = {
  identifier: {
    type: 'text',
    label: 'Ref',
  },
  name: {
    type: 'text',
    label: 'Nom',
  },
  step: {
    type: 'select',
    label: 'Step',
    options: 'ProjectStep',
  },
  typeEmergency: {
    type: 'select',
    label: 'Emergency',
    options: 'Progress',
  },
  dateReception: {
    type: 'date',
    label: 'Date reception',
  },
  dateDelivery: {
    type: 'date',
    label: 'Date delivery',
  },
  areaField: {
    type: 'select',
    label: 'Area field',
    options: 'AreaField',
  },
  areaSea: {
    type: 'select',
    label: 'Area sea',
    options: 'AreaSea',
  },
  areaSnow: {
    type: 'select',
    label: 'Area snow',
    options: 'AreaSnow',
  },
  areaWind: {
    type: 'select',
    label: 'Area wind',
    options: 'AreaWind',
  },
  altitude: {
    type: 'dimension',
    label: 'Altitude',
  },
  hasCommercial: {
    type: 'relationship',
    label: 'Commercial',
    options: 'Person', // should be ref
    multiple: true, // Should be many
    getter: (item) => item.givenName, // should have a default from entity
  },
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
