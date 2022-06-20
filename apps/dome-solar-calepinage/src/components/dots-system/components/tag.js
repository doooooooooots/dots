import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { isArray } from 'lodash';
import { Box } from '@mui/system';

function Tag({
  startIcon,
  endIcon,
  variant = 'caption',
  children,
  fullColor,
  withBorder,
  sx = {},
  ...props
}) {
  const _sx = isArray(sx) ? sx : [sx];

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={[
        {
          px: 1,
          color: 'text.secondary',
          fontSize: 12,
        },
        withBorder && {
          border: 1,
          borderRadius: '4px',
          borderColor: 'divider',
        },
        ..._sx,
      ]}
      {...props}
    >
      {Boolean(startIcon) && (
        <>
          <Box
            display="flex"
            alignItems="center"
            component="span"
            fontSize={typeof startIcon === 'string' ? 9 : 16}
            borderRight={1}
            borderColor="divider"
            pr={1}
            width={20}
            justifyContent="center"
          >
            {startIcon}
          </Box>
          <Divider orientation="vertical" />
        </>
      )}
      <Typography
        variant={variant}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth: 230,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </Typography>
      {Boolean(endIcon) && (
        <>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant={variant}>
            {typeof endIcon === 'string'
              ? endIcon.toLocaleLowerCase()
              : endIcon}
          </Typography>
        </>
      )}
    </Stack>
  );
}

export default Tag;
