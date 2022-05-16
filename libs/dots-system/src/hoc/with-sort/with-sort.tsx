import { FunctionComponent, useState } from 'react';

const withSmartSort = (
  Component: FunctionComponent<any>
): FunctionComponent<any> => {
  const SortableComponent = (props: any) => {
    const { sort: initSort } = props;
    const [sort, setSort] = useState(initSort || []);
    const [sortPinned, setSortPinned] = useState([]);

    return (
      <Component
        {...props}
        sort={sort}
        sortPinned={sortPinned}
        setSortPinned={setSortPinned}
        onSortChange={setSort}
        withSort
      />
    );
  };
  return SortableComponent;
};

export default withSmartSort;
