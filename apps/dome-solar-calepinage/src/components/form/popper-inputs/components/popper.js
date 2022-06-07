import { styled } from '@mui/system';
import MuiPopper from '@mui/material/Popper';

const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette.text.primary,
}));

export default Popper;
