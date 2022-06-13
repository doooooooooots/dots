import { useLazyQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useDebounce } from 'react-use';
import { useAutocomplete } from '../hooks/use-autocomplete';
import PopperFromList from './autoselect-from-list';
import { createFilterOptions } from '@mui/material';

export default function PopperFromQuery(props) {
  const { query, take = 5, skip = 0, filterAttributes, ...other } = props;

  const { pendingValue, inputValue, open } = useAutocomplete();

  //* FUNC -- Send request
  const [searchFunc, { data, loading }] = useLazyQuery(query, { skip: !open });

  useDebounce(
    () => {
      if (open) {
        searchFunc({
          variables: {
            take: take,
            skip: skip,
            input: inputValue,
            exclude: pendingValue.map((item) => item.id),
          },
        });
      }
    },
    250,
    [inputValue, open]
  );

  // Add selected values to all results
  const options = useMemo(() => {
    const _options = data?.rows || [];
    return _options;
  }, [data?.rows]);

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    stringify: (option) =>
      filterAttributes.reduce((acc, key) => `${acc}${option[key]}`, ''),
  });

  return (
    <PopperFromList
      {...other}
      loading={loading}
      options={options}
      count={data?.count}
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      filterSelectedOptions
    />
  );
}

// Add selected values to all results
// const options = useMemo(() => {
//   const _options = data?.rows || [];
//   if (isEmpty(pendingValue)) return _options;
//   const pendingIds = pendingValue.map((item) => item.id);
//   return [
//     ...pendingValue,
//     ..._options.filter((item) => !pendingIds.includes(item.id)),
//   ];
// }, [data?.rows, pendingValue]);
