import {
  MutationFunctionOptions,
  OperationVariables,
  DefaultContext,
  ApolloCache,
} from '@apollo/client';

import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';

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

export type MainDialogsPropsType = {
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
