import React, { useCallback } from 'react';
import {
  Chip,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SectionTitle from '../../atoms/section-title';
import AreaField from '../../design-system/fields/area-field';
import GoogleMapInput from '../../design-system/google-map/google-map-input';
import AutocompletePeople from '../../atoms/autocomplete-people';
import CountrySelect from '../../atoms/autocomplete-country';

const ProjectStep2 = (props, ref) => {
  const { onSubmit } = props;

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      streetSignPlace: '',
      streetName: '',
      city: '',
      country: '',
    },
  });

  const hydrateGeoCodeData = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <SectionTitle id="section-address" primary={'Adresse'} />
        <Grid item xs={12}>
          <GoogleMapInput onSubmitSuccess={hydrateGeoCodeData} />
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip variant="outlined" label="OU" />
          </Divider>
        </Grid>

        <Grid item xs={2}>
          <TextField
            label="N°"
            type="number"
            {...register('project.streetSignPlace', {
              valueAsNumber: true,
            })}
            fullWidth
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            label="Nom de rue"
            {...register('project.streetName')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Ville" {...register('project.city')} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <CountrySelect />
        </Grid>
        <SectionTitle id="section-field" primary={'Terrain'} />
        <Grid item xs={6}>
          <TextField
            label="Hauteur crête maximale"
            type="number"
            {...register('project.maxRidgeHeight', {
              valueAsNumber: true,
            })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Zone de vent"
            type="number"
            {...register('project.areaWind')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="form-status-label">Catégorie de terrain</InputLabel>
            <Controller
              render={({ field }) => (
                <AreaField {...field} label="Catégorie de terrain" />
              )}
              name="project.areaField"
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Distance bord de mer"
            {...register('project.areaSea')}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Altitude"
            type="number"
            {...register('project.altitude', {
              valueAsNumber: true,
            })}
            fullWidth
          />
        </Grid>
        <SectionTitle id="section-hr" primary={'Gestion'} />
        <Grid item xs={12}>
          <Grid item xs={12}>
            <AutocompletePeople label="Opérateur" />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

ProjectStep2.getLayout = function getLayout(page) {
  return page;
};

export default React.forwardRef(ProjectStep2);
