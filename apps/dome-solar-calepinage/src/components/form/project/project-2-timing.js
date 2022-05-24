import React from 'react';
import { Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import SectionTitle from '../atoms/section-title';

const ProjectStep2 = (props, ref) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register } = useForm({
    defaultValues: store,
  });

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <SectionTitle primary={'Adresse'} />
        <Grid item xs={12}>
          <TextField
            placeholder="Street Sign Place"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="City"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Country"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <SectionTitle primary={'Terrain'} />
        <Grid item xs={6}>
          <TextField
            placeholder="Ridge Height"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Area Wind"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Area Field"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Area Sea"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            placeholder="Altitude"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

ProjectStep2.getLayout = function getLayout(page) {
  return page;
};

export default React.forwardRef(ProjectStep2);
