import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item/list-item-preview';

// TODO: Export from dots data schema
const PROJECT_FIELDS = [
  {
    name: 'identifier',
    type: 'text',
    label: 'Ref',
  },
  {
    name: 'name',
    type: 'text',
    label: 'Nom',
  },
  {
    name: 'step',
    type: 'list',
    label: 'Step',
    options: 'project-step',
  },
  {
    name: 'typeEmergency',
    type: 'list',
    label: 'Emergency',
  },
  {
    name: 'dateReception',
    type: 'date',
    label: 'Date reception',
  },
  {
    name: 'dateDelivery',
    type: 'date',
    label: 'Date delivery',
  },
  {
    name: 'areaField',
    type: 'list',
    label: 'Area field',
    options: 'area-field',
  },
  {
    name: 'areaSnow',
    type: 'list',
    label: 'Area snow',
    options: 'area-snow',
  },
  {
    name: 'areaWind',
    type: 'list',
    label: 'Area wind',
    options: 'area-wind',
  },
  {
    name: 'altitude',
    type: 'number',
    label: 'Altitude',
  },
  {
    name: 'customer',
    type: 'link',
    entity: 'Person',
    label: 'Client',
  },
];

const Project = {
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
  templates: {},
};

export default Project;
