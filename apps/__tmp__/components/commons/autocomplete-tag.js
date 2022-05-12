import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import { AUTOCOMPLETE_TAKE_DEFAULT } from 'src/constants';

export default function AutocompleteInput(props) {
  const {
    entityName,
    onChange,
    getQuery,
    createQuery,
    label,
    isOptionEqualToValue,
    getOptionKey,
    successMessage,
    errorMessage,
    sx
  } = props;

  // Save user inputs
  const [inputValue, setInputValue] = React.useState('');

  // *QUERY
  const [getList, { data = {}, loading }] = useLazyQuery(getQuery);
  const [createOne] = useMutation(createQuery);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedStorageSearch = React.useCallback(
    debounce(async (searchString) => {
      await getList({ variables: { take: AUTOCOMPLETE_TAKE_DEFAULT, name: searchString } });
    }, 450),
    []
  );

  // *FUNC - When user is changing input value
  const handleInputValueChange = React.useCallback(
    (_, newValue) => {
      if (
        inputValue === '' ||
        (inputValue !== '' && inputValue.length < 3) ||
        (inputValue.length >= 3 && data.length && data.length > 8)
      ) {
        debouncedStorageSearch(newValue);
      }
      setInputValue(newValue);
    },
    [data.length, debouncedStorageSearch, inputValue]
  );

  // *FUNC - When user make a choice
  const handleOnChange = async (_, newValue) => {
    if (!newValue) {
      return undefined;
    }

    if (typeof newValue !== 'string' && !newValue.inputValue) {
      return onChange(newValue);
    }

    // User pressed Enter
    let value = newValue;

    // User clicked on "Add" option
    if (newValue.inputValue) {
      value = newValue.inputValue;
    }

    // timeout to avoid instant validation of the dialog's form.
    setTimeout(async () => {
      const { data } = await toast.promise(createOne({ variables: { input: value } }), {
        loading: 'Création en cours...',
        success: <b>{successMessage}</b>,
        error: <b>{errorMessage}</b>
      });

      setInputValue(value);
      onChange(data);
    });
  };

  const options = data[entityName];

  return (
    <Autocomplete
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      onChange={handleOnChange}
      options={loading ? [] : options}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        return option[getOptionKey];
      }}
      filterOptions={(options, params) => {
        const filtered = [...options];

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            [getOptionKey]: `Add "${params.inputValue}"`
          });
        }

        return filtered;
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      freeSolo
      fullWidth
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      sx={sx || {}}
    />
  );
}
