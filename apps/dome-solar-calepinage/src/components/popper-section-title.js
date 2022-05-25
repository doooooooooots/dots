import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const PopperSectionTitle = styled((props) => (
  <Typography {...props} variant="overline" />
))(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
}));

export default PopperSectionTitle;
