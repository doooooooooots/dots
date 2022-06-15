import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import { PROJECT_STEP_OPTIONS } from '../../../constants/constants';
import SelectItemOption from '../components/list-item/list-item-option';
import SelectItemPreview from '../components/list-item/list-item-preview';

// TODO: Export from dots data schema
const PROJECT_FIELDS = [
  {
    name: 'identifier',
    type: 'ref',
    label: 'Ref',
  },
  {
    name: 'step',
    type: 'enum',
    label: 'Step',
    options: PROJECT_STEP_OPTIONS,
  },
  {
    name: 'emergency',
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
  },
  {
    name: 'areaSnow',
    type: 'list',
    label: 'Area snow',
  },
  {
    name: 'areaWind',
    type: 'list',
    label: 'Area wind',
  },
  {
    name: 'altitude',
    type: 'dimension',
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
  singular: 'person',
  fields: PROJECT_FIELDS,
  default: {
    query: ['identifier', 'name'],
    filterAttributes: ['identifier', 'familyName'],
    components: {
      Icon: PeopleAltOutlined,
      Option: SelectItemOption,
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
      primary: (option) => option.givenName,
      secondary: (option) => option.familyName,
      info: (option) => `${option.givenName} ${option.familyName}`,
    },
  },
  templates: {},
};

export default Project;
