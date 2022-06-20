import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import entity from '../utils/entity';

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
    type: 'select',
    label: 'Step',
    options: 'ProjectStep',
  },
  {
    name: 'typeEmergency',
    type: 'select',
    label: 'Emergency',
    options: 'Progress',
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
    type: 'select',
    label: 'Area field',
    options: 'AreaField',
  },
  {
    name: 'areaSnow',
    type: 'select',
    label: 'Area snow',
    options: 'AreaSnow',
  },
  {
    name: 'areaWind',
    type: 'select',
    label: 'Area wind',
    options: 'AreaWind',
  },
  {
    name: 'altitude',
    type: 'number',
    label: 'Altitude',
  },
  {
    name: 'hasCommercial',
    type: 'relationship',
    label: 'Commercial',
    options: 'Person',
    multiple: true,
  },
];

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
  templates: {},
});

export default Project;
