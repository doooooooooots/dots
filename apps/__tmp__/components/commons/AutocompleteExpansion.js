import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { debounce, isEmpty, isFunction } from 'lodash';
import { getMultiple as getExpansions } from '../api/expansion-api';
import { useSelector } from '_trash/store/store';

const selector = (state) => parseInt(state.app.gameId, 10);

export default function AutocompleteExpansion(props) {
  const { value, onChange, ...other } = props;
  const gameIdIn = useSelector(selector);

  const [options, setOptions] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  // *FIELD - Get label from objects
  const getOptionLabel = React.useCallback(
    (option) => {
      if (!isEmpty(option)) {
        return gameIdIn === 3 ? option?.abbreviation : option?.nameFr;
      }
      return option;
    },
    [gameIdIn]
  );

  // *FUNC - Search for expansions
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = React.useCallback(
    debounce(async (inputValue) => {
      const filter =
        gameIdIn === 3
          ? {
              gameIdIn,
              abbreviationContains: inputValue
            }
          : {
              gameIdIn,
              nameEnContains: inputValue,
              OR: {
                gameIdIn,
                nameFrContains: inputValue
              }
            };

      const options = await getExpansions(
        {
          filter,
          pagination: { first: 10 }
        },
        ['id', 'nameFr', 'abbreviation']
      );
      options.sort();
      setOptions(options || []);
    }, 450),
    []
  );

  // *FUNC - Handle input change
  const handleInputValueChange = React.useCallback(
    (event, newValue) => {
      setInputValue(newValue);
      if (
        isEmpty(options) ||
        (newValue !== '' && newValue?.length < 3) ||
        (newValue?.length >= 3 && options?.length && options.length > 8)
      ) {
        debouncedSearch(newValue);
      }
    },
    [debouncedSearch, options]
  );

  // *FUNC - Handle change
  const handleOnChange = React.useCallback(
    (event, newValue) => {
      if (isFunction(onChange)) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <Autocomplete
      id='search expansions'
      value={value}
      onChange={handleOnChange}
      inputValue={inputValue || ''}
      onInputChange={handleInputValueChange}
      options={options}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => {
        if (gameIdIn === 3) return option.abbreviation === value.abbreviation;
        return option.nameFr === value.nameFr;
      }}
      renderInput={(params) => <TextField {...params} label='Extension' />}
      handleHomeEndKeys
      selectOnFocus
      clearOnBlur
      {...other}
    />
  );
}
