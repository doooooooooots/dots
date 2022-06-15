import { Typography } from '@mui/material';
import React from 'react';

function PopperNumber(props) {
  const { value, onSubmit, onCancel, children } = props;

  const Content = <Typography variant="h3">{value.current}</Typography>;

  return children({
    content: Content,
  });
}

export default PopperNumber;
