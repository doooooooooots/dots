import { FunctionComponent, useState } from 'react';

const initialState = {
  operator: 'and',
  filters: [],
  byId: {},
};

const withSmartFilter = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const FilterableComponent = (props: any) => {
    const { filter: initalValue = initialState } = props;
    const [filter, setFilter] = useState(initalValue);

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
