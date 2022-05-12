import { VIEW_MODE_TABLE } from '@dots.cool/tokens';
import { FunctionComponent, useState } from 'react';

const withSmartViewMode = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const ViewModableComponent = (props: any) => {
    const [viewMode, setViewMode] = useState(VIEW_MODE_TABLE);

    return (
      <Component
        {...props}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    );
  };
  return ViewModableComponent;
};

export default withSmartViewMode;
