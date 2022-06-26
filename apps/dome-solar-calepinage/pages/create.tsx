import React from 'react';

import { Container } from '@mui/system';
import EntityCreate from '../src/components/layout-create/forms/entity-create';

function CreatePage() {
  return (
    <Container maxWidth="lg">
      <EntityCreate entityName="project" />
    </Container>
  );
}

export default CreatePage;
