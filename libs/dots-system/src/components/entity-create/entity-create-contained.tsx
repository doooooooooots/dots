import { Container } from '@mui/system';
import React from 'react';
import EntityCreateStepper from './entity-create-stepper';

function EntityCreateContained(props) {
  return (
    <Container maxWidth="lg" sx={{ bgcolor: 'background.default', p: 4 }}>
      <EntityCreateStepper {...props} />;
    </Container>
  );
}

export default EntityCreateContained;
