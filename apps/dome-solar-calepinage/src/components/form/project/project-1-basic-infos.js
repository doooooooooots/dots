import React from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SectionTitle from '../atoms/section-title';
import AutocompletePeople from '../atoms/autocomplete-people';
import StaticDatePickerLandscape from '../atoms/date-picker';
import Status from '../fields/status';
import TextfieldWithMask from '../fields/textfield-with-mask';
import {
  PROJECT_STEP_LABELS,
  PROJECT_STEP_OPTIONS,
  STEP_PRE_STUDY_TODO,
} from '../../../constants';

const ProjectStep1 = (props, ref) => {
  const { onSubmit } = props;

  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      name: '',
      step: STEP_PRE_STUDY_TODO,
      typeEmergency: false,
      dateReception: new Date(),
      dateDelivery: new Date(),
    },
  });

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            render={({ field }) => (
              <TextfieldWithMask
                mask="F999999"
                label="N° de référence"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
            name="identifier"
            control={control}
          />
        </Grid>

        <SectionTitle id="section-main" primary={'Informations de base'} />

        <Grid item xs={8}>
          <TextField label="Nom du projet" {...register('name')} fullWidth />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="form-status-label">Status</InputLabel>
            <Controller
              render={({ field }) => <Status {...field} />}
              name="status"
              control={control}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <AutocompletePeople label="Commercial" />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Client" {...register('identifier')} fullWidth />
        </Grid>

        <SectionTitle id="section-steps" primary={'Etape'} />
        <Grid item xs={12}>
          <Controller
            render={({ field: { onChange, ...rest } }) => (
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                {...rest}
                onChange={(e, value) => {
                  onChange(value);
                }}
              >
                {PROJECT_STEP_OPTIONS.map((option) => (
                  <ToggleButton key={option} color="primary" value={option}>
                    {PROJECT_STEP_LABELS[option]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
            name="step"
            control={control}
          />
        </Grid>

        <Grid item xs={12}>
          <label>Urgence ?</label>
          <Controller
            name="typeEmergency"
            control={control}
            render={({ field }) => (
              <Switch
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            )}
          />
        </Grid>

        {/*//* DATES */}
        <SectionTitle id="section-dates" primary={'Dates'} />

        <Grid item xs={12}>
          <Controller
            name="dateReception"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <StaticDatePickerLandscape {...rest} toolbarTitle="Reçu le" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="dateDelivery"
            control={control}
            render={({ field: { ref, ...rest } }) => (
              <StaticDatePickerLandscape {...rest} toolbarTitle="Livraison " />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
};

ProjectStep1.getLayout = function getLayout(page) {
  return page;
};

export default React.forwardRef(ProjectStep1);
