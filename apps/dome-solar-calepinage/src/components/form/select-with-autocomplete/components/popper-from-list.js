import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete from '@mui/material/Autocomplete';
import PopperTitle from './popper-title';
import Popper from './popper';
import StyledInput from './popper-input';
import PopperActions from './popper-actions';
import makeSortFunc from '../utils/sort';
import NoResult from './no-result';
import AutocompletePopper from './popper-container';
import { useAutocomplete } from '../hooks/use-autocomplete';
import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';

export default function PopperFromList(props) {
  const {
    title,
    noOptionsText,
    getOptionLabel,
    loading,
    renderOption,
    inputProps = {},
    popperProps = {},
    options = [],
    hideSearch,
    multiple,
    disableSort,
    filterSelectedOptions,
    ...other
  } = props;

  const {
    id,
    anchorEl,
    open,
    inputValue,
    value,
    pendingValue,
    onConfirm,
    onChange,
    onInputChange,
    onClose,
    onCancel,
  } = useAutocomplete();

  console.log(options);
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom"
      sx={[
        hideSearch && {
          '& .MuiAutocomplete-root': {
            height: 0,
            visibility: 'hidden',
          },
        },
      ]}
      {...popperProps}
    >
      {open && (
        <ClickAwayListener onClickAway={onClose}>
          <Box>
            <Stack direction="row">
              <Box width={295}>
                <PopperTitle title={title} loading={loading} />
                <Autocomplete
                  {...other}
                  open
                  multiple
                  onClose={onCancel}
                  value={pendingValue}
                  onChange={onChange}
                  inputValue={inputValue}
                  onInputChange={onInputChange}
                  PopperComponent={AutocompletePopper}
                  renderTags={() => null}
                  noOptionsText={<NoResult content={noOptionsText} />}
                  componentsProps={{
                    paper: {
                      sx: { bgcolor: 'background.default' },
                    },
                  }}
                  options={
                    disableSort
                      ? options
                      : [...options].sort(
                          makeSortFunc({ multiple: true, value, options })
                        )
                  }
                  filterSelectedOptions={filterSelectedOptions}
                  renderOption={renderOption}
                  getOptionLabel={getOptionLabel}
                  renderInput={(params) => (
                    <StyledInput
                      ref={params.InputProps.ref}
                      inputProps={params.inputProps}
                      autoFocus
                      {...inputProps}
                    />
                  )}
                  disableCloseOnSelect
                />
              </Box>
              {/* {multiple && (
                <Stack direction="column" bgcolor="red" width={250} p={4}>
                  {pendingValue.map((item) => (
                    <Box key={item.id}>{item.id}</Box>
                  ))}
                </Stack>
              )} */}
            </Stack>
            <PopperActions onConfirm={onConfirm} onCancel={onClose} />
          </Box>
        </ClickAwayListener>
      )}
    </Popper>
  );
}
