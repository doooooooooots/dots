import React from 'react';
import { Alert } from '@mui/material';

function ErrorPage(props) {
  const { message, ...other } = props;

  return (
    <Alert severity="error" {...other}>
      {message}
    </Alert>
  );
}

export default ErrorPage;
