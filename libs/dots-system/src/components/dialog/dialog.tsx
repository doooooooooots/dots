import { useMutation } from '@apollo/client';
import React, { useMemo } from 'react';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import DEFAULT_DATAGRID_DIALOGS_COMPONENTS from '../dialog-default';

import {
  MutationFunctionOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from '@apollo/client';
import { useContext } from '../../hoc';

export type OnSubmitType = (
  options?:
    | MutationFunctionOptions<
        unknown,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined
) => Promise<unknown>;

export type OnSubmitCallbackType = (datas?: any) => void;

export interface ModalComponentProps {
  target: string[] | unknown;
  onSubmit: OnSubmitType;
  onSubmitCallback: OnSubmitCallbackType;
  onCancel: () => void;
  onClose: () => void;
}

type MainDialogsPropsType = {
  entityName: string;
  target: string[] | unknown;
  lang?: string;
  open: typeof GRAPHQL_ACTIONS[keyof typeof GRAPHQL_ACTIONS] | '';
  onSubmitCallback: OnSubmitCallbackType;
  onClose: () => void;
  components?: {
    [key in typeof GRAPHQL_ACTIONS[keyof typeof GRAPHQL_ACTIONS]]: React.FC<ModalComponentProps>;
  };
};

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

  const { graphql } = useContext(entityName);

  // [ ](Adrien): query logic to implement
  const query = useMemo(() => ['id'], []);

  let action = graphql[open];

  if (!action) {
    if (open.endsWith('_one')) action = graphql[GRAPHQL_ACTIONS.UpdateOne];
    if (open.endsWith('_many')) action = graphql[GRAPHQL_ACTIONS.UpdateMany];
  }
  const mutation = useMemo(() => action(query, !!lang), [query, action, lang]);
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
