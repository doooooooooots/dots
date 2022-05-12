import React, { useState } from 'react';

const withSmartFilter = (Component) => {
  const FilterableComponent = (props) => {
    const { where: initalValue } = props;
    const [where, setWhere] = useState(initalValue || {});

    return <Component where={where} onFilterChange={setWhere} {...props} />;
  };
  return FilterableComponent;
};

export default withSmartFilter;
