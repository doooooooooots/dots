import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Single, SingleMain, SingleSidebar } from '@dots.cool/components';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';

import { useDots } from '@dots.cool/schema';

const DotsSinglePage = (props) => {
  const { entityName, query: _query, filter = {} } = props;

  //* QUERIES
  const { getSchema } = useDots();
  const { graphql, views = {} } = getSchema(entityName);

  const query = _query || views[GRAPHQL_ACTIONS.FindOne].query;
  const findOneQuery = graphql[GRAPHQL_ACTIONS.FindOne];

  const findOne = useMemo(() => findOneQuery(query), [query, findOneQuery]);

  const { data, loading, error } = useQuery(findOne, {
    variables: { ...filter },
  });

  if (loading) return `loading`;
  if (error) return `Error! ${error.message}`;

  // const { Sidebar, Main } = mergedComponents;
  return (
    <code>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </code>
  );
  // return (
  //   <Single>
  //     <SingleSidebar>
  //       <Sidebar
  //         texts={mergedTexts.sidebar}
  //         components={mergedComponents.sidebar}
  //         componentProps={mergedProps.sidebar}
  //       />
  //     </SingleSidebar>
  //     <SingleMain sx={{ p: 2 }}>
  //       <Main
  //         item={(data && data[singular]) || []}
  //         texts={mergedTexts.main}
  //         components={mergedComponents.main}
  //         componentProps={mergedProps.main}
  //       />
  //     </SingleMain>
  //   </Single>
  // );
};

export default DotsSinglePage;
