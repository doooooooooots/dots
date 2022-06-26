import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../components/list-item-default';
import SelectItemPreview from '../components/list-item-preview';
import length2D from '../fields/molecules/length-2d';
import entity from '../utils/entity';
import text from '../fields/atoms/text';
import select from '../fields/atoms/select';
import number from '../fields/atoms/float';

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
    name: text({
      label: 'Nom',
    }),
    purlinType: select({
      label: "Type d'axe",
      options: 'PurlinType',
    }),
    purlinBetweenAxis: number({
      label: 'Entre axe',
    }),
    purlinThickness: number({
      label: 'Epaisseur pannes',
    }),
    incline: number({
      label: 'Inclinaison',
    }),
    ridgeHeight: number({
      label: 'Hauteur de crête',
    }),
    ...length2D(),
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
