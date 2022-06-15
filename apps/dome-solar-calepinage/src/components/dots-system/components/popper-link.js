import { useLazyQuery } from '@apollo/client';
import { useAutocomplete } from '@dots.cool/hooks';
import {
  Autocomplete,
  autocompleteClasses,
  Divider,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import PopperTitle from '../../design-system/popper/popper-title';
import { useDots } from '../context/dots-context';
import PopperActions from './popper-actions';
import { isEmpty } from 'lodash';
import { searchManyBuilder } from '@dots.cool/schemas';
import PopperInput from '../../design-system/popper/popper-input';
import PopperSelectedList from '../../design-system/select-with-autocomplete/components/popper-selected-list';

const StyledAutocompletePopper = styled('div')(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: 'none',
    margin: 0,
    color: 'inherit',
    fontSize: 13,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
    padding: 0,
    [`& .${autocompleteClasses.option}`]: {
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
      }`,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
        {
          backgroundColor: theme.palette.action.hover,
        },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: 'relative',
  },
}));

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

function PopperLink(props) {
  const {
    // Field input
    title = '',
    name,
    label,
    value,
    onSubmit,
    isOpen = true,
    // Autocomplete
    entity = 'Person',
    renderModel = 'default',
    where = [],
    take = 10,
    skip = 0,
    orderBy = [],
    // Config
    withPreview = true,
    withDetails,
    variant,
    multiple = true,
  } = props;

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
    onButtonClick,
  } = useAutocomplete({
    id: `field-select-${name}`,
    name: 'lol',
    type: 'link',
    value: [],
    multiple,
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
    <Stack direction="row">
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
            <Stack ref={params.InputProps.ref}>
              <PopperInput
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
            </Stack>
          )}
          renderOption={(props, _option, state) => (
            <Option {...props} {...Option.bindProps(getters, _option, state)} />
          )}
          getOptionLabel={getOptionLabel}
          filterOptions={(options) => options}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          filterSelectedOptions={withPreview}
          onClose={() => null}
          clearOnBlur={false}
          PopperComponent={PopperComponent}
          disableCloseOnSelect
          multiple
          open
        />
        <Divider />
        <PopperActions onConfirm={() => null} onCancel={onCancel} />
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
    </Stack>
  );
}

export default PopperLink;
