import React, { useCallback } from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';
import SectionTitle from './atoms/section-title';

const CREATE_SOLAR_MODULE = createOneBuilder('solarModule')('id');

const SolarModuleCreate = () => {
  const { renderView, closeDialog, setUserData, setRelatedData } = useStore();
  const { register, handleSubmit, control } = useFormContext();

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
    <Grid container spacing={2}>
      <SectionTitle primary={'Informations de base'} />
      <Grid item xs={8}>
        <TextField
          label="Nom"
          size="small"
          fullWidth
          {...register('solarModule.name')}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          render={({ field }) => (
            <Select {...field} size="small" fullWidth>
              <MenuItem value={'status_draft'}>Draft</MenuItem>
              <MenuItem value={'status_available'}>Available</MenuItem>
              <MenuItem value={'status_archived'}>Archived</MenuItem>
            </Select>
          )}
          name="solarModule.status"
          control={control}
          defaultValue="status_draft"
        />
      </Grid>
      <SectionTitle primary="Dimensions" />
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
      <SectionTitle primary="Puissance" />
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
        <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
          Enregistrer
        </Button>
      </Grid>
    </Grid>
  );
};

export default SolarModuleCreate;
