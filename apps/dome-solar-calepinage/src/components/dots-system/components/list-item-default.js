import React from 'react';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const ListItemDefault = (props) => {
  const {
    label,
    Icon,
    description,
    selected,
    tooltip,
    placement = 'right',
    followCursor,
    hideStartIcon,
    onDelete,
    color,
    ...other
  } = props;

  const theme = useTheme();

  const RenderComponent = (
    <Stack
      direction="row"
      as="li"
      borderBottom={1}
      borderColor="divider"
      alignItems="center"
      {...other}
    >
      {/* Selection icon */}
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

      {/* Entity icon */}
      {Boolean(Icon) && Icon}

      {/* Content */}
      <Stack
        sx={{
          flexGrow: 1,
          ml: 1,
          overflow: 'hidden',
          '& span': {
            color: theme.palette.text.secondary,
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>

      {/* Close / delete icon */}
      {selected && (
        <IconButton size="small" onClick={onDelete}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
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

ListItemDefault.bindProps = (getters, option, state) => ({
  Icon: getters.avatar(option),
  label: getters.primary(option),
  description: getters.secondary(option),
  tooltip: getters.info(option),
  selected: state.selected,
});

export default ListItemDefault;
