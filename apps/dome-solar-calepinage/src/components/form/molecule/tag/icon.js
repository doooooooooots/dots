import { Box } from '@mui/material';

const TagIcon = ({ color }) => (
  <Box
    component="span"
    sx={{
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: '3px',
      mr: 1,
      mt: '2px',
    }}
    style={{ backgroundColor: color }}
  />
);

export default TagIcon;
