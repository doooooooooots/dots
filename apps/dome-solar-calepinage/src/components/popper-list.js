import React from 'react';
import { styled } from '@mui/system';
import { List } from '@mui/material';

const PopperList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

export default PopperList;
