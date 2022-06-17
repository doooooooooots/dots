import { useLazyQuery } from '@apollo/client';
import { useAutocomplete } from '@dots.cool/hooks';
import { Autocomplete, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import PopperTitle from '../../design-system/popper/popper-title';
import { useDots } from '../context/dots-context';
import PopperActions from './actions';
import { isEmpty } from 'lodash';
import { searchManyBuilder } from '@dots.cool/schemas';
import PopperInput from '../../design-system/popper/popper-input';
import PopperSelectedList from '../../design-system/select-with-autocomplete/components/popper-selected-list';
import makeSortFunc from '../../design-system/autocomplete/utils/makeSortFunc';
import StyledAutocompletePopper from './styled-autocomplete-popper';
import PopperLinkTemplateSelect from './popper-link-template-select';

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

function PopperLink(props) {
  const {
    // Field input
    title = '',
    name,
    value,
    onChange,
    onCancel,
    // onSubmit,

    // Autocomplete
    entity = 'Project',
    renderModel = 'default',
    where = [],
    take = 10,
    skip = 0,
    orderBy = [],

    // Config
    withPreview,
    withDetails,
    disableSort,
    multiple,
  } = props;

  const {
    id,
    // Pending value
    pendingValue,
    getValue,
    handleChange,
    handleDelete,
    // Search input
    input,
    handleInputChange,
    handleInputClear,
  } = useAutocomplete({
    name: name,
    value: value,
    multiple,
  });

  const [currentTemplate, setCurrentTemplate] = useState(renderModel);

  /**
   * Get entity settings from context
   */
  const { [entity]: model } = useDots();
  const { singular, default: defaultModel, templates } = model;

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

  /**
   * Create the query from entity settings
   */
  const _query = useMemo(
    () => searchManyBuilder(singular)(query, filterAttributes),
    [singular, query, filterAttributes]
  );

  const [searchFunc, { data = {}, loading, error }] = useLazyQuery(_query);
  const { rows } = data;

  /**
   *  Get label from entity object
   *? Labels are not shown but are used when we filter the results
   */
  const getOptionLabel = useMemo(() => {
    return (option) =>
      filterAttributes.reduce((acc, key) => `${acc} ${option[key]}`, '');
  }, [filterAttributes]);

  // Add selected values to all results
  const options = useMemo(() => {
    if (isEmpty(rows)) return [];
    return disableSort
      ? rows
      : [...rows].sort(makeSortFunc({ value: pendingValue, options: rows }));
  }, [disableSort, pendingValue, rows]);

  /**
   * Get entities when user stop typing
   */
  useDebounce(
    () => {
      searchFunc({
        variables: {
          take: take,
          skip: skip,
          input: input,
          where: [
            {
              id: { notIn: [] },
            },
            ...where,
          ],
          orderBy: orderBy,
        },
      });
    },
    250,
    [input]
  );

  /**
   * Suscribe to each changes
   */
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(getValue(pendingValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValue, onChange, pendingValue]);

  return (
    <Stack direction="row">
      <Stack flex={1} overflow="hidden" width={270}>
        {title && <PopperTitle title={title} loading={loading} />}
        <Autocomplete
          id={id}
          loading={!title && loading}
          options={options}
          // Value
          value={pendingValue}
          onChange={handleChange}
          // Input
          inputValue={input}
          onInputChange={handleInputChange}
          renderInput={(params) => (
            <Stack ref={params.InputProps.ref}>
              <PopperInput
                inputProps={params.inputProps}
                loading={loading}
                onClear={handleInputClear}
                autoFocus
              />
              {!isEmpty(templates) && (
                <>
                  <PopperLinkTemplateSelect
                    options={templates}
                    value={currentTemplate}
                    onChange={setCurrentTemplate}
                  />
                  <Divider />
                </>
              )}
            </Stack>
          )}
          renderOption={(props, _option, state) => (
            <Option {...props} {...Option.bindProps(getters, _option, state)} />
          )}
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
            filterAttributes={filterAttributes}
            renderOption={(props, _option, state) => (
              <Preview
                {...props}
                {...Preview.bindProps(getters, _option, state)}
              />
            )}
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

export default PopperLink;
