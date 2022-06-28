import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../utils/string-to-avatar';
import ListItemDefault from '../../dots-system/components/list-item-default';
import SelectItemPreview from '../../dots-system/components/list-item-preview';
import entity from '../../dots-system/utils/entity';
import text from '../fields/atoms/text';
import number from '../fields/atoms/float';
import select from '../fields/atoms/select';

const icon = (option) => <PeopleAltOutlined fontSize="small" />;
const avatar = (option) => (
  <Avatar
    {...stringAvatar(option.givenName, option.familyName, {
      width: 30,
      height: 30,
    })}
  />
);

const MediaObject = entity({
  singular: 'MediaObject',
  fields: {
    name: text({
      label: 'Nom',
    }),
    sku: text({
      label: 'Purlin type',
    }),
    frameType: select({
      label: 'Type de cadre',
      options: 'FrameType',
    }),
    electricalPower: number({
      label: 'Puissance éléctrique',
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

export default MediaObject;
