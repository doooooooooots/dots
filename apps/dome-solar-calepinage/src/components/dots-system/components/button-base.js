import React from 'react';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { usePopupState } from 'material-ui-popup-state/hooks';

function ButtonBase(props) {
  const {
    name,
    color = 'neutral',
    variant = 'standard',
    startIcon,
    endIcon,
    tooltip,
    placement = 'bottom',
    followCursor = false,
    sx = {},
    children,
    ...other
  } = props;

  const popupState = usePopupState({
    variant: 'popper',
    popupId: `${name}-popper-field`,
  });

  return (
    <Tooltip title={tooltip} placement={placement} followCursor={followCursor}>
      <Button
        {...other}
        sx={[
          {
            minWidth: 40,
            '&, & .MuiTypography-root': {
              typography: 'body2',
              fontWeight: '500',
              color: `${color}.main`,
            },
          },
          variant === 'outlined' && {
            border: '1px solid',
            borderColor: `border.${color}`,
          },
          variant === 'contained' && {
            bgcolor: `${color}.main`,
            '&, & .MuiTypography-root': {
              color: `${color}.contrastText`,
            },
          },
          open && {
            bgcolor: `neutral.background`,
          },
          sx,
        ]}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          {/*//* START ICON */}
          {Boolean(startIcon) && startIcon}

          {children}

          {/*//* END ICON */}
          {!!endIcon &&
            (['string', 'number'].includes(typeof endIcon) ? (
              <Typography>{endIcon}</Typography>
            ) : (
              endIcon
            ))}
        </Stack>
      </Button>
    </Tooltip>
  );
}

export default ButtonBase;
