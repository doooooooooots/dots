import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

function SelectOptionItem(props) {
  const { icon, onClick, primary, secondary, isActive, secondaryAction } =
    props;

  return (
    <ListItem
      secondaryAction={secondaryAction}
      sx={[
        { py: 0, minHeight: 32 },
        isActive && {
          bgcolor: 'primary.background',
          mb: 2,
        },
      ]}
      disablePadding
    >
      <ListItemButton
        sx={[
          { py: 0, minHeight: 32 },
          isActive && {
            bgcolor: 'primary.background',
          },
        ]}
        onClick={onClick}
      >
        {icon && <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>}
        <ListItemText
          primary={primary}
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 'medium',
          }}
          secondary={secondary}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default SelectOptionItem;
