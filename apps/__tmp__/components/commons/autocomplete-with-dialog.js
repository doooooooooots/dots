import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce } from 'lodash';

export default function AutocompleteWithForm(props) {
  const { label, options, children, onChange, onInputChange, defaultNewValue = {}, optionKey } = props;

  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState(defaultNewValue);

  const handleClose = () => {
    setDialogValue(defaultNewValue);
    toggleOpen(false);
  };

  // *FUNC -- When user is changing input value
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
  const handleChange = React.useCallback(
    (event, newValue) => {
      // User pressed "Enter" key
      if (typeof newValue === 'string') {
        event.preventDefault();
        // Timeout to avoid instant validation of the dialog's form.
        setTimeout(() => {
          toggleOpen(true);
          setDialogValue((current) => ({ ...current, [optionKey]: newValue }));
        });

        // User clicked on "Add" option
      } else if (newValue && newValue.inputValue) {
        toggleOpen(true);
        setDialogValue((current) => ({ ...current, [optionKey]: newValue.inputValue }));

        // User selected an option
      } else {
        setValue(newValue);
        onChange(newValue);
      }
    },
    [optionKey, onChange]
  );

  // *FUNC -- onSuccessCallback
  const handleSuccessSubmit = React.useCallback((res) => {
    setValue(res);
    toggleOpen(false);
  }, []);

  // *FUNC -- filterSelectedOptions
  const filterOptions = React.useCallback(
    (options, params) => {
      if (params.inputValue !== '') {
        options.push({
          inputValue: params.inputValue,
          [optionKey]: `Ajouter "${params.inputValue}"`
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
    <React.Fragment>
      <Autocomplete
        value={value}
        onInputChange={handleInputChange}
        onChange={handleChange}
        filterOptions={filterOptions}
        options={options}
        getOptionLabel={getOptionLabel}
        renderOption={(props, option) => <li {...props}>{option[optionKey]}</li>}
        renderInput={(params) => <TextField {...params} label={label} />}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo
        sx={{ width: 300 }}
      />
      <Dialog open={open} onClose={handleClose}>
        {children({ onSubmitSuccessCallback: handleSuccessSubmit, initialValue: dialogValue })}
      </Dialog>
    </React.Fragment>
  );
}
