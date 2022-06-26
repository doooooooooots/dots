import { useCallback, useMemo } from 'react';
import { GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import { useContext } from '../hoc';
import DotsDatagrid from './dots-datagrid';

// [ ](Adrien): Create language logic
const lang = '';

interface DotsPageIndexType {
  entityName: string;
}

function DotsPageIndex(props: DotsPageIndexType) {
  const { entityName } = props;

  const { plurial, views, graphql, columns: _columns } = useContext(entityName);

  //* COLUMNS & QUERY
  //?Extract default values from context
  const currentContextView = views[GRAPHQL_REQUESTS.FindMany];
  const { fieldNames, query } = currentContextView;

  //-> Columns
  const columns = fieldNames.map((columnName: string) => _columns[columnName]);

  //* QUERIES
  //?Extract query builder from context
  const { [GRAPHQL_REQUESTS.FindMany]: findMany } = graphql;

  //-> Create query
  const rowsQuery = useMemo(() => findMany(query, !!lang), [query, findMany]);
  const rowsGetter = useCallback(
    (data) => {
      return [data?.[`${plurial}`] || [], data?.[`${plurial}Count`] || 0];
    },
    [plurial]
  );

  return (
    <DotsDatagrid
      entityName={entityName}
      variant="details"
      columns={columns}
      rowsQuery={rowsQuery}
      rowsGetter={rowsGetter}
    />
  );
}

export default DotsPageIndex;
