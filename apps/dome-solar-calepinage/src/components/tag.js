import React from 'react';
import { Typography, Stack } from '@mui/material';
import stringToInt from '../utils/string-to-int';
import { isEmpty } from 'lodash';

function Tag(props) {
  const { variant, icon, type, emoji, children } = props;

  let _emoji = emoji;
  switch (type) {
    case 'ref':
      _emoji = '🗂';
      break;
    case 'target':
      _emoji = '🎯';
      break;
    case 'objective':
      _emoji = '🚀';
      break;
    case 'like':
      _emoji = '👍';
      break;
    case 'angry':
      _emoji = '🤬';
      break;
    case 'step':
      _emoji = '⛳️';
      break;
    case 'emergency':
      _emoji = '🚨';
      break;
    default:
      break;
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={[
        {
          px: 1,
          borderRadius: '4px',
          border: '1px solid',
          borderColor: 'divider',
          color: 'grey.800',
          bgcolor: 'background.default',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
          },
        },
        variant == 'colored' && {
          bgcolor: (theme) => theme.palette.tags[stringToInt(children)],
        },
      ]}
      alignItems="center"
    >
      {!isEmpty(icon) && icon}
      {_emoji && typeof _emoji === 'string' && (
        <Typography variant="caption">{_emoji}</Typography>
      )}
      {_emoji && typeof _emoji !== 'string' && _emoji}
      <Typography variant="body2">{children}</Typography>
    </Stack>
  );
}

export default Tag;
