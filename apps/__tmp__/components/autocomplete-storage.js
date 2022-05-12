import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

const AUTOCOMPLETE_TAKE_DEFAULT = 7;

const GET_STORAGES = gql`
  query getStorages($take: Int = ${AUTOCOMPLETE_TAKE_DEFAULT}, $skip: Int = 0, $name: String = "") {
    storages(take: $take, skip: $skip, where: { name: { contains: $name, mode: insensitive } }) {
      id
      name
    }
  }
`;

const CREATE_STORAGE = gql`
  mutation createStorage($data: StorageCreateInput!) {
    createStorage(data: $data) {
      id
      name
    }
  }
`;

export default function StorageChoiceAutocomplete(props) {
  const { sx, onChange } = props;

  // Save user inputs
  const [inputValue, setInputValue] = React.useState('');

  // *QUERY
  const [getStorages, { data = {}, loading }] = useLazyQuery(GET_STORAGES);
  const [createStorage] = useMutation(CREATE_STORAGE);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedStorageSearch = React.useCallback(
    debounce(async (searchString) => {
      await getStorages({ variables: { take: AUTOCOMPLETE_TAKE_DEFAULT, name: searchString } });
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
    let name = newValue;

    // User clicked on "Add" option
    if (newValue.inputValue) {
      name = newValue.inputValue;
    }

    // timeout to avoid instant validation of the dialog's form.
    setTimeout(async () => {
      const { data } = await toast.promise(
        createStorage({
          variables: { data: { name } }
        }),
        {
          loading: 'Création en cours...',
          success: <b>Le storage a été créé !</b>,
          error: <b>Le storage n&apos;a pas pu être créé.</b>
        }
      );
      setInputValue(name);
      if (data && data.createStorage) {
        onChange(data.createStorage);
      }
    });
  };

  const { storages = [] } = data;

  return (
    <Autocomplete
      id='choose-a-storage'
      loading={loading}
      inputValue={inputValue}
      onInputChange={handleInputValueChange}
      onChange={handleOnChange}
      options={loading ? [] : storages}
      getOptionLabel={(option) => {
        // e.g value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        return option.name;
      }}
      filterOptions={(options, params) => {
        const filtered = [...options];

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`
          });
        }

        return filtered;
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Choisis ou créé un rack'
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
