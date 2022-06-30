import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { isArray, isNumber, isString } from 'lodash';
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

  let fontSize = 16;
  if (isString(startIcon) || isNumber(startIcon)) {
    fontSize = 12;
    if (/\p{Extended_Pictographic}/u.test(startIcon)) {
      fontSize = 10;
    }
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={[
        {
          px: 1,
          color: 'text.secondary',
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
            fontSize={fontSize}
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
          maxWidth: 230,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
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
