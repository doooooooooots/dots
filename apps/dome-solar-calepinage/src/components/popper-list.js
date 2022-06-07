import React from 'react';
import { styled } from '@mui/system';
import { List } from '@mui/material';
import { POPPER_SEARCH_PADDING } from '../constants/constants';

const PopperList = styled(List)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    paddingLeft: theme.spacing(POPPER_SEARCH_PADDING),
    paddingRight: theme.spacing(POPPER_SEARCH_PADDING),
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
