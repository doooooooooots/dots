import React, { useMemo } from 'react';
import { Autocomplete as AutocompleteMui } from '@mui/material';
import AutocompletePopper from './autocomplete-popper';
import makeSortFunc from './utils/makeSortFunc';
import NoResult from '../screens/no-result';

const Autocomplete = (props) => {
  const {
    options = [],
    value,
    noOptionsText = 'Pas de résultat',
    disableSort,
    // Renders
    ...other
  } = props;

  const _options = useMemo(() => {
    return disableSort
      ? options
      : [...options].sort(makeSortFunc({ value, options }));
  }, [disableSort, options, value]);

  return (
    <AutocompleteMui
      {...other}
      options={_options}
      noOptionsText={<NoResult content={noOptionsText} />}
      renderTags={() => null}
      PopperComponent={AutocompletePopper}
      componentsProps={{
        paper: {
          sx: { bgcolor: 'background.default', fontSize: 13 },
        },
        listbox: {
          sx: { p: 0 },
        },
      }}
      multiple
      open
    />
  );
};

export default React.memo(Autocomplete);
