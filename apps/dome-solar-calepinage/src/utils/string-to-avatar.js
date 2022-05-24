import getContrastColor from './get-contrast-color';
import stringToColor from './string-to-color';

export default function stringAvatar(name) {
  const bgcolor = stringToColor(name);
  const textColour = getContrastColor(bgcolor);
  return {
    sx: {
      bgcolor: stringToColor(bgcolor),
      color: `${textColour}!important`,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
