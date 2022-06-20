import MuiList from '@mui/material/List';
import { styled } from "@mui/system";

const List = styled(MuiList)(({ theme }) => ({
  '& .MuiListItemButton-root': {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: theme.spacing(2)
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20
  }
}));

export default List