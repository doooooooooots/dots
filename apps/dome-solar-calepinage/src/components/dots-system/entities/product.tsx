import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';

import entity from '../utils/entity';
import text from '../fields/atoms/text';
import length3D from '../fields/molecules/length-3d';

const icon = (option) => <PeopleAltOutlined fontSize="small" />;

const avatar = (option) => (
  <Avatar
    {...stringAvatar(option.givenName, option.familyName, {
      width: 30,
      height: 30,
    })}
  />
);

const Product = entity({
  singular: 'product',
  fields: {
    name: text({
      label: 'Nom',
    }),
    ...length3D({ z: 'Epaisseur' }),
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

export default Product;
