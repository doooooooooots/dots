import { useMemo } from 'react';
import { GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import DotsDatagrid from './dots-datagrid';
import { useDots } from '@dots.cool/schema';
import { Box } from '@mui/material';

// [ ](Adrien): Create language logic
const lang = '';

interface DotsPageIndexType {
  entityName: string;
}

function DotsPageIndex(props: DotsPageIndexType) {
  const { entityName } = props;

  const { getSchema } = useDots();
  const Entity = getSchema(entityName);

  const {
    graphql,
    fields,
    fragments: { default: query },
  } = Entity;

  console.log(Entity);

  // //* COLUMNS & QUERY
  // //?Extract default values from context
  // const currentContextView = views[GRAPHQL_REQUESTS.FindMany];

  // //-> Columns
  // const columns = Object.keys(fields).map(
  //   (columnName: string) => _columns[columnName]
  // );

  // //* QUERIES
  // //?Extract query builder from context
  const { [GRAPHQL_REQUESTS.FindMany]: findMany } = graphql;

  // //-> Create query
  const rowsQuery = useMemo(() => findMany(query, !!lang), [query, findMany]);

  return (
    <DotsDatagrid
      entityName={entityName}
      variant="details"
      columns={[
        {
          renderCell: ({ row }) => <Box>{row.id}</Box>,
          type: 'string',
          width: 180,
          ...props,
        },
      ]}
      rowsQuery={rowsQuery}
    />
  );
}

export default DotsPageIndex;

// <Box bgcolor="background.dark" color="white">
//   <pre>
//     <code>{JSON.stringify(Entity, null, 2)}</code>
//   </pre>
// </Box>;
