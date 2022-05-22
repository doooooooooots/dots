import React from 'react';
import { Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const ProjectStep2 = (props) => {
  const { onSubmit, store } = props;

  const { handleSubmit, register } = useForm({
    defaultValues: store,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <TextField
          placeholder="Street Sign Place"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Step"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Country"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="City"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Ridge Height"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Area Wind"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Area Field"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Area Sea"
          {...register('project.identifier')}
          fullWidth
        />
        <TextField
          placeholder="Altitude"
          {...register('project.identifier')}
          fullWidth
        />
      </Stack>
    </form>
  );
};

ProjectStep2.getLayout = function getLayout(page) {
  return page;
};

export default ProjectStep2;
