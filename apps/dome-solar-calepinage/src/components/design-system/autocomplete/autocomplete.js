import React from 'react';
import { Autocomplete as AutocompleteMui } from '@mui/material';
import PopperInput from '../popper/popper-input';
import AutocompletePopper from './autocomplete-popper';
import makeSortFunc from './utils/makeSortFunc';
import NoResult from '../screens/no-result';
import SelectItemOption from '../list-item/list-item-option';
import { PeopleAltOutlined } from '@mui/icons-material';

export default function Autocomplete(props) {
  const {
    loading,
    options = [],
    value,
    noOptionsText = 'Pas de résultat',
    inputProps = {},
    disableSort,
    onClear,
    ...other
  } = props;

  return (
    <AutocompleteMui
      {...other}
      loading={loading}
      value={value}
      multiple
      options={
        disableSort
          ? options
          : [...options].sort(makeSortFunc({ multiple: true, value, options }))
      }
      noOptionsText={<NoResult content={noOptionsText} />}
      renderTags={() => null}
      renderOption={(props, option, { selected }) => (
        <SelectItemOption
          {...props}
          title={option.givenName}
          icon={<PeopleAltOutlined color={option.color} />}
          description={option.familyName}
          selected={selected}
          tooltip={option.description}
        />
      )}
      renderInput={(params) => (
        <PopperInput
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          loading={loading}
          onClear={onClear}
          autoFocus
          {...inputProps}
        />
      )}
      PopperComponent={AutocompletePopper}
      componentsProps={{
        paper: {
          sx: { bgcolor: 'background.default', fontSize: 13 },
        },
      }}
    />
  );
}
