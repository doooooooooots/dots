import getContrastColor from './get-contrast-color';
import stringToColor from './string-to-color';

function getInitials(givenName = '', familyName = '') {
  return `${givenName[0]}${familyName[0]}`;
}

export default function stringAvatar(givenName, familyName, sx = {}) {
  const initials = getInitials(givenName, familyName);
  const bgcolor = stringToColor(givenName + '_' + familyName);
  const textColour = getContrastColor(bgcolor);
  return {
    sx: {
      bgcolor: bgcolor,
      color: `${textColour}!important`,
      ...sx,
    },
    children: initials,
  };
}
