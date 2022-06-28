import React, { useEffect, useMemo } from 'react';
import { useAutocomplete, useInputText } from '@dots.cool/hooks';
import { Alert, Autocomplete, Stack } from '@mui/material';
import PopperInput from '../../design-system/popper/popper-input';
import StyledAutocompletePopper from './styled-autocomplete-popper';
import PopperTitle from '../../design-system/popper/popper-title';
import ListItemDefault from './list-item-default';
import { matchSorter } from 'match-sorter';
import { isEmpty } from 'lodash';
import makeSortFunc from '../../design-system/autocomplete/utils/makeSortFunc';

const filterOptions = (options, { inputValue }) =>
  matchSorter(options, inputValue);

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

/**
 ** PopperSelect
 *
 * @param {*} props
 * @returns
 */

function InputEnum(props) {
  const {
    title = 'Select an option 👇',
    name,
    loading,
    value,
    getValue,
    options,
    onChange,
    withPreview,
    disableSort,
  } = props;

  const { id, pendingValue, handleChange } = useAutocomplete({
    name: name,
    value: value,
    multiple: false,
  });

  const { input, onChange: onInputChange, onClear } = useInputText('');

  /**
   * Override default component by enum's one
   */
  let Component = ListItemDefault;

  /**
   * Add selected values to all results
   */
  const _options = useMemo(() => {
    if (isEmpty(pendingValue)) return options;

    return disableSort
      ? options
      : [...options].sort(makeSortFunc({ value: pendingValue, options }));
  }, [options, disableSort, pendingValue]);

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getValue(pendingValue));
    }
  }, [getValue, onChange, pendingValue]);

  if (isEmpty(options)) {
    return (
      <Alert severity="info">
        Il semble que la liste ne possède pas de valeur
      </Alert>
    );
  }

  return (
    <Stack direction="row">
      <Stack flex={1} overflow="hidden" width={270}>
        {title && <PopperTitle title={title} loading={loading} />}
        <Autocomplete
          id={id}
          loading={!title && loading}
          value={pendingValue}
          onChange={handleChange}
          inputValue={input}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <PopperInput
              ref={params.InputProps.ref}
              loading={loading}
              onClear={onClear}
              inputProps={params.inputProps}
              sx={[options.length < 10 && { opacity: 0, height: 0 }]}
              autoFocus
            />
          )}
          options={_options}
          PopperComponent={PopperComponent}
          filterOptions={input ? filterOptions : () => _options}
          getOptionLabel={(option) =>
            options.find((item) => item.value === option.value)?.label
          }
          renderOption={(
            props,
            { label, index, value, color },
            { selected }
          ) => (
            <Component
              {...props}
              label={label}
              index={index}
              value={value}
              color={color}
              max={options.length}
              selected={selected}
              hideStartIcon={!selected}
            />
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onClose={() => null}
          clearOnBlur={false}
          filterSelectedOptions={withPreview}
          disableCloseOnSelect
          multiple
          open
        />
      </Stack>
    </Stack>
  );
}

export default InputEnum;
