import { FunctionComponent, useState } from 'react';

const withSmartFilter = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const FilterableComponent = (props: any) => {
    const { filter: initalValue } = props;
    const [filter, setFilter] = useState(
      initalValue || {
        operator: 'and',
        filters: [],
        byId: {},
      }
    );

    return (
      <Component
        {...props}
        filter={filter}
        onFilterChange={setFilter}
        withFilter
      />
    );
  };
  return FilterableComponent;
};

export default withSmartFilter;
