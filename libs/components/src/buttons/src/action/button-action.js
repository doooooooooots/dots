import { styled } from '@mui/material';
import Button from '../base';

const ButtonAction = styled(Button)(
  ({ theme }) => `
  color: ${theme.palette.neutral[500]};
  justify-content:flex-start;
  padding: 4px 8px;

  &:hover {
    background-color: ${theme.palette.background.alternative};
  }
`
);

export default ButtonAction;
