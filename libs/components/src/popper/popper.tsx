import { styled } from '@mui/system';
import Popper from '@mui/material/Popper';

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: `1px solid ${theme.palette['divider']}`,
  boxShadow: theme.[shadows][10],
  borderRadius: 6,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
  color: theme.palette['text'].primary,
  backgroundColor: theme.palette['background'].default,
}));

export default StyledPopper;
