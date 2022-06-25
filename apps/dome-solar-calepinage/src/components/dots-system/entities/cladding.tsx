import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import entity from '../utils/entity';
import text from '../fields/atoms/text';
import number from '../fields/atoms/float';
import select from '../fields/atoms/select';
import integer from '../fields/atoms/integer';
import color from '../fields/atoms/color';
import dimension3D from '../fields/molecules/dimensions-3d';

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
    name: text({
      label: 'Nom',
    }),
    color: color({
      label: 'Nom',
    }),
    numberOfWaves: integer({
      label: "Nombre d'ondes",
    }),
    thickness: number({
      label: 'Epaisseur',
    }),
    waveBaseWidth: number({
      label: 'purlinThickness',
    }),
    waveTopWidth: number({
      label: 'incline',
    }),
    material: select({
      label: 'material',
      options: 'material',
    }),
    ...dimension3D({ z: "Hauteur d'onde" }),
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
