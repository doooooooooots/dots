import { useMemo } from 'react';
import { GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import DotsDatagrid from './dots-datagrid';
import { useDots } from '@dots.cool/schema';

// [ ](Adrien): Create language logic
const lang = '';

interface DotsPageIndexType {
  entityName: string;
}

function DotsPageIndex(props: DotsPageIndexType) {
  const { entityName } = props;

  const { getSchema } = useDots();

  const {
    graphql,
    columnApi,
    fragments: { details },
  } = getSchema(entityName);

  const columns = useMemo(
    () => columnApi.getColumnsFromFragment('details'),
    [columnApi]
  );

  // //* QUERIES
  // //?Extract query builder from context
  const { [GRAPHQL_REQUESTS.FindMany]: findMany } = graphql;
  const rowsQuery = useMemo(
    () => findMany(details, !!lang),
    [details, findMany]
  );

  return (
    <DotsDatagrid
      entityName={entityName}
      variant="details"
      columns={columns}
      rowsQuery={rowsQuery}
    />
  );
}

export default DotsPageIndex;
