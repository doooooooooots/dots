import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormattedFieldInput } from '../../types/field';
import FormGroup from '../group/form-group';
import withMiddleware from '../with-middleware/with-middleware';

function Checkbox({ label, control, name, register, context, ...other }) {
  return (
    <FormGroup>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <MuiCheckbox
                {...other}
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              />
            }
            label={label}
          />
        )}
      />
    </FormGroup>
  );
}

Checkbox.bindProps = ({ value, color }: FormattedFieldInput) => ({
  stage: value,
  color: `${color}.main`,
});

export default Checkbox;
export const checkbox = withMiddleware(Checkbox);
