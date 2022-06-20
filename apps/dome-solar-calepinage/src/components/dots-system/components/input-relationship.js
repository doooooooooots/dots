import { useAutocomplete } from '@dots.cool/hooks';
import { Autocomplete, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import PopperTitle from '../../design-system/popper/popper-title';
import { isEmpty, last } from 'lodash';
import PopperInput from '../../design-system/popper/popper-input';
import PopperSelectedList from '../../design-system/select-with-autocomplete/components/popper-selected-list';
import makeSortFunc from '../../design-system/autocomplete/utils/makeSortFunc';
import StyledAutocompletePopper from './styled-autocomplete-popper';
import PopperLinkTemplateSelect from './select-template';

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

function InputRelationship(props) {
  const {
    // Field input
    title = '',
    name,
    value,
    options,
    onChange,
    loading,

    // Templates
    templates,
    currentTemplate,
    onTemplateChange,

    renderOption,
    getOptionLabel,

    // Input
    input,
    onInputChange,
    onInputClear,

    // Preview
    filterSelectedAttributes,
    renderSelectedOption,

    // Config
    withPreview,
    withDetails,
    disableSort,
    multiple,
  } = props;

  console.log(currentTemplate);

  const { id, pendingValue, handleChange, handleDelete } = useAutocomplete({
    name: name,
    value: value,
    multiple,
  });

  // Add selected values to all results
  const _options = useMemo(() => {
    if (isEmpty(options)) return [];
    return disableSort
      ? options
      : [...options].sort(makeSortFunc({ value: pendingValue, options }));
  }, [disableSort, pendingValue, options]);

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    const getValue = (value, multiple) => {
      if (isEmpty(value)) return { set: [] };
      if (multiple)
        return {
          set: value.map(({ id }) => ({
            id,
          })),
        };
      return { set: { id: last(value)?.id } };
    };

    if (typeof onChange === 'function') {
      onChange(getValue(pendingValue, multiple));
    }
  }, [onChange, pendingValue, multiple]);

  return (
    <Stack direction="row">
      <Stack flex={1} overflow="hidden" width={270}>
        {title && <PopperTitle title={title} loading={loading} />}
        <Autocomplete
          id={id}
          loading={!title && loading}
          options={_options}
          // Value
          value={pendingValue}
          onChange={handleChange}
          // Input
          inputValue={input || ''}
          onInputChange={onInputChange}
          renderInput={(params) => (
            <Stack ref={params.InputProps.ref}>
              <PopperInput
                inputProps={params.inputProps}
                loading={loading}
                onClear={onInputClear}
                autoFocus
              />
              {!isEmpty(templates) && (
                <>
                  <PopperLinkTemplateSelect
                    options={templates}
                    value={currentTemplate}
                    onChange={onTemplateChange}
                  />
                  <Divider />
                </>
              )}
            </Stack>
          )}
          renderOption={renderOption}
          getOptionLabel={getOptionLabel}
          filterOptions={(options) => options}
          isOptionEqualToValue={(_option, _value) => _option?.id === _value?.id}
          filterSelectedOptions={withPreview}
          onClose={() => null}
          clearOnBlur={false}
          PopperComponent={PopperComponent}
          disableCloseOnSelect
          multiple
          open
        />
      </Stack>

      {withPreview && (
        <Stack width={270} borderLeft={1} borderColor="divider">
          <PopperSelectedList
            filterAttributes={filterSelectedAttributes}
            renderOption={renderSelectedOption}
            pendingValue={pendingValue}
            onDelete={handleDelete}
          />
        </Stack>
      )}

      {/* [ ](Adrien): Implements logic */}
      {withDetails && !isEmpty(pendingValue) && (
        <Stack
          width={270}
          borderLeft={1}
          borderColor="divider"
          spacing={1}
          p={2}
        >
          {Object.entries(pendingValue[0]).map(([key, _value]) => (
            <Stack key={key} borderBottom={1} borderColor="divider">
              <Typography variant="caption">{key}</Typography>
              <Typography variant="body2">{_value}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

export default InputRelationship;
