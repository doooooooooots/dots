import React from 'react';
import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const ProjectStep3 = (props) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register } = useForm({
    defaultValues: store,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <TextField
          placeholder="Roof typology"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Incline"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Purlin Type"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Purlin Thickness"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Creator"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Customer"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Commercial"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Technician"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Layouts"
          {...register('project.identifier')}
          fullWidth
        />
      </Stack>
    </form>
  );
};

ProjectStep3.getLayout = function getLayout(page) {
  return page;
};

export default ProjectStep3;
