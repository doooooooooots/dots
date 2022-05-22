import React, { useCallback } from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';

const CREATE_SOLAR_MODULE = createOneBuilder('solarModule')('id');

const SolarModuleCreate = () => {
  const { renderView, closeDialog, setUserData, setRelatedData } = useStore();
  const { register, handleSubmit } = useFormContext();

  const [createSolarModule] = useMutation(CREATE_SOLAR_MODULE);

  const onSubmit = useCallback(
    async (data) => {
      await createSolarModule({ variables: { data: data.solarModule } });
      setUserData('Mx', data.solarModule.lengthX);
      setUserData('My', data.solarModule.lengthY);
      setRelatedData('solarModule', data.solarModule);
      renderView();
      closeDialog();
    },
    [createSolarModule, setUserData, setRelatedData, renderView, closeDialog]
  );

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={8}>
        <TextField
          label="Nom"
          size="small"
          fullWidth
          {...register('solarModule.name')}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Status"
          size="small"
          fullWidth
          {...register('solarModule.status')}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Dimensions</Typography>
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Longueur (⟷)"
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
          label="Largeur (↕︎)"
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
          type="number"
          fullWidth
          {...register('solarModule.lengthZ', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Puissance</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Puissance electique (kWc)"
          size="small"
          type="number"
          fullWidth
          {...register('solarModule.electricalPower', {
            valueAsNumber: true,
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

export default SolarModuleCreate;
