import React from 'react';
import { Alert } from '@mui/material';

function ErrorPage(props) {
  const { message } = props;

  return <Alert severity="error">{message}</Alert>;
}

export default ErrorPage;
