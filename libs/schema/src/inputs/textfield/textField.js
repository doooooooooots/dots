import TextFieldMui from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function TextField({
  label,
  name,
  control = null,
  register,
  context,
  ...rest
}) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        render={({ field }) => <TextFieldMui {...field} {...rest} />}
        name={name}
        control={control}
      />
    </FormGroup>
  );
}

export default TextField;
export const textField = withMiddleware(TextField);
