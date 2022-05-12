import { styled, Tab } from '@mui/material';

const StyledTabHorizontal = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
  padding: '10px',
  minHeight: 10,
  '&:hover': {
    boxShadow: `inset 0 -1px ${theme.palette.primary.main}`
  },
  '&.Mui-selected': {
    fontWeight: 600
  }
}));

export default StyledTabHorizontal;
