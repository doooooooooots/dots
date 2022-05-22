import React from 'react';
import { Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const ProjectStep1 = (props) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register } = useForm({
    defaultValues: store,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            placeholder="identifier"
            {...register('project.identifier')}
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            placeholder="Name"
            {...register('project.name')}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            placeholder="Status"
            {...register('project.status')}
            fullWidth
          />
        </Grid>
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
      </Grid>
    </form>
  );
};

ProjectStep1.getLayout = function getLayout(page) {
  return page;
};

export default ProjectStep1;
