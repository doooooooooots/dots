import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Form } from '@dots.cool/form-builder';
import { useMemo, useCallback, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { ucFirst } from '@dots.cool/utils';
import FieldWithContext from '../components/field-with-context/field-with-context';
import { useDots } from '@dots.cool/schema';

const DotsFormCreate = (props) => {
  const { id, parentFormId, entityName, defaultValues, onSubmitSuccess } =
    props;

  // HACK: Allow component to re-render in order to re-inititate form (react-hook and saved data)
  const [isMounted, setIsMounted] = useState(true);

  // TOTHINK(Adrien): get context can make a call for getting last schema
  const { getSchema } = useDots();
  const {
    inputs,
    needsContext,
    graphql,
    views,
    defaultValues: _defaultValues,
    formatData,
    validations,
  } = getSchema(entityName);

  //* DEFAULT VALUES
  const defaultValuesMerged = useMemo(
    () => ({
      ..._defaultValues, // Default values for entity (from schema)
      ...defaultValues, // Default values from Component
    }),
    [defaultValues, _defaultValues]
  );

  //* CREATE QUERIES
  //-> Create query builder from context
  const createOne = graphql[GRAPHQL_ACTIONS.CreateOne];
  const { query, fieldNames } = views[GRAPHQL_ACTIONS.CreateOne];

  //-> Create submit query
  const [onSubmit, { loading }] = useMutation(createOne(query));

  //-> Handle form submit
  const handleSubmitClick = useCallback(
    (data) => {
      const makeSubmit = async () => {
        const { data: res } = await onSubmit({
          variables: { data: formatData(data) },
        });

        const response = res[`create${ucFirst(entityName)}`];

        //-> Run callback if there's one
        if (typeof onSubmitSuccess === 'function') {
          await onSubmitSuccess(response);
        }
        return response;
      };

      return toast.promise(makeSubmit(), {
        loading: 'Saving...',
        success: <b>ui.toast.form.create.save--success</b>,
        error: <b>ui.toast.form.create.save--error</b>,
      });
    },
    [formatData, onSubmit, onSubmitSuccess, entityName]
  );

  //* EFFECT - Unmount on id change
  // HACK: Allow component to re-render in order to re-inititate form (react-hook and saved data)
  //-> Force Component unmount to re-init all datas ...
  // ... so we can use life cycle of Form component
  // useEffect(() => {
  //   setIsMounted(false);
  //   setTimeout(() => {
  //     setIsMounted(true);
  //   }, 5);
  // }, [id]);

  if (!isMounted) return null;

  return (
    <Form
      id={id}
      entityName={entityName}
      parentFormId={parentFormId}
      onSubmit={handleSubmitClick}
      onSubmitSuccess={onSubmitSuccess}
      defaultValues={defaultValuesMerged}
      validations={validations}
      loading={loading}
    >
      {fieldNames.map((fieldName: string) => {
        const Component = inputs[fieldName];
        if (fieldName in needsContext) {
          return (
            <FieldWithContext
              formId={id}
              name={fieldName}
              target={needsContext[fieldName].ref}
            >
              {({
                indexColumn,
                options,
                loading,
                onInputChange,
                onCreateButtonClick,
                ...other
              }) => (
                <Component // Enhanced by React hook forms
                  key={fieldName}
                  name={fieldName}
                  indexColumn={indexColumn}
                  options={options}
                  loading={loading}
                  onInputChange={onInputChange}
                  onCreateButtonClick={onCreateButtonClick}
                  {...other}
                />
              )}
            </FieldWithContext>
          );
        }
        return <Component key={fieldName} name={fieldName} />;
      })}
    </Form>
  );
};

export default DotsFormCreate;
