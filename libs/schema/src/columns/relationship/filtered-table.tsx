import React from 'react';

function FilteredTable(props) {
  const { field } = props;

  const gameIds = useQuery();

  const queryFilter = useQuery({
    variables: { where: { [field]: { id: { in: [] } } } },
    // -> where { game : { id: { in: [ ]}}}
  });

  return <div>FilteredTable</div>;
}

export default FilteredTable;
