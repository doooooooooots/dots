import React, { useCallback } from 'react';
import { Button, TextField, Grid, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../../contexts/useStore';

const CREATE_LAYOUT = createOneBuilder('layout')('id');

const LayoutFormCreate = () => {
  const {
    renderView,
    closeDialog,
    setRelatedData,
    getRelatedData,
    setUserData,
  } = useStore();

  const roof = getRelatedData('roof');
  const { id: roofID } = roof;

  const { handleSubmit, register, control } = useForm({
    defaultValues: {},
  });

  const [createLayout] = useMutation(CREATE_LAYOUT);

  const onSubmit = useCallback(
    async (data) => {
      const output = {
        ...data,
        roof: { connect: { id: roofID } },
      };

      await createLayout({ variables: { data: output } });
      setUserData('Tx', data.lengthX);
      setUserData('Ty', data.lengthY);
      setRelatedData('layout', data);
      renderView();
      closeDialog();
    },
    [roofID, createLayout, setUserData, setRelatedData, renderView, closeDialog]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Informations de base</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField label="Nom" size="small" fullWidth {...register('name')} />
      </Grid>

      {/* <Grid item xs={12}>
        <TextField
          label="Opérateur"
          size="small"
          fullWidth
          {...register('operator')}
        />
      </Grid> */}

      <Grid item xs={12}>
        <Alert severity="info">
          <Typography>{`La toiture sera liée automatiquement au projet ${roof.name}`}</Typography>
        </Alert>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

export default LayoutFormCreate;
