import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { isFunction } from 'lodash';
import { RARITIES } from '../enums/rarities';
import { Chip } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';

const raritiesSorted = [...RARITIES];
raritiesSorted.sort();

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option
});

export default function AutocompleteRarity(props) {
  const { onChange, ...other } = props;
  const [value, setValue] = React.useState([]);

  const handleOnChange = React.useCallback(
    (_, newValue) => {
      if (isFunction(onChange)) {
        onChange(newValue);
      }
      setValue(newValue);
    },
    [onChange]
  );

  return (
    <Autocomplete
      id='search expansions'
      value={value}
      onChange={handleOnChange}
      options={raritiesSorted}
      renderInput={(params) => <TextField {...params} label='Rarity' />}
      multiple
      filterOptions={filterOptions}
      filterSelectedOptions
      autoHighlight
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => <Chip key={index} label={option} {...getTagProps({ index })} size={'small'} />)
      }
      {...other}
    />
  );
}
