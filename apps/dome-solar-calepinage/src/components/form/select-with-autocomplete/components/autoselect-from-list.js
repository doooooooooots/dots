import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete from '@mui/material/Autocomplete';
import PopperTitle from './popper-title';
import Popper from './popper';
import StyledInput from './popper-input';
import PopperActions from './popper-actions';
import makeSortFunc from '../utils/sort';
import NoResult from './no-result';
import PopperContainer from './popper-container';
import { useAutocomplete } from '../hooks/use-autocomplete';
import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import PopperList from './popper-list';
import PopperSelectedList from './popper-selected-list';

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <PopperContainer {...other} />;
}

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
    filterPreview,
    renderPreview,
    withPreview,
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

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
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
        <ClickAwayListener onClickAway={onConfirm}>
          <Stack
            direction="column"
            sx={{
              minHeight: 425,
              maxHeight: '55vh',
              overflow: 'hidden',
            }}
          >
            <Stack direction="row" flex={1} overflow="hidden">
              <Stack width={295} direction="column" overflow="hidden">
                <PopperTitle title={title} loading={loading} />
                <Autocomplete
                  {...other}
                  open
                  loading={loading}
                  multiple
                  onClose={onCancel}
                  value={pendingValue}
                  onChange={onChange}
                  inputValue={inputValue}
                  onInputChange={onInputChange}
                  PopperComponent={PopperComponent}
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
              </Stack>
              {withPreview && (
                <Stack width={295} borderLeft={1} borderColor="divider">
                  <PopperSelectedList
                    filterPreview={filterPreview}
                    renderOption={renderPreview}
                    pendingValue={pendingValue}
                  />
                </Stack>
              )}
            </Stack>
            <Divider />
            <PopperActions onConfirm={onConfirm} onCancel={onClose} />
          </Stack>
        </ClickAwayListener>
      )}
    </Popper>
  );
}
