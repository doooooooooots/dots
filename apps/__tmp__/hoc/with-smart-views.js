import React, { useState } from 'react';

const withSmartViews = (Component) => {
  const ViewableComponent = (props) => {
    const [tab, setTab] = useState(null);

    return <Component currentView={tab} onViewChange={setTab} {...props} />;
  };
  return ViewableComponent;
};

export default withSmartViews;
