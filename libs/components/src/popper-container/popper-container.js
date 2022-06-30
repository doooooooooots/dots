import React from 'react';
import { autocompleteClasses, Stack, useTheme } from '@mui/material';
import { isArray } from 'lodash';

function PopperContainer(props, ref) {
  const { sx, ...other } = props;
  const _sx = isArray(sx) ? sx : [sx];
  const theme = useTheme();

  return (
    <Stack
      ref={ref}
      {...other}
      direction="column"
      sx={[
        {
          overflow: 'hidden',
          maxHeight: '40vh',
          [`& .${autocompleteClasses.paper}`]: {
            boxShadow: 'none',
            margin: 0,
            color: 'inherit',
            fontSize: 13,
            overflow: 'auto',
            height: '100%',
            width: '100%',
          },
          [`& .${autocompleteClasses.listbox}`]: {
            backgroundColor: theme.palette.background.default,
            padding: 0,
            maxHeight: 'none',
            height: '100%',
            [`& .${autocompleteClasses.option}`]: {
              minHeight: 'auto',
              alignItems: 'flex-start',
              padding: 1,
              borderBottom: `1px solid  ${theme.palette.divider}`,
              '&[aria-selected="true"]': {
                backgroundColor: 'neutral.background',
              },
              [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
                {
                  backgroundColor: theme.palette.action.hover,
                },
            },
          },
          [`&.${autocompleteClasses.popperDisablePortal}`]: {
            position: 'relative',
          },
        },
        ..._sx,
      ]}
    />
  );
}

export default React.forwardRef(PopperContainer);
