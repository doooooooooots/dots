import { InputBase } from '@mui/material';
import { alpha, styled } from '@mui/system';

const PopperInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: '100%',
  borderBottom: `1px solid ${theme.palette['divider']}`,
  '& input': {
    borderRadius: 4,
    backgroundColor: theme.palette['background'].default,
    padding: 8,
    transition: theme['transitions'].create(['border-color', 'box-shadow']),
    border: `1px solid ${theme.palette['divider']}`,
    fontSize: 14,
    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? alpha(theme.palette['primary'].main, 0.2)
          : theme.palette['primary'].main
      }`,
      borderColor: theme.palette['primary'].main,
    },
  },
}));

export default PopperInput;
