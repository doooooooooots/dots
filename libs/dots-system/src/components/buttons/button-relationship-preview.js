import { Button } from '@mui/material';
import React from 'react';

function ButtonRelationshipPreview(props) {
  const { entityName, count, onClick } = props;

  let Icon;
  switch (entityName) {
    case 'project':
      break;
    default:
      Icon;
  }

  return (
    <Button color="neutral" variant="outlined" onClick={onClick}>
      {count}
    </Button>
  );
}

export default ButtonRelationshipPreview;
