import React from 'react';
import { Container } from '@mui/system';
import Field from '../src/components/dots-system/components/field';
import FieldContainer from '../src/components/dots-system/components/field-container';

function test() {
  return (
    <Container sx={{ pt: 6 }}>
      <FieldContainer>
        <Field type="number" value="Ça marche" label="Number value" />
        <Field type="text" value="Ça marche" label="Text value" />
        <Field type="list" value="Ça marche" label="Select value" />
        <Field type="link" value="Ça marche" label="Link value" />
        <Field type="date" value="Ça marche" label="Date value" />
        <Field type="tag" value="Ça marche" label="Tag value" />
        <Field type="dimension" value="Ça marche" label="Dimension value" />
      </FieldContainer>
    </Container>
  );
}

export default test;
