import { VIEW_MODES } from '@dots.cool/tokens';
import { FunctionComponent, useState } from 'react';

const withSmartViewMode = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const ViewModableComponent = (props: any) => {
    const [viewMode, setViewMode] = useState(VIEW_MODES.Table);

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
