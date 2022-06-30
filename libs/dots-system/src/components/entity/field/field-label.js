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
import { FIELD_TYPES } from '@dots.cool/tokens';

const getIconComponent = (type) => {
  switch (type) {
    case FIELD_TYPES.select:
      return ListOutlinedIcon;
    case FIELD_TYPES.dimension:
      return PermDataSettingOutlinedIcon;
    case FIELD_TYPES.number:
      return Filter1OutlinedIcon;
    case FIELD_TYPES.text:
      return AbcIcon;
    case FIELD_TYPES.timestamp:
      return CalendarTodayOutlinedIcon;
    case FIELD_TYPES.relationship:
      return LinkIcon;
    case FIELD_TYPES.tag:
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
