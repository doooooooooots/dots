import React from 'react';
import { Alert } from '@mui/material';

function ErrorPage(props) {
  const { message, ...other } = props;

  return (
    <Alert severity="error" {...other}>
      {typeof message === 'string' && message}
      {typeof message !== 'string' && (
        <pre>
          <code>{JSON.stringify(message, null, 2)}</code>
        </pre>
      )}
    </Alert>
  );
}

export default ErrorPage;
