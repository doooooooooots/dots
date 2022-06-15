import React from 'react';
import { Stack, Typography } from '@mui/material';
import { isEmpty, isArray } from 'lodash';

// Icons
// [ ](Adrien): use dynamic imports
import AbcIcon from '@mui/icons-material/Abc';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LinkIcon from '@mui/icons-material/Link';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

function FieldLabel(props) {
  const { icon, type, label, sx = {} } = props;

  let _sx = isArray(sx) ? sx : [sx];

  let Icon = icon;
  if (!Icon) {
    switch (type) {
      case 'list':
        Icon = ListOutlinedIcon;
        break;
      case 'dimension':
        Icon = PermDataSettingOutlinedIcon;
        break;
      case 'number':
        Icon = Filter1OutlinedIcon;
        break;
      case 'text':
        Icon = AbcIcon;
        break;
      case 'date':
        Icon = CalendarTodayOutlinedIcon;
        break;
      case 'link':
        Icon = LinkIcon;
        break;
      case 'tag':
        Icon = SellOutlinedIcon;
        break;
    }
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={[
        {
          color: 'neutral.600',
          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
          },
        },
        ..._sx,
      ]}
    >
      {!isEmpty(Icon) && <Icon />}
      <Typography
        variant="body2"
        sx={{
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

export default FieldLabel;
