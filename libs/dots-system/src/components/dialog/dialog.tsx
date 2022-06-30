import { useMutation } from '@apollo/client';
import React, { useMemo } from 'react';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import DEFAULT_DATAGRID_DIALOGS_COMPONENTS from '../dialog-default';

import { useDots } from '@dots.cool/schema';
import { MainDialogsPropsType } from '../../types/dialog';

function MainDialogs(props: MainDialogsPropsType) {
  const {
    entityName,
    target,
    lang,
    open, // is modal open ?
    onSubmitCallback,
    onClose,
    components = {}, // For further customization
  } = props;

  const { getSchema } = useDots();
  const { graphql } = getSchema(entityName);

  // [ ](Adrien): query logic to implement
  const query = useMemo(() => ['id'], []);

  let action = graphql[open];

  if (!action) {
    if (open.endsWith('_one')) action = graphql[GRAPHQL_ACTIONS.UpdateOne];
    if (open.endsWith('_many')) action = graphql[GRAPHQL_ACTIONS.UpdateMany];
  }
  const mutation = useMemo(
    () => action(query.join(' '), !!lang),
    [query, action, lang]
  );
  const [onSubmit] = useMutation(mutation);

  const mergedComponents = useMemo(
    () => ({
      ...DEFAULT_DATAGRID_DIALOGS_COMPONENTS,
      ...components,
    }),
    [components]
  );

  const LogicComponent = open && mergedComponents[open];

  if (!LogicComponent || !mutation) return null;

  return (
    <LogicComponent
      // Send to user modal logic
      target={target}
      onSubmit={onSubmit}
      onClose={onClose}
      // Send to system modal logic
      onSubmitCallback={onSubmitCallback}
      onCancel={onClose}
    />
  );
}

export default MainDialogs;
