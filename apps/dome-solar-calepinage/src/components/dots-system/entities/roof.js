import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import dimension2D from '../fields/dimensions-2d';
import entity from '../utils/entity';

const icon = (option) => <PeopleAltOutlined fontSize="small" />;

const avatar = (option) => (
  <Avatar
    {...stringAvatar(option.givenName, option.familyName, {
      width: 30,
      height: 30,
    })}
  />
);

const Roof = entity({
  singular: 'roof',
  fields: {
    name: {
      type: 'text',
      label: 'Nom',
    },
    ...dimension2D,
    purlinType: {
      type: 'number',
      label: 'Purlin type',
    },
    purlinBetweenAxis: {
      type: 'number',
      label: 'purlinBetweenAxis',
    },
    purlinThickness: {
      type: 'number',
      label: 'purlinThickness',
    },
    incline: {
      type: 'number',
      label: 'incline',
    },
    ridgeHeight: {
      type: 'number',
      label: 'ridgeHeight',
    },
  },

  default: {
    name: 'nom',
    query: ['name'],
    filterAttributes: ['name'],
    components: {
      Icon: PeopleAltOutlined,
      Option: ListItemDefault,
      Preview: SelectItemPreview,
    },
    getters: {
      icon: icon,
      avatar: avatar,
      primary: (option) => `${option.name}`,
      secondary: (option) => option.name,
      info: (option) => `${option.name}`,
    },
  },
  templates: {},
});

export default Roof;
