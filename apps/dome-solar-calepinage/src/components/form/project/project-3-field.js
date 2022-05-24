import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SectionTitle from '../atoms/section-title';

const ProjectStep3 = (props) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register } = useForm({
    defaultValues: store,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <SectionTitle primary={'Infos toitures'} />
        <Grid item xs={6}>
          <TextField
            placeholder="Roof typology"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Incline"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Purlin Type"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Purlin Thickness"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <SectionTitle primary={'Links'} />
        <Grid item xs={6}>
          <TextField
            placeholder="Creator"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Customer"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Commercial"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Technician"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Layouts"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

ProjectStep3.getLayout = function getLayout(page) {
  return page;
};

export default ProjectStep3;
