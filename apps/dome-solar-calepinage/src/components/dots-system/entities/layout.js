import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
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

const Layout = entity({
  singular: 'layout',
  fields: {
    name: {
      type: 'text',
      label: 'Nom',
    },
    solarEdge: {
      type: 'checkbox',
      label: 'Solar edge ?',
    },
    solarModule: {
      type: 'relationship',
      label: 'Panneau',
      options: 'SolarModule', // should be ref
      getter: (item) => item.name, // should have a default from entity
    },
    product: {
      type: 'relationship',
      label: 'Produit',
      options: 'Product', // should be ref
      getter: (item) => item.name, // should have a default from entity
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

export default Layout;
