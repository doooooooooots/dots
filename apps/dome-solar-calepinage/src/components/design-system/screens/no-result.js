import React from 'react';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { Box, useTheme } from '@mui/system';

function NoResult(props) {
  const { content = 'No result' } = props;
  const theme = useTheme();
  return (
    <Stack p={1} borderRadius={1} textAlign="center">
      <Image
        alt="no-result-image"
        title="No result"
        src={'/assets/illustrations/no-result.svg'}
        width={90}
        height={90}
        style={{ fill: theme.palette.neutral.light }}
      />
      {content && typeof content === 'string' ? (
        <Typography varianh="h6">{content}</Typography>
      ) : (
        content
      )}
    </Stack>
  );
}

export default NoResult;
