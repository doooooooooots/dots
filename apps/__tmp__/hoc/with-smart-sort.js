import React, { useState } from 'react';

const withSmartSort = (Component) => {
  const SortableComponent = (props) => {
    const [sort, setSort] = useState([]);
    const [sortPinned, setSortPinned] = useState([]);

    return (
      <Component {...props} sort={sort} sortPinned={sortPinned} setSortPinned={setSortPinned} onSortChange={setSort} />
    );
  };
  return SortableComponent;
};

export default withSmartSort;
