import React from 'react';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const SelectItemOption = (props) => {
  const {
    title,
    icon,
    description,
    selected,
    tooltip,
    placement = 'right',
    followCursor,
    hideStartIcon,
    onDelete,
    ...other
  } = props;

  const theme = useTheme();

  const RenderComponent = (
    <Stack
      direction="row"
      as="li"
      p={1}
      borderBottom={1}
      borderColor="divider"
      sx={{
        '& .icon--deselect': {
          visibility: 'hidden',
        },
        '&:hover .icon--deselect': {
          visibility: selected ? 'visible' : 'hidden',
        },
      }}
      {...other}
    >
      {!hideStartIcon && (
        <Box
          component={DoneIcon}
          sx={{
            width: 17,
            height: 17,
            mr: '5px',
            ml: '-2px',
            visibility: selected ? 'visible' : 'hidden',
          }}
        />
      )}
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

      <IconButton size="small" className="icon--deselect" onClick={onDelete}>
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </Stack>
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
