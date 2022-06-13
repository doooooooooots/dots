import React, { useMemo } from 'react';
import { ClickAwayListener, Divider } from '@mui/material';
import {
  useAutocomplete,
  bindToggle,
  bindPopper,
  useWhyDidYouUpdate,
} from '@dots.cool/hooks';
import FieldInput from './field-input';
import Popper from '../../popper-styled';
import PopperContainer from '../../design-system/popper/popper-container';
import Autocomplete from '../../design-system/autocomplete/autocomplete';
import PopperActions from '../../design-system/popper/popper-actions';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import PopperTitle from '../../design-system/popper/popper-title';
import { searchManyBuilder } from '@dots.cool/schemas';

function FieldLink(props) {
  const {
    // Field input
    title = 'insert title',
    name,
    label,
    icon,
    type,
    value,
    onConfirm,
    // Autocomplete
    query,
    fields = ['id'],
    where = [],
    take = 10,
    skip = 0,
    orderBy = [],
    filterAttributes = ['id'],
    getOptionLabel,
    // Config
    withPreview,
    variant,
    multiple,
  } = props;

  const {
    // Pending value
    pendingValue,
    onChange,
    onCancel,
    handleSubmit,
    // User input
    inputValue,
    onInputChange,
    onClear,
    // Local value
    value: localValue,
    // Popper
    popupState,
    isOpen,
    onButtonClick,
  } = useAutocomplete({
    id: `field-select-${name}`,
    name,
    type,
    value,
    variant,
    multiple,
  });

  const _query = useMemo(
    () => searchManyBuilder(query)(fields, filterAttributes),
    [query, fields, filterAttributes]
  );

  //* FUNC -- Send request
  const [searchFunc, { data, loading, error }] = useLazyQuery(_query, {
    skip: !isOpen,
  });

  useDebounce(
    () => {
      if (isOpen) {
        searchFunc({
          variables: {
            take: take,
            skip: skip,
            input: inputValue,
            where: [
              {
                id: { notIn: [] },
              },
              ...where,
            ],
            orderBy: orderBy,
          },
        });
      }
    },
    250,
    [inputValue, isOpen]
  );

  // Add selected values to all results
  const options = useMemo(() => {
    return data?.rows || [];
  }, [data?.rows]);

  return (
    <>
      <FieldInput
        name={name}
        label={label}
        icon={icon}
        type={type}
        value={localValue}
        readOnly
        isActive={isOpen}
        {...bindToggle(popupState)}
        onClick={onButtonClick}
      />
      <Popper {...bindPopper(popupState)} placement="bottom-start">
        {isOpen && (
          <ClickAwayListener onClickAway={handleSubmit(onConfirm)}>
            <PopperContainer>
              <PopperTitle title={title} loading={loading} />
              <Autocomplete
                loading={loading}
                options={options}
                // Value
                value={pendingValue}
                onChange={onChange}
                // Input
                inputValue={inputValue}
                onInputChange={onInputChange}
                // Render
                filterOptions={(options) => options}
                getOptionLabel={getOptionLabel}
                isOptionEqualToValue={(option, value) =>
                  option?.id === value?.id
                }
                filterSelectedOptions={withPreview}
                onClose={() => null}
                clearOnBlur={false}
                onClear={onClear}
                disableCloseOnSelect
                multiple
                open
              />
              <Divider />
              <PopperActions
                onConfirm={handleSubmit(onConfirm)}
                onCancel={onCancel}
              />
            </PopperContainer>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default FieldLink;
