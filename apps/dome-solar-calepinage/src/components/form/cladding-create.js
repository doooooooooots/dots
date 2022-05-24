import React, { useCallback } from 'react';
import { Button, TextField, Grid, Typography, Stack } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';

const CREATE_CLADDING = createOneBuilder('cladding')('id');

const CladdingCreate = () => {
  const { renderView, closeDialog, setRelatedData } = useStore();
  const { register, handleSubmit } = useFormContext();

  const [createCladding] = useMutation(CREATE_CLADDING);

  const onSubmit = useCallback(
    async (data) => {
      await createCladding({ variables: { data: data.solarModule } });
      setRelatedData('cladding', data.solarModule);
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
        <TextField
          label="Nom"
          size="small"
          fullWidth
          {...register('cladding.name')}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Status"
          size="small"
          fullWidth
          {...register('cladding.status')}
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
          {...register('solarModule.lengthX', {
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
          {...register('solarModule.lengthY', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Epaisseur (↖︎)"
          size="small"
          fullWidth
          {...register('cladding.thickness')}
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
          {...register('solarModule.lengthZ', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Nombre d'ondes"
          size="small"
          fullWidth
          {...register('cladding.numberOfWaves')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Largeur base d'onde"
          size="small"
          fullWidth
          {...register('cladding.waveBaseWidth')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Largeur hauteur d'onde"
          size="small"
          fullWidth
          {...register('cladding.waveTopWidth')}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Apparence</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Matériel"
          size="small"
          fullWidth
          {...register('cladding.material')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Couleur"
          size="small"
          fullWidth
          {...register('cladding.color')}
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
