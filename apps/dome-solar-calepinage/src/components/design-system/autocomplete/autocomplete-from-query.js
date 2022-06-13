import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { isEmpty } from 'lodash';
import PopperInput from '../popper/popper-input';
import SelectItemOption from '../list-item/list-item-option';
import AutocompletePopper from './autocomplete-popper';

export default function AutocompleteFromQuery(props) {
  const {
    query,
    where = {},
    take = 10,
    value = [],
    skip = 0,
    orderBy = [],
    multiple,
    renderOptionProps,
    getOptionLabel,
    onClose,
    disableExclude,
  } = props;

  const { data, loading, error } = useQuery(query, {
    variables: { where: where, take: take, skip: skip, orderBy: orderBy },
  });

  const rows = data?.options || [];
  const [pendingValue, setPendingValue] = React.useState([]);

  return (
    <Box sx={{ fontSize: 13 }}>
      <Autocomplete
        open
        loading={loading}
        onClose={(event, reason) => {
          if (reason === 'escape') {
            onClose(pendingValue);
          }
        }}
        value={pendingValue}
        onChange={(event, newValue, reason) => {
          if (
            event.type === 'keydown' &&
            event.key === 'Backspace' &&
            reason === 'removeOption'
          ) {
            return;
          }
          if (!isEmpty(newValue)) {
            multiple ? setPendingValue(newValue) : onClose([newValue.pop()]);
          } else {
            setPendingValue([]);
          }
        }}
        disableCloseOnSelect
        PopperComponent={AutocompletePopper}
        renderTags={() => null}
        noOptionsText="No labels"
        renderOption={(props, option, { selected }) => (
          <SelectItemOption
            {...props}
            {...renderOptionProps(option, selected)}
          />
        )}
        options={[...rows].sort((a, b) => {
          // Display the selected labels first.
          let ai = value.indexOf(a);
          ai = ai === -1 ? value.length + rows.indexOf(a) : ai;
          let bi = value.indexOf(b);
          bi = bi === -1 ? value.length + rows.indexOf(b) : bi;
          return ai - bi;
        })}
        getOptionLabel={getOptionLabel}
        renderInput={(params) => (
          <PopperInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder="Filter labels"
          />
        )}
        multiple
      />
      <Divider />
      {multiple && (
        <Button fullWidth onClick={() => onClose(pendingValue)}>
          Enregistrer
        </Button>
      )}
    </Box>
  );
}
