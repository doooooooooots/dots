import React from 'react';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const SelectItemOption = (props) => {
  const {
    title,
    Icon,
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
      borderBottom={1}
      borderColor="divider"
      alignItems="center"
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
      {Boolean(Icon) && Icon}
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          flexGrow: 1,
          ml: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
          '& span': {
            color: theme.palette.text.secondary,
          },
        }}
      >
        {title}
        {description && (
          <>
            <br />
            <Box component="span">{description}</Box>
          </>
        )}
      </Stack>
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

SelectItemOption.bindProps = (getters, option, state) => ({
  Icon: getters.avatar(option),
  title: getters.primary(option),
  description: getters.secondary(option),
  tooltip: getters.info(option),
  selected: state.selected,
});

export default SelectItemOption;
