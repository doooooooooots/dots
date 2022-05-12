import { FunctionComponent, useState } from 'react';

const withSmartViews = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const ViewableComponent = (props: any) => {
    const [view, setView] = useState(null);

    return (
      <Component
        {...props}
        currentView={view}
        onViewChange={setView}
        withViews
      />
    );
  };
  return ViewableComponent;
};

export default withSmartViews;
