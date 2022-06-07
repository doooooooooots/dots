import React, { useMemo } from 'react';
import { Button, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { ucFirst } from '@dots.cool/utils';
import AddIcon from '@mui/icons-material/Add';
import { useAutocomplete } from '../select-with-autocomplete/hooks/use-autocomplete';
import { Box, styled } from '@mui/system';

const StyledButton = styled((props) => {
  const { variant, color } = props;
  <Button
    onClick={onButtonClick}
    sx={[
      {
        minWidth: 40,
        open && {
        bgcolor: `neutral.background`,
      },
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

      sx,
    ]}
    {...props}
  />;
})``;

function ButtonBase(props) {
  const {
    color = 'neutral',
    variant = 'standard',
    startIcon,
    endIcon,
    tooltip,
    placement = 'bottom',
    followCursor = false,
    sx = {},
  } = props;

  const { open, value, hasValue, onButtonClick } = useAutocomplete();

  return (
    <Tooltip title={tooltip} placement={placement} followCursor={followCursor}>
      <Button
        onClick={onButtonClick}
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
