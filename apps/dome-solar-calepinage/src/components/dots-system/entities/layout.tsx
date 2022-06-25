import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import relationship from '../fields/atoms/relationship';
import entity from '../utils/entity';
import text from '../fields/atoms/text';
import checkbox from '../fields/atoms/checkbox';
import number from '../fields/atoms/float';
import json from '../fields/atoms/json';
import select from '../fields/atoms/select';
import integer from '../fields/atoms/integer';

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
    name: text({
      label: 'Nom',
    }),
    alignment: select({
      label: 'Alignement',
      options: 'Alignment',
    }),
    solarEdge: checkbox({
      label: 'Solar edge ?',
    }),
    comments: json({
      label: 'Commentaires',
    }),
    moduleQuantity: json({
      label: 'numberOfLines',
    }),
    moduleMapping: json({
      label: 'numberOfLines',
    }),
    moduleSpaceBetweenX: number({
      label: 'moduleSpaceBetweenX',
    }),
    moduleSpaceBetweenY: number({
      label: 'moduleSpaceBetweenY',
    }),
    offsetX: number({
      label: 'offsetX',
    }),
    offsetY: number({
      label: 'offsetY',
    }),
    numberOfColumns: integer({
      label: 'numberOfColumns',
    }),
    numberOfLines: integer({
      label: 'numberOfLines',
    }),
    overrideMassBalance: json({
      label: 'override',
    }),
    pdf: relationship({
      label: 'Pdf',
      select: 'MediaObject', // should be ref
      getter: (item) => item.name, // should have a default from entity
    }),
    product: relationship({
      label: 'Produit',
      select: 'Product', // should be ref
      getter: (item) => item.name, // should have a default from entity
    }),
    roof: relationship({
      label: 'Toiture',
      select: 'Roof', // should be ref
      getter: (item) => item.name, // should have a default from entity
    }),
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
