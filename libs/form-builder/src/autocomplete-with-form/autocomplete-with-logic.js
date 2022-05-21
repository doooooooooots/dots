import React from 'react';
import { Autocomplete, debounce } from '@mui/material';
import withMiddleware from '../with-middleware/with-middleware';

function AutocompleteWithLogic(props, ref) {
  const {
    name,
    indexColumn = 'id',
    options = [],
    loading,
    onChange,
    onInputChange,
    onCreateButtonClick,
    ...rest
  } = props;

  const _indexColumn = indexColumn || 'id';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedStorageSearch = React.useCallback(
    debounce((searchString) => {
      onInputChange(searchString);
    }, 450),
    []
  );

  // [ ](Adrien): Find better approach to prevent call after no results
  const handleInputChange = React.useCallback(
    (_, newValue) => {
      if (
        newValue === '' ||
        (newValue !== '' && newValue.length < 3) ||
        (newValue.length >= 3 && options.length && options.length > 8)
      ) {
        debouncedStorageSearch(newValue);
      }
    },
    [options.length, debouncedStorageSearch]
  );

  //* FUNC -- When user select an option
  //? 2 possibilities : User choose existing | user wants to create
  const handleChange = React.useCallback(
    (event, newValue) => {
      //->  CREATE: User pressed "Enter" key || clicked on "Add" option
      if (newValue && (typeof newValue === 'string' || newValue.inputValue)) {
        event.preventDefault();
        let _newValue = newValue;
        if (newValue.inputValue) _newValue = newValue.inputValue;
        onCreateButtonClick({ [_indexColumn]: _newValue });

        //-> CHOOSE: User selected an option
      } else {
        onChange(event, newValue);
      }
    },
    [onCreateButtonClick, onChange, _indexColumn]
  );

  //* FUNC -- filterSelectedOptions
  const filterOptions = React.useCallback(
    (options, params) => {
      if (params.inputValue !== '') {
        options.push({
          inputValue: params.inputValue,
          [_indexColumn]: `Ajouter "${params.inputValue}"`,
        });
      }
      return options;
    },
    [_indexColumn]
  );

  //* FUNC -- Get option label
  const getOptionLabel = React.useCallback(
    (option) => {
      //-> e.g value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      if (option.inputValue) {
        return option.inputValue;
      }
      return option[_indexColumn];
    },
    [_indexColumn]
  );

  if (loading) return 'loading';

  //* RENDER
  return (
    <Autocomplete
      ref={ref}
      sx={{ cursor: 'pointer' }}
      onInputChange={handleInputChange}
      onChange={handleChange}
      filterOptions={filterOptions}
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => (
        <li {...props}>{option[_indexColumn]}</li>
      )}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      {...rest}
    />
  );
}

export default React.forwardRef(AutocompleteWithLogic);
export const autocompleteWithLogic = withMiddleware(AutocompleteWithLogic);
