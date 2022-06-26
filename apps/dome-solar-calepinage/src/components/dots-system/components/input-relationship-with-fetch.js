import { useLazyQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useDebounce } from 'react-use';
import { useDots } from '../context/dots-context';
import { searchManyBuilder } from '@dots.cool/schemas';
import { useInputText, useInputSelect } from '@dots.cool/hooks';
import InputRelationship from './input-relationship';
import ErrorPage from '../../design-system/screens/error-page';
import { ucFirst } from '@dots.cool/utils';

function InputRelationWithFetch(props) {
  const {
    // Field input
    placeholder,
    name,
    value,
    multiple,

    // Autocomplete
    options,
    renderModel = 'default',
    where = {},
    take = 10,
    skip = 0,
    orderBy = [],

    ...other
  } = props;

  const { value: currentTemplate, onChange: onTemplateChange } = useInputSelect(
    `template-${name}`,
    renderModel
  );
  const { input, onChange: onInputChange, onClear } = useInputText(name, '');

  /**
   * Get entity settings from context
   */
  const ucOptions = ucFirst(options);
  const { [ucOptions]: model } = useDots();
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

  const { Option, Preview } = components;

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

  /**
   * Get entities when user stop typing
   */
  useDebounce(
    () => {
      searchFunc({
        variables: {
          take: take,
          skip: skip,
          input: input || '',
          where: where,
          orderBy: orderBy,
        },
      });
    },
    250,
    [input]
  );

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <InputRelationship
      {...other}
      name={name}
      placeholder={placeholder}
      value={value || []}
      options={rows || []}
      loading={loading}
      input={input}
      onInputChange={onInputChange}
      onInputClear={onClear}
      templates={templates}
      currentTemplate={currentTemplate}
      onTemplateChange={onTemplateChange}
      getOptionLabel={getOptionLabel}
      renderOption={(props, _option, state) => (
        <Option {...props} {...Option.bindProps(getters, _option, state)} />
      )}
      renderSelectedOption={(props, _option, state) => (
        <Preview {...props} {...Preview.bindProps(getters, _option, state)} />
      )}
      filterSelectedAttributes={filterAttributes}
      withPreview={multiple}
      multiple={multiple}
    />
  );
}

export default InputRelationWithFetch;
