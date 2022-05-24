import React from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import SectionTitle from '../atoms/section-title';
import AutocompletePeople from '../atoms/autocomplete-people';
import InputMask from 'react-input-mask';

// Will work fine
function Input(props) {
  return (
    <InputMask
      mask="F999999"
      value={props.value}
      onChange={props.onChange}
      {...props}
    >
      {() => <TextField {...props} />}
    </InputMask>
  );
}

const ProjectStep1 = (props, ref) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register, control } = useForm({
    defaultValues: store,
  });

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            render={({ field }) => (
              <Input
                placeholder="N° de référence"
                variant="standard"
                fullWidth
                {...field}
              />
            )}
            name="project.identifier"
            control={control}
          />
        </Grid>
        <SectionTitle primary={'Informations de base'} />
        <Grid item xs={8}>
          <TextField
            placeholder="Name"
            {...register('project.name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="form-status-label">Status</InputLabel>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  id="form-status"
                  labelId="form-status-label"
                  label="Status"
                  fullWidth
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              )}
              name="project.status"
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <AutocompletePeople placeholder="Commercial" />
        </Grid>
        <SectionTitle primary={'Dates'} />
        <Grid item xs={6}>
          <TextField
            placeholder="Date Reception"
            {...register('project.dateReception')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Date Delivery"
            {...register('project.dateDelivery')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Type emergency"
            {...register('project.emercency')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Step"
            {...register('project.identifier')}
            fullWidth
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
