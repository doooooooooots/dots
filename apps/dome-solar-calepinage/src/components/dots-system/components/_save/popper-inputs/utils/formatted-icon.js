import { Box } from '@mui/system';

const formattedIcon = (icon) => {
  if (!icon) return null;
  if (['number', 'string'].includes(typeof icon)) return <Box>{icon}</Box>;
  if (typeof icon === 'object') {
    let Icon = icon;
    return <Icon />;
  }
  return icon;
};

export default formattedIcon;
