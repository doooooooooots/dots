import React from 'react';
import { Stack, Typography } from '@mui/material';
import { isArray } from 'lodash';

// Icons
// [ ](Adrien): use dynamic imports
import AbcIcon from '@mui/icons-material/Abc';
import PermDataSettingOutlinedIcon from '@mui/icons-material/PermDataSettingOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import Filter1OutlinedIcon from '@mui/icons-material/Filter1Outlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import LinkIcon from '@mui/icons-material/Link';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';

const getIconComponent = (type) => {
  switch (type) {
    case 'select':
      return ListOutlinedIcon;
    case 'dimension':
      return PermDataSettingOutlinedIcon;
    case 'number':
      return Filter1OutlinedIcon;
    case 'text':
      return AbcIcon;
    case 'date':
      return CalendarTodayOutlinedIcon;
    case 'relationship':
      return LinkIcon;
    case 'tag':
      return SellOutlinedIcon;
    default:
      return null;
  }
};

function FieldLabel(props) {
  const { type, label, sx = {} } = props;

  let _sx = isArray(sx) ? sx : [sx];

  const Icon = getIconComponent(type);

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
      {Icon && <Icon type={type} />}
      <Typography
        variant="caption"
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
