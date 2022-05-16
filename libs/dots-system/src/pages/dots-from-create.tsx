import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Form } from '@dots.cool/form-builder';
import { getContext } from '../hoc/with-context';
import { useMemo } from 'react';

const DotsFormCreate = (props) => {
  const { context } = props;

  //* GENERATE INPUTS
  const { fieldNames } = context.views[GRAPHQL_ACTIONS.CreateOne];
  const { inputs, needsContext } = context;
  const contexts = useMemo(
    () =>
      needsContext.reduce(
        (acc, fieldName: string) => ({
          ...acc,
          [fieldName]: getContext(fieldName),
        }),
        {}
      ),
    []
  );

  return (
    <Form id="test" context={context}>
      {fieldNames.map((fieldName: string) => {
        const Component = inputs[fieldName];
        return (
          <Component
            key={fieldName}
            name={fieldName}
            context={contexts[fieldName] || null}
          />
        );
      })}
    </Form>
  );
};

export default DotsFormCreate;
