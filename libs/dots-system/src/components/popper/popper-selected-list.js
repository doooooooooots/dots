import React, { useMemo, useState } from 'react';
import {
  Typography,
  Stack,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import { isEmpty } from 'lodash';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { matchSorter } from 'match-sorter';

const SelectionTitle = (props) => {
  const { count, onClick } = props;
  return (
    <>
      <Typography variant="subtitle" textTransform="uppercase">
        {`Selection (${count})`}
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
  const { pendingValue, filterAttributes, renderOption, onDelete } = props;

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const _pendingValue = useMemo(() => {
    if (!input) return pendingValue;
    return matchSorter(pendingValue, input, {
      keys: filterAttributes,
    });
  }, [pendingValue, input, filterAttributes]);

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
            onClick={() => {
              setSearch(false);
              setInput('');
            }}
          />
        ) : (
          <SelectionTitle
            onClick={() => setSearch(true)}
            count={pendingValue.length}
          />
        )}
      </Stack>
      <Divider />
      <PopperList>
        {!isEmpty(_pendingValue) ? (
          <>
            {_pendingValue.map((item, index) =>
              renderOption(
                { onDelete: onDelete(item.id), key: item.id },
                item,
                {
                  selected: true,
                }
              )
            )}
          </>
        ) : (
          <Stack p={2} justifyContent="center" height="100%">
            <Typography variant="h6" textAlign="center">
              {isEmpty(pendingValue) ? (
                "Vous n'avez pas encore fait de sélection"
              ) : (
                <NoResult />
              )}
            </Typography>
          </Stack>
        )}
      </PopperList>
    </>
  );
}

export default PopperSelectedList;
