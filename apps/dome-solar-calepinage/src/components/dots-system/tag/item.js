import React from 'react';
import { Box } from '@mui/system';

function ItemTag(props) {
  const { name, color } = props;
  return (
    <Box
      key={name}
      sx={{
        height: 20,
        minWidth: 140,
        padding: '.15em 4px',
        fontWeight: 600,
        lineHeight: '15px',
        borderRadius: '2px',
        color: (theme) => theme.palette.getContrastText(color),
      }}
      style={{
        backgroundColor: color,
      }}
    >
      {name}
    </Box>
  );
}

export default ItemTag;
