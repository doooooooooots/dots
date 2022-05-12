import {
  Form,
  Input,
  Select,
  Stack,
  withSmartForm,
} from '@dots.cool/form-builder';
import { Button, Container } from '@mui/material';

function StorageForm(props) {
  const { onSubmitSuccessCallback, ...other } = props;
  return (
    <Container maxWidth="md">
      <Form
        {...other}
        onSubmitSuccessCallback={onSubmitSuccessCallback}
        spacing={1}
      >
        <Select options={['draft', 'published']} label="Status" name="status" />
        <Input label={'Quantité'} name="eligibleQuantity" type="number" />
        {/* <AutocompletePlateform label={'Plateforme'} name="plateform" /> */}
        <Stack name="price" direction="row" alignItems="flex-end" spacing={1}>
          <Input label={'Prix'} name="prices" type="number" />
          <Stack direction="row" spacing={1}>
            <Button variant="outlined">Auto</Button>
            <Button variant="outlined">Envoyer au pricing</Button>
            <Button variant="outlined">Voir les stats</Button>
          </Stack>
        </Stack>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

// Add memory + generate context
const StorageFormCreate = withSmartForm(StorageForm, {
  singular: 'storage',
  plurial: 'storages',
});

export default StorageFormCreate;
