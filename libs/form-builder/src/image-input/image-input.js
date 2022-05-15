import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function ImageInput({ label, control = null, name, ...rest }) {
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

export default ImageInput;
export const imageInput = withMiddleware(ImageInput);
