import { Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import AutocompleteWithLogic from './autocomplete-with-logic';
import withMiddleware from '../with-middleware/with-middleware';

function AutocompleteWithForm(props) {
  const { label, name, control, register, onCreateNewClick, ...rest } = props;

  return (
    <Stack>
      <label>{label}</label>
      <Controller
        render={({ field }) => (
          <AutocompleteWithLogic
            {...field}
            onChange={(_, data) => field.onChange(data)}
            onCreateNewClick={onCreateNewClick}
            renderInput={(params) => <TextField {...params} label={label} />}
            {...rest}
          />
        )}
        name={name}
        control={control}
      />
    </Stack>
  );
}

export default AutocompleteWithForm;
export const autocompleteWithForm = withMiddleware(AutocompleteWithForm);
