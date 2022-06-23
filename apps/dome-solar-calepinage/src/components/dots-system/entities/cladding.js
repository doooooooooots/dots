import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import dimension3D from '../fields/dimensions-3d';
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

const Cladding = entity({
  singular: 'cladding',
  fields: {
    name: {
      type: 'text',
      label: 'Nom',
    },
    color: {
      type: 'text',
      label: 'Nom',
    },
    ...dimension3D,
    numberOfWaves: {
      type: 'number',
      label: 'Purlin type',
    },
    thickness: {
      type: 'number',
      label: 'purlinBetweenAxis',
    },
    waveBaseWidth: {
      type: 'number',
      label: 'purlinThickness',
    },
    waveTopWidth: {
      type: 'number',
      label: 'incline',
    },
    material: {
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

export default Cladding;
