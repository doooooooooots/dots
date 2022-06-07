import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';

const SelectItemOption = (props) => {
  const {
    title,
    icon,
    description,
    selected,
    tooltip,
    placement = 'right',
    followCursor,
    ...other
  } = props;

  const theme = useTheme();

  const RenderComponent = (
    <li {...other}>
      <Box
        component={DoneIcon}
        sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
        style={{
          visibility: selected ? 'visible' : 'hidden',
        }}
      />
      {icon && typeof icon === 'function' ? (
        <Box component={icon} sx={{ width: 17, height: 17, mr: '1' }} />
      ) : (
        icon
      )}
      <Box
        sx={{
          flexGrow: 1,
          ml: 1,
          '& span': {
            color: theme.palette.text.secondary,
          },
        }}
      >
        {title}
        {description && (
          <>
            <br />
            <span>{description}</span>
          </>
        )}
      </Box>
    </li>
  );

  if (tooltip) {
    return (
      <Tooltip
        title={
          typeof tooltip === 'string' ? (
            <Typography variant="caption">{tooltip}</Typography>
          ) : (
            tooltip
          )
        }
        placement={placement}
        followCursor={followCursor}
      >
        {RenderComponent}
      </Tooltip>
    );
  }
  return RenderComponent;
};

export default SelectItemOption;
