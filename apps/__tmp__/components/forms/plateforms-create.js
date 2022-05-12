import React from 'react';
import { Button } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import FormCreate from '@components/form-create';
import Input from 'src/design-system/form/input';

const CREATE_PLATEFORM = gql`
  mutation createPlateform($data: PlateformCreateInput!) {
    createPlateform(data: $data) {
      id
      name
    }
  }
`;

function PlateformCreate(props) {
  const { initialValues, onSubmitSuccessCallback } = props;

  const [createPlateform] = useMutation(CREATE_PLATEFORM);

  const handleSubmitClick = async (data) => {
    return await createPlateform({ variables: { data } });
  };

  return (
    <FormCreate
      initialValues={initialValues}
      successMessage={'La plateforme a bien été crée'}
      errorMessage={'Erreur durant la création de la plateforme'}
      onSubmit={handleSubmitClick}
      onSubmitSuccessCallback={onSubmitSuccessCallback}
      spacing={2}
    >
      <Input name='pid' />
      <Input name='name' />
      <Button variant='contained' type='submit'>
        Submit
      </Button>
    </FormCreate>
  );
}

export default PlateformCreate;
