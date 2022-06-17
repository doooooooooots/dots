import React, { useCallback, useMemo, useState } from 'react';
import {
  ClickAwayListener,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useAutocomplete, bindToggle, bindPopper } from '@dots.cool/hooks';
import FieldInput from './input';
import Popper from '../../popper-styled';
import PopperContainer from '../../design-system/popper/popper-container';
import Autocomplete from '../../design-system/autocomplete/autocomplete';
import PopperActions from '../../design-system/popper/popper-actions';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import PopperTitle from '../../design-system/popper/popper-title';
import { searchManyBuilder } from '@dots.cool/schemas';
import PopperSelectedList from '../../design-system/select-with-autocomplete/components/popper-selected-list';
import { useDots } from '../context/dots-context';
import { isEmpty } from 'lodash';
import PopperInput from '../../design-system/popper/popper-input';

function FieldLinkPopper(props) {
  const { title, onSubmit } = props;

  const {
    // Pending value
    pendingValue,
    onChange,
    onCancel,
    onDelete,
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
    type: 'link',
    value: [],
  });

  //* Render template
  const [currentTemplate, setCurrentTemplate] = useState(renderModel);

  const { [entity]: model } = useDots();
  const { singular, default: defaultModel, templates } = model;
  const templateList = Object.entries(templates).map(([key, { name }]) => ({
    value: key,
    label: name,
  }));
  const { query, filterAttributes, components, getters } = useMemo(() => {
    if (!(currentTemplate in templates)) return defaultModel;

    let { query, filterAttributes, components, getters } = defaultModel;
    const currentModel = templates[currentTemplate];

    if ('query' in currentModel) {
      query = currentModel.query;
    }
    if ('filterAttributes' in currentModel) {
      filterAttributes = currentModel.filterAttributes;
    }
    if ('components' in currentModel) {
      components = {
        ...components,
        ...currentModel.components,
      };
    }
    if ('getters' in currentModel) {
      getters = {
        ...getters,
        ...currentModel.getters,
      };
    }

    return { query, filterAttributes, components, getters };
  }, [defaultModel, templates, currentTemplate]);
  const { Icon, Option, Preview } = components;

  const handleTemplateChange = useCallback(
    (event) => setCurrentTemplate(event.target.value),
    []
  );

  //* FUNC -- Send request
  const _query = useMemo(
    () => searchManyBuilder(singular)(query, filterAttributes),
    [singular, query, filterAttributes]
  );
  const [searchFunc, { data, loading, error }] = useLazyQuery(_query, {
    skip: !isOpen,
  });

  //* Autocomplete
  const getOptionLabel = useMemo(() => {
    return (option) =>
      filterAttributes.reduce((acc, key) => `${acc} ${option[key]} `, '');
  }, [filterAttributes]);

  // Add selected values to all results
  const options = useMemo(() => {
    return data?.rows || [];
  }, [data?.rows]);

  //* Effect
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

  return (
    <ClickAwayListener
      onClickAway={handleSubmit(onConfirm)}
      mouseEvent="onMouseDown"
    >
      <PopperContainer
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          flex: 1,
          justifyContent: 'stretch',
        }}
      >
        <Stack flex={1} overflow="hidden" width={270}>
          {title && <PopperTitle title={title} loading={loading} />}
          <Autocomplete
            loading={!title && loading}
            options={options}
            // Value
            value={pendingValue}
            onChange={onChange}
            // Input
            inputValue={inputValue}
            onInputChange={onInputChange}
            renderInput={(params) => (
              <>
                <PopperInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  loading={loading}
                  onClear={onClear}
                  autoFocus
                />
                {!isEmpty(templateList) && (
                  <>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      px={1}
                      spacing={1}
                      sx={{ color: 'neutral.500' }}
                    >
                      <Typography variant="caption">Search by:</Typography>
                      <Select
                        value={currentTemplate}
                        onChange={handleTemplateChange}
                        variant="standard"
                        sx={{
                          fontSize: 12,
                          height: 20,
                          px: 1,
                          borderRadius: 1,
                          '& .MuiSelect-select.MuiSelect-standard.MuiInput-input.MuiInputBase-input':
                            {
                              pr: 1,
                            },
                          '& .MuiSvgIcon-root': {
                            fontSize: 16,
                          },
                          '&:before, &:after': {
                            content: 'none',
                          },
                          '& fieldset': {
                            border: 0,
                          },
                          '&:hover': {
                            bgcolor: 'neutral.background',
                          },
                          '& .MuiInput-input:focus': {
                            bgcolor: 'transparent',
                          },
                        }}
                      >
                        <MenuItem key={value} value={'default'}>
                          default
                        </MenuItem>
                        {templateList.map(({ value, label }) => (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Stack>
                    <Divider />
                  </>
                )}
              </>
            )}
            renderOption={(props, _option, state) => (
              <Option
                {...props}
                {...Option.bindProps(getters, _option, state)}
              />
            )}
            getOptionLabel={getOptionLabel}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            filterSelectedOptions={withPreview}
            onClose={() => null}
            clearOnBlur={false}
            disableCloseOnSelect
            multiple
            open
          />
          <Divider />
          <PopperActions
            onConfirm={handleSubmit(onConfirm)}
            onCancel={onCancel}
          />
        </Stack>

        {withPreview && (
          <Stack width={270} borderLeft={1} borderColor="divider">
            <PopperSelectedList
              filterAttributes={filterAttributes}
              renderOption={(props, _option, state) => (
                <Preview
                  {...props}
                  {...Preview.bindProps(getters, _option, state)}
                />
              )}
              pendingValue={pendingValue}
              onDelete={onDelete}
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
            {Object.entries(pendingValue[0]).map(([key, value]) => (
              <Stack key={key} borderBottom={1} borderColor="divider">
                <Typography variant="caption">{key}</Typography>
                <Typography variant="body2">{value}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </PopperContainer>
    </ClickAwayListener>
  );
}

export default FieldLinkPopper;
