import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import Pagination from './pagination';

function PaginationWithRequest(props) {
  const { aggregateQuery, aggregateGetter, where } = props;

  //[ ](Adrien): Move logic to pagination
  //-> GET Aggregates && extract total count
  const { data: aggregate } = useQuery(aggregateQuery, {
    variables: { where: where },
  });
  const totalCounts = useMemo(
    () => aggregateGetter(aggregate),
    [aggregateGetter, aggregate]
  );

  return <Pagination {...props} totalCounts={totalCounts} />;
}

export default PaginationWithRequest;
