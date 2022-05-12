import { Autocomplete, debounce } from '@mui/material';
import React from 'react';

function AutocompleteWithLogic(props) {
  const {
    options,
    optionKey,
    onChange,
    onInputChange,
    formTitle,
    renderFormComponent,
    ...rest
  } = props;

  const { push } = useHistory();

  // *FUNC -- When user is changing input value
  // -> Request is made 'onInputChange'
  // -> options is changed - component is re-rendered

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedStorageSearch = React.useCallback(
    debounce((searchString) => {
      onInputChange(searchString);
    }, 450),
    []
  );
  const handleInputChange = React.useCallback(
    (_, newValue) => {
      // TODO(Adrien): Find better approach to prevent call after no results
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

  // *FUNC -- When user select an option
  // -> 2 possibilities : User choose existing | user wants to create
  const handleChange = React.useCallback(
    (event, newValue) => {
      // -- CREATE
      // User pressed "Enter" key || clicked on "Add" option
      if (newValue && (typeof newValue === 'string' || newValue.inputValue)) {
        event.preventDefault();
        let _newValue = newValue;
        if (newValue.inputValue) _newValue = newValue.inputValue;
        push({
          path: `create`,
          title: formTitle,
          component: renderFormComponent({
            initialValues: { [optionKey]: _newValue },
          }),
        });

        // -- CHOOSE
        // User selected an option
      } else {
        onChange(event, newValue);
      }
    },
    [push, renderFormComponent, optionKey, onChange, formTitle]
  );

  // *FUNC -- filterSelectedOptions
  const filterOptions = React.useCallback(
    (options, params) => {
      if (params.inputValue !== '') {
        options.push({
          inputValue: params.inputValue,
          [optionKey]: `Ajouter "${params.inputValue}"`,
        });
      }
      return options;
    },
    [optionKey]
  );

  // *FUNC -- Get option label
  const getOptionLabel = React.useCallback(
    (option) => {
      // e.g value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      if (option.inputValue) {
        return option.inputValue;
      }
      return option[optionKey];
    },
    [optionKey]
  );

  // *RENDER
  return (
    <Autocomplete
      onInputChange={handleInputChange}
      onChange={handleChange}
      filterOptions={filterOptions}
      options={options}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => <li {...props}>{option[optionKey]}</li>}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      {...rest}
    />
  );
}

export default AutocompleteWithLogic;
