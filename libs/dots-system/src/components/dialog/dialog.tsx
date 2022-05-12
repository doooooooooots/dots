import { useCallback, useMemo } from 'react';

import { ConfirmModalWithPresets } from '../../modals';

import defaultDialogComponents from '../default-dialogs';

function MainDialogs(props: any) {
  const {
    graphql,
    query,
    lang,
    open,
    selectionModel,
    onSubmitCallback,
    onClose,
    components,
  } = props;

  // *Requests
  const requests: any = useMemo(
    () =>
      Object.keys(graphql).reduce(
        (acc, key) => ({
          ...acc,
          [key]: graphql[key](query, lang),
        }),
        {}
      ),
    [graphql, lang, query]
  );

  // *Components
  const mergedComponents = useMemo(
    () => ({
      ...defaultDialogComponents,
      ...components,
    }),
    [components]
  );

  const LogicComponent = mergedComponents[open];
  const ContainerComponent = useCallback(
    (props) => <ConfirmModalWithPresets {...props} variant={open} />,
    [open]
  );

  if (!open) return null;

  return (
    <LogicComponent
      // Send to user modal logic
      request={requests[open]}
      targets={selectionModel}
      onClose={onClose}
      Component={ContainerComponent}
      // Send to system modal logic
      onSubmitCallback={onSubmitCallback}
    />
  );
}

export default MainDialogs;
