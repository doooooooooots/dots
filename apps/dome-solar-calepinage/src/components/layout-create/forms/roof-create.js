import React, { useCallback } from 'react';
import { Button, TextField, Grid, Typography, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@keystone-nx/schema--to-delete';
import { useStore } from '../../../contexts/useStore';

const CREATE_ROOF = createOneBuilder('roof')('id');

const RoofFormCreate = () => {
  const {
    renderView,
    closeDialog,
    setRelatedData,
    getRelatedData,
    setUserData,
  } = useStore();

  const project = getRelatedData('project');
  const { id: projectID } = project;

  const { handleSubmit, register, control } = useForm({
    defaultValues: {},
  });

  const [createRoof] = useMutation(CREATE_ROOF);

  const onSubmit = useCallback(
    async (data) => {
      const output = {
        ...data,
        project: { connect: { id: projectID } },
      };

      await createRoof({ variables: { data: output } });
      setUserData('Tx', data.lengthX);
      setUserData('Ty', data.lengthY);
      setRelatedData('roof', data);
      renderView();
      closeDialog();
    },
    [
      projectID,
      createRoof,
      setUserData,
      setRelatedData,
      renderView,
      closeDialog,
    ]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Informations de base</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField label="Nom" size="small" fullWidth {...register('name')} />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Dimensions</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Typology"
          size="small"
          type="number"
          fullWidth
          {...register('typology', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Largeur (⟷)"
          size="small"
          type="number"
          fullWidth
          {...register('lengthX', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Hauteur (↕︎)"
          size="small"
          type="number"
          fullWidth
          {...register('lengthY', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="incline (° ou %)"
          size="small"
          type="number"
          fullWidth
          {...register('incline', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="ridgeHeight"
          size="small"
          type="number"
          fullWidth
          {...register('ridgeHeight', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">Panne</Typography>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="PurlinType"
          size="small"
          type="number"
          fullWidth
          {...register('purlinType', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="purlinBetweenAxis"
          size="small"
          type="number"
          fullWidth
          {...register('purlinBetweenAxis', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="purlinThickness"
          size="small"
          type="number"
          fullWidth
          {...register('purlinThickness', {
            valueAsNumber: true,
          })}
        />
      </Grid>

      <Grid item xs={12}>
        <Alert severity="info">
          <Typography>{`La toiture sera liée automatiquement au projet ${project.name}`}</Typography>
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

export default RoofFormCreate;
