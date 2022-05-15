import { MenuItem, Select as MuiSelect } from '@mui/material';
import { Controller } from 'react-hook-form';
import FormGroup from '../group/form-group';
import Label from '../label/label';
import withMiddleware from '../with-middleware/with-middleware';

function Select({ label, control = null, options, name, ...rest }) {
  return (
    <FormGroup>
      <Label label={label} />
      <Controller
        render={({ field }) => (
          <MuiSelect {...field} {...rest}>
            {options.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </MuiSelect>
        )}
        name={name}
        control={control}
      />
    </FormGroup>
  );
}

export default Select;
export const select = withMiddleware(Select);
