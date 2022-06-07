import React, { useCallback } from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { createOneBuilder } from '@dots.cool/schemas';
import { useStore } from '../context/useStore';
import SectionTitle from './atoms/section-title';
import { STATUS_OPTIONS } from '../../constants/constants';

const CREATE_SOLAR_MODULE = createOneBuilder('solarModule')('id');

const SolarModuleCreate = () => {
  const { renderView, closeDialog, setUserData, setRelatedData } = useStore();

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      name: '',
      status: 'status_available',
      lengthX: 1200,
      lengthY: 950,
      lengthZ: 45,
      electricalPower: 0,
    },
  });

  const [createSolarModule] = useMutation(CREATE_SOLAR_MODULE);

  const onSubmit = useCallback(
    async (data) => {
      await createSolarModule({ variables: { data: data } });
      setUserData('Mx', data.lengthX);
      setUserData('My', data.lengthY);
      setRelatedData('solarModule', data);
      renderView();
      closeDialog();
    },
    [createSolarModule, setUserData, setRelatedData, renderView, closeDialog]
  );

  return (
    <>
      <Grid container mb={3} columnSpacing={1}>
        <SectionTitle primary={'Informations de base'} noGutterTop />
        <Grid item xs={8}>
          <TextField label="Nom" size="small" fullWidth {...register('name')} />
        </Grid>
        <Grid item xs={4}>
          <Controller
            render={({ field }) => (
              <Select {...field} size="small" fullWidth>
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            )}
            name="status"
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
            {...register('lengthX', {
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
            {...register('lengthZ', {
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
            {...register('electricalPower', {
              valueAsNumber: true,
            })}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={handleSubmit(onSubmit)} fullWidth>
        Enregistrer
      </Button>
    </>
  );
};

export default SolarModuleCreate;
