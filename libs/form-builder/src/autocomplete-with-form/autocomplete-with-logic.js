import React from 'react';
import { Autocomplete, debounce } from '@mui/material';
import withMiddleware from '../with-middleware/with-middleware';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { useQuery } from '@apollo/client';

const SKIP = 0;
const TAKE = 10;

function AutocompleteWithLogic(props, ref) {
  const {
    context,
    options = [],
    onChange,
    onCreateNewClick,
    onInputChange,
    formTitle,
    renderFormComponent,
    ...rest
  } = props;

  // *FUNC -- When user is changing input value
  // -> Request is made 'onInputChange'
  // -> options is changed - component is re-rendered

  // Get context infos
  const { singular, indexColumn, graphql, plurial } = context;

  const makeFindManyQuery = graphql[GRAPHQL_ACTIONS.FindMany];
  const findManyQuery = makeFindManyQuery(
    indexColumn === 'id' ? [indexColumn] : ['id', indexColumn]
  );

  const { data, loading, refetch } = useQuery(findManyQuery, {
    variables: { take: TAKE, skip: SKIP },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedStorageSearch = React.useCallback(
    debounce((searchString) => {
      refetch({
        take: TAKE,
        skip: SKIP,
        where: {
          [indexColumn]: { contains: searchString, mode: 'insensitive' },
        },
      });
    }, 450),
    []
  );
  const handleInputChange = React.useCallback(
    (_, newValue) => {
      // TODO(Adrien): Find better approach to prevent call after no results
      if (
        newValue === '' ||
        (newValue !== '' && newValue.length < 3) ||
        (newValue.length >= 3 && options.length && options.length > 8)
      ) {
        debouncedStorageSearch(newValue);
      }
    },
    [options.length, debouncedStorageSearch]
  );

  // *FUNC -- When user select an option
  // -> 2 possibilities : User choose existing | user wants to create
  const handleChange = React.useCallback(
    (event, newValue) => {
      // -- CREATE
      // User pressed "Enter" key || clicked on "Add" option
      if (newValue && (typeof newValue === 'string' || newValue.inputValue)) {
        event.preventDefault();
        let _newValue = newValue;
        if (newValue.inputValue) _newValue = newValue.inputValue;
        onCreateNewClick(singular, { [indexColumn]: _newValue });

        // -- CHOOSE
        // User selected an option
      } else {
        onChange(event, newValue);
      }
    },
    [singular, onCreateNewClick, indexColumn, onChange]
  );

  // *FUNC -- filterSelectedOptions
  const filterOptions = React.useCallback(
    (options, params) => {
      if (params.inputValue !== '') {
        options.push({
          inputValue: params.inputValue,
          [indexColumn]: `Ajouter "${params.inputValue}"`,
        });
      }
      return options;
    },
    [indexColumn]
  );

  // *FUNC -- Get option label
  const getOptionLabel = React.useCallback(
    (option) => {
      // e.g value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      if (option.inputValue) {
        return option.inputValue;
      }
      return option[indexColumn];
    },
    [indexColumn]
  );

  if (loading) return 'loading';

  // *RENDER
  return (
    <Autocomplete
      ref={ref}
      onInputChange={handleInputChange}
      onChange={handleChange}
      filterOptions={filterOptions}
      options={data && data[plurial]}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => (
        <li {...props}>{option[indexColumn]}</li>
      )}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
      {...rest}
    />
  );
}

export default React.forwardRef(AutocompleteWithLogic);
export const autocompleteWithLogic = withMiddleware(AutocompleteWithLogic);
