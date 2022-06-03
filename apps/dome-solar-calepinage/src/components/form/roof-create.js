import React, { useCallback } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Stack,
  Alert,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';

const CREATE_CLADDING = createOneBuilder('roof')('id');

const RoofFormCreate = () => {
  const { renderView, closeDialog, setRelatedData, getRelatedData } =
    useStore();
  const project = getRelatedData('project');
  const { id: projectID } = project;

  const { register, handleSubmit } = useFormContext();
  const [createCladding] = useMutation(CREATE_CLADDING);

  const onSubmit = useCallback(
    async (data) => {
      const output = {
        ...data.roof,
        project: { connect: { id: projectID } },
      };
      await createCladding({ variables: { data: output } });
      setRelatedData('roof', data.solarModule);
      renderView();
      closeDialog();
    },
    [projectID, createCladding, setRelatedData, renderView, closeDialog]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Informations de base</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          label="Nom"
          size="small"
          fullWidth
          {...register('roof.name')}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Status"
          size="small"
          fullWidth
          {...register('roof.status')}
        />
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
          {...register('roof.typology', {
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
          {...register('roof.lengthX', {
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
          {...register('roof.lengthY', {
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
          {...register('roof.incline', {
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
          {...register('roof.ridgeHeight', {
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
          {...register('roof.purlinType', {
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
          {...register('roof.purlinBetweenAxis', {
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
          {...register('roof.purlinThickness', {
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
