import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../../dots-system/components/list-item-default';
import SelectItemPreview from '../../dots-system/components/list-item-preview';
import relationship from '../fields/atoms/relationship';
import entity from '../../dots-system/utils/entity';
import text from '../fields/atoms/text';
import checkbox from '../fields/atoms/checkbox';
import number from '../fields/atoms/float';
import json from '../fields/atoms/json';
import select from '../fields/atoms/select';
import integer from '../fields/atoms/integer';
import dimension2D from '../fields/molecules/dimensions-2d';
import lengthX from '../fields/molecules/length-x';
import lengthY from '../fields/molecules/length-y';

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
    numberOfColumns: lengthX('Nbre colonnes'),
    numberOfLines: lengthY('Nbre rangées'),
    ...dimension2D('offset'),
    ...dimension2D('moduleSpaceBetween', 'Ecart Module'),
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
