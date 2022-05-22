import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import { Button, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useStore } from '@components/context/useStore';
import { useForm } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(where: { id: $id }) {
      id
      name
      status
      city
      identifier
      name
      status
      dateReception
      dateDelivery
      typeEmergency
      streetSignPlace
      streetName
      step
      country
      city
      ridgeHeight
      areaWind
      areaField
      areaSea
      areaSnow
      altitude
      roofTypology
      incline
      purlinType
      purlinBetweenAxis
      purlinThickness
    }
  }
`;

const TabProject = () => {
  const router = useRouter();
  const { id } = router.query;

  const store = useStore();

  const { data, loading } = useQuery(GET_PROJECT, {
    variables: { id },
    skip: !id
  });

  // FORM
  const { register, handleSubmit: onSubmit } = useForm({
    defaultValues: {
      Mx: 1200,
      My: 850,
      Mh: 23,
      MPw: 335,
      // Modules spaces
      Ex: 9,
      Ey: 9,
      // Template
      PigeX0: 130,
      PigeX1: 130,
      PigeMX0: 330,
      PigeMX1: 330
    }
  });

  const handleResetClick = () => {
    store.resetView();
  };
  const handleSubmit = (data) => {
    store.updateUserDatas(data);
    store.draw();
  };

  if (loading) return <div>Loading...</div>;
  console.log(data);

  return (
    <Container maxWidth='md'>
      <Typography variant='h1' mb={1}>Projet</Typography>
      <TextField
        type='text'
        placeholder='Rechercher'
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchOutlinedIcon />
            </InputAdornment>
          )
        }}
        variant='standard'
      />
      <Box>
        <Button onClick={handleResetClick}>Reset View</Button>
      </Box>
      <Box>
        <Button onClick={store.draw}>Refresh</Button>
      </Box>
      <form onSubmit={onSubmit(handleSubmit)}>
        <Stack direction='column'>
          <Button variant='contained' type='submit'>
            Submit
          </Button>
          <TextField type='number' placeholder='Mx' {...register('Mx')} />
          <TextField type='number' placeholder='My' {...register('My')} />
          <TextField type='number' placeholder='Ex' {...register('Ex')} />
          <TextField type='number' placeholder='Ey' {...register('Ey')} />
          <TextField type='number' placeholder='PigeX0' {...register('PigeX0')} />
          <TextField type='number' placeholder='PigeX1' {...register('PigeX1')} />
          <TextField type='number' placeholder='PigeMX0' {...register('PigeMX0')} />
          <TextField type='number' placeholder='PigeMX1' {...register('PigeMX1')} />
        </Stack>
      </form>
    </Container>
  );
}

export default TabProject