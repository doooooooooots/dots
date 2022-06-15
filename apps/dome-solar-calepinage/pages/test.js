import React from 'react';
import { Container } from '@mui/system';
import Field from '../src/components/dots-system/components/field';
import FieldContainer from '../src/components/dots-system/components/field-container';
import { Typography } from '@mui/material';

function test() {
  return (
    <Container sx={{ pt: 6 }}>
      <FieldContainer>
        <Typography variant="h3" mb={2}>
          Bonjour
        </Typography>
        <Field type="number" value={3} label="Number value" />
        <Field type="text" value="Ça marche" label="Text value" />
        <Field type="date" value="Ça marche" label="Date value" />
        <Field type="dimension" value="Ça marche" label="Dimension value" />
        <Field type="list" value="Ça marche" label="Select value" />
        <Field type="tag" value="Ça marche" label="Tag value" />
        <Field type="link" value="Ça marche" label="Link value" />
      </FieldContainer>
    </Container>
  );
}

export default test;
