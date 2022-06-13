import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import PopperTitle from './popper-title';
import StyledInput from './popper-input';
import PopperActions from '../popper/popper-actions';
import makeSortFunc from './utils/makeSortFunc';
import NoResult from '../screens/no-result';
import PopperContainer from '../popper/popper-container-2';
import { useAutocomplete } from '../select-with-autocomplete/hooks/use-autocomplete';
import { Divider, Stack } from '@mui/material';
import PopperSelectedList from '../select-with-autocomplete/components/popper-selected-list';

export default function PopperFromList(props) {
  const {
    title,
    noOptionsText,
    getOptionLabel,
    loading,
    renderOption,
    inputProps = {},
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
    <>
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
    </>
  );
}
