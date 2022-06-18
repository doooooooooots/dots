import React, { useEffect, useMemo, useState } from 'react';
import { useAutocomplete, useWhyDidYouUpdate } from '@dots.cool/hooks';
import {
  Autocomplete,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import PopperInput from '../../design-system/popper/popper-input';
import StyledAutocompletePopper from './styled-autocomplete-popper';
import PopperTitle from '../../design-system/popper/popper-title';
import ListItemDefault from './list-item-default';
import { matchSorter } from 'match-sorter';
import { isEmpty, round } from 'lodash';
import makeSortFunc from '../../design-system/autocomplete/utils/makeSortFunc';
import { Box } from '@mui/system';

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
    options,
    onChange,
    onSubmit,
    onCancel,
    withPreview,
    disableSort,
    multiple,
  } = props;

  const [isReady, setIsReady] = useState(false);
  useWhyDidYouUpdate('Popper', props);

  const {
    id,
    // Pending value
    pendingValue,
    getValue,
    handleChange,
    // Search input
    input,
    handleInputChange,
    handleInputClear,
  } = useAutocomplete({
    name: name,
    value: value,
    multiple,
  });

  const [optionList, setOptionList] = useState([]);

  /**
   * Add selected values to all results
   */
  const _options = useMemo(() => {
    if (isEmpty(optionList)) return [];
    return disableSort
      ? optionList
      : [...optionList].sort(
          makeSortFunc({ value: pendingValue, options: optionList })
        );
  }, [disableSort, pendingValue, optionList]);

  /**
   * On Mount, fetch options
   */
  useEffect(() => {
    const getOptionList = async () => {
      const res = await fetch(`/api/constants/${options}/options`);
      const list = await res.json();
      setOptionList(list);
      if (value) {
        handleChange(
          null,
          list.filter((item) => item.value === value)
        );
      }
      setIsReady(true);
    };
    getOptionList();
    return () => {
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getValue(pendingValue)?.value);
    }
  }, [getValue, onChange, pendingValue]);

  if (!isReady)
    return (
      <Stack direction="row" justifyContent="center" p={2}>
        <CircularProgress color="neutral" />
      </Stack>
    );

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
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <Stack ref={params.InputProps.ref}>
              <PopperInput
                loading={loading}
                onClear={handleInputClear}
                inputProps={params.inputProps}
                sx={[optionList.length < 10 && { opacity: 0, height: 0 }]}
                autoFocus
              />
            </Stack>
          )}
          options={_options}
          PopperComponent={PopperComponent}
          filterOptions={input ? filterOptions : () => _options}
          getOptionLabel={(option) => option?.label}
          renderOption={(
            props,
            { label, index, value, color },
            { selected }
          ) => (
            <ListItemDefault
              {...props}
              label={label}
              index={index}
              value={value}
              color={color}
              max={optionList.length}
              selected={selected}
              hideStartIcon={!multiple && !selected}
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
