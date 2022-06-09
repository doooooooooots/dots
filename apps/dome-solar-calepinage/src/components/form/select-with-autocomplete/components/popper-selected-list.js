import React, { useMemo, useState } from 'react';
import {
  Typography,
  Stack,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import PopperList from './popper-list';
import { isEmpty } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAutocomplete } from '../hooks/use-autocomplete';

const SelectionTitle = (props) => {
  const { onClick } = props;
  return (
    <>
      <Typography variant="subtitle" textTransform="uppercase">
        Selection
      </Typography>
      <IconButton size="small" onClick={onClick}>
        <SearchIcon fontSize="small" />
      </IconButton>
    </>
  );
};

const SelectionSearch = (props) => {
  const { input, onChange, onClick } = props;
  return (
    <>
      <SearchIcon fontSize="small" />
      <TextField
        size="small"
        variant="standard"
        value={input}
        onChange={onChange}
        autoFocus
        fullWidth
      />
      <IconButton size="small" onClick={onClick}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
};

function PopperSelectedList(props) {
  const { pendingValue, filterPreview, renderOption } = props;

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState('');

  const { onDelete } = useAutocomplete();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const _pendingValue = useMemo(() => {
    return filterPreview(pendingValue, input);
  }, [filterPreview, pendingValue, input]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        px={1}
        py={0.25}
        sx={[!search && { borderBottom: 1, borderColor: 'transparent' }]}
      >
        {search ? (
          <SelectionSearch
            input={input}
            onChange={handleChange}
            onClick={() => setSearch(false)}
          />
        ) : (
          <SelectionTitle onClick={() => setSearch(true)} />
        )}
      </Stack>
      <Divider />
      <PopperList>
        {!isEmpty(_pendingValue) ? (
          <>
            {_pendingValue.map((item, index) =>
              renderOption(item, { onDelete: onDelete(index) })
            )}
          </>
        ) : (
          <Stack p={2} justifyContent="center" height="100%">
            <Typography variant="h6" textAlign="center">
              {pendingValue
                ? "Vous n'avez pas encore fait de sélection"
                : 'Erf'}
            </Typography>
          </Stack>
        )}
      </PopperList>
    </>
  );
}

export default PopperSelectedList;
