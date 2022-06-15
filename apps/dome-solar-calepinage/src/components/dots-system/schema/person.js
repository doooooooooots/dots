import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import { Avatar } from '@mui/material';
import stringAvatar from '../../../../src/utils/string-to-avatar';
import SelectItemOption from '../components/list-item/list-item-option';
import SelectItemPreview from '../components/list-item/list-item-preview';
import entity from './create-entity';

const icon = (option) => <PeopleAltOutlined fontSize="small" />;

const avatar = (option) => (
  <Avatar
    {...stringAvatar(option.givenName, option.familyName, {
      width: 30,
      height: 30,
    })}
  />
);

// [ ](Adrien): Add function to init each object
const Person = entity({
  singular: 'person',
  default: {
    name: 'prénom, nom',
    query: ['givenName', 'familyName'],
    filterAttributes: ['givenName', 'familyName'],
    components: {
      Icon: PeopleAltOutlined,
      Option: SelectItemOption,
      Preview: SelectItemPreview,
    },
    getters: {
      icon: icon,
      avatar: avatar,
      primary: (option) => `${option.givenName} ${option.familyName}`,
      secondary: (option) => option.familyName,
      info: (option) => `${option.givenName} ${option.familyName}`,
    },
  },
  templates: {
    byEmail: {
      name: 'email',
      query: ['givenName', 'familyName', 'email'],
      filterAttributes: ['email'],
      getters: {
        primary: (option) => `${option.givenName} ${option.familyName}`,
        secondary: (option) => option.email,
        info: () => null,
      },
    },
  },
});

export default Person;
