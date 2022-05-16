import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function RichTextInput({
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
        render={({ field }) => <TextField {...field} {...rest} />}
        name={name}
        control={control}
      />
    </FormGroup>
  );
}

export default RichTextInput;
export const richTextInput = withMiddleware(RichTextInput);
