import React, { useCallback } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';

const CREATE_CLADDING = createOneBuilder('cladding')('id');

const CladdingCreate = () => {
  const { renderView, closeDialog, setRelatedData } = useStore();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: 'Bac acier',
      status: 'status_available',
      lengthX: 1000,
      lengthY: 1000,
      thickness: 5,
      lengthZ: 45,
      numberOfWaves: 4,
      waveBaseWidth: 30,
      waveTopWidth: 50,
      material: 1,
      color: 'black',
    },
  });

  const [createCladding] = useMutation(CREATE_CLADDING);

  const onSubmit = useCallback(
    async (data) => {
      await createCladding({ variables: { data: data } });
      console.log(data);
      setRelatedData('cladding', data);
      renderView();
      closeDialog();
    },
    [createCladding, setRelatedData, renderView, closeDialog]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Informations de base</Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField label="Nom" size="small" fullWidth {...register('name')} />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Status"
          size="small"
          fullWidth
          {...register('status')}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Dimensions</Typography>
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
          label="Epaisseur (↖︎)"
          size="small"
          type="number"
          fullWidth
          {...register('thickness', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Valeurs d&apos;ondes</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Hauteur d'ondes"
          size="small"
          type="number"
          fullWidth
          {...register('lengthZ', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nombre d'ondes"
          size="small"
          type="number"
          fullWidth
          {...register('numberOfWaves', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Largeur base d'onde"
          size="small"
          type="number"
          fullWidth
          {...register('waveBaseWidth', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Largeur hauteur d'onde"
          size="small"
          type="number"
          fullWidth
          {...register('waveTopWidth', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Apparence</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Matériel"
          size="small"
          type="number"
          fullWidth
          {...register('material', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Couleur"
          size="small"
          fullWidth
          {...register('color')}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

export default CladdingCreate;
