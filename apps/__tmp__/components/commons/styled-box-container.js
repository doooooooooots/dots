import { Box, styled } from '@mui/material';

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderRadius: theme.spacing(2),
  borderColor: theme.palette.divider,
  padding: theme.spacing(1),
  paddingTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: theme.palette.neutral[50],
  color: theme.palette.text.light,
  '& button': {
    backgroundColor: theme.palette.neutral[0]
  },
  '& .MuiTypography-overline': {
    marginTop: theme.spacing(-1),
    display: 'block'
  },
  boxShadow: theme.shadowStyles.morph
}));

export default StyledBoxContainer;
