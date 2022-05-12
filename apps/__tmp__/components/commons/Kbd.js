import { Box, styled } from '@mui/material';
import React from 'react';

const KbdComponent = (props) => <Box {...props} component='kbd' />;

const Kbd = styled(KbdComponent)(({ theme }) => ({
  display: ' inline-block',
  margin: ' 0 0.1em',
  padding: ' 0.1em 0.6em',
  fontSize: ' 11px',
  lineHeight: ' 1.4',
  color: `${theme.palette.neutral[800]}`,
  textShadow: `0 1px 0 ${theme.palette.neutral[0]}`,
  backgroundColor: `${theme.palette.neutral[50]}`,
  border: `1px solid ${theme.palette.neutral[400]}`,
  borderRadius: ' 3px',
  boxShadow: ' 0 1px 1px hsla(210,8%,5%,0.15),inset 0 1px 0 0 var(--white)',
  whiteSpace: ' nowrap'
}));

export default React.memo(Kbd);
