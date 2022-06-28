import MuiPopper from '@mui/material/Popper';
import { styled } from '@mui/system';

const Popper = styled(MuiPopper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[8],
  borderRadius: 6,
  minWidth: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}));

export default Popper;
