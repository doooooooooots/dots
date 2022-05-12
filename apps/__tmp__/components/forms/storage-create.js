import React from 'react';
import { Button } from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import AutocompletePlateform from '@components/autocomplete-plateform';
import FormCreate from '@components/form-create';
import Input from 'src/design-system/form/input';
import Select from 'src/design-system/form/select';
import Stack from 'src/design-system/form/layout/stack';
import { Box } from '@mui/system';

const CREATE_OFFER = gql`
  mutation createOffer($data: OfferCreateInput!) {
    createOffer(data: $data) {
      pid
    }
  }
`;

function StorageCreate(props) {
  const { initialValues, onSubmitSuccessCallback } = props;

  const [createOffer] = useMutation(CREATE_OFFER);

  const handleSubmitClick = async (data) => {
    if (!data) return undefined;

    const _data = { ...data };
    const { prices, plateform } = _data;

    // Transform to connect
    if (plateform && plateform.id) {
      _data.plateform = { connect: { id: plateform.id } };
    } else {
      delete _data.plateform;
    }

    if (prices) {
      _data.prices = { create: { value: parseInt(prices, 10) } };
    }

    // Format datas
    _data.eligibleQuantity = parseInt(_data.eligibleQuantity, 10);
    return await createOffer({ variables: { data: _data } });
  };

  return (
    <FormCreate
      onSubmit={handleSubmitClick}
      initialValues={initialValues}
      onSubmitSuccessCallback={onSubmitSuccessCallback}
      spacing={1}
    >
      <Select options={['draft', 'published']} label='Status' name='status' />
      <Input label={'Quantité'} name='eligibleQuantity' type='number' />
      <AutocompletePlateform label={'Plateforme'} name='plateform' />
      <Stack name='price' direction='row' alignItems='flex-end' spacing={1}>
        <Input label={'Prix'} name='prices' type='number' />
        <Box>
          <Button variant='outlined'>Auto</Button>
        </Box>
        <Box>
          <Button variant='outlined'>Envoyer au pricing</Button>
        </Box>
        <Box>
          <Button variant='outlined'>Voir les stats</Button>
        </Box>
      </Stack>
      <Button variant='contained' type='submit'>
        Submit
      </Button>
    </FormCreate>
  );
}

export default StorageCreate;
