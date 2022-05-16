import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { Form } from '@dots.cool/form-builder';
import { getContext } from '../hoc/with-context';
import { useMemo, useCallback } from 'react';
import useHistory from '../hooks/use-history/use-history';

const FORM_MODAL_WIDTH = 'md';

const DotsFormCreate = (props) => {
  const { context } = props;

  const { push } = useHistory();

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

  const handleCreateClick = useCallback(
    (fieldName, defaultValues) => {
      push({
        title: `form.${fieldName}.create.title`,
        path: `create.${fieldName}`,
        Component: DotsFormCreate,
        componentProps: { context: contexts[fieldName], defaultValues },
        width: FORM_MODAL_WIDTH,
      });
    },
    [contexts, push]
  );

  return (
    <Form id="test" context={context}>
      {fieldNames.map((fieldName: string) => {
        const Component = inputs[fieldName];
        if (needsContext.includes(fieldName)) {
          return (
            <Component
              key={fieldName}
              name={fieldName}
              onCreateNewClick={handleCreateClick}
              context={contexts[fieldName]}
            />
          );
        }
        return <Component key={fieldName} name={fieldName} />;
      })}
    </Form>
  );
};

export default DotsFormCreate;
