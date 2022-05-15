import { Form, Input, Select, withSmartForm } from '@dots.cool/form-builder';
import { Button, Container } from '@mui/material';

const formatData = (data) => {
  return {
    data: {
      name: data.name,
      game: { connect: { code: data.game } },
    },
  };
};

function StorageForm(props) {
  const { onSubmitSuccessCallback, ...other } = props;
  return (
    <Container maxWidth="md">
      <Form
        {...other}
        formatData={formatData}
        onSubmitSuccessCallback={onSubmitSuccessCallback}
        spacing={1}
      >
        <Select label="Game" options={['YGO', 'PKM']} name="game" />
        <Input label="Nom" name="name" type="text" />
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
