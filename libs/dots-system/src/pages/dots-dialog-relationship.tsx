import { useCallback, useMemo } from 'react';
import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import DotsDatagrid from './dots-datagrid';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { GRAPHQL_REQUESTS } from '@dots.cool/tokens';
import { useDots } from '@dots.cool/schema';

const QUERY_AGENT_PARAMS = `where: $whereAgent`;
const QUERY_TARGET_PARAMS = `skip: $skip, take: $take, where:$where, orderBy: $orderBy`;
const QUERY_TARGET_COUNT_PARAMS = `where:$where`;

function findLinkedArgs(agent: string, target: string, lang = false) {
  const Agent = ucFirst(agent);
  const Target = ucFirst(target);
  let output = `
    $whereAgent: ${Agent}WhereUniqueInput!,
    $take: Int! = 10,
    $skip: Int! = 0,
    $where: ${Target}WhereInput!,
    $orderBy: [${Target}OrderByInput!]! = [],
  `;

  if (lang) {
    output = `
      ${output},
      $lang: String,
    `;
  }
  return output;
}

const findLinkedBuilder =
  (agent: string, target: string, targets: string) =>
  (query: string, lang = false) => {
    const Agent = ucFirst(agent);
    return gql`
      query Get${Agent}(${findLinkedArgs(agent, target, lang)}) {
        ${agent}(${QUERY_AGENT_PARAMS}) {
          ${targets}(${QUERY_TARGET_PARAMS}) {
            ${query}
          }
          ${targets}Count(${QUERY_TARGET_COUNT_PARAMS})
        }
      }
    `;
  };

function DotsDialogRelationship(props) {
  const { agent, filterAgent, target } = props;

  const { getSchema } = useDots();
  const { singular, columns: _columns, views = {} } = getSchema(target);

  //* COLUMNS & QUERY
  //?Extract default values from context
  const currentContextView = views[GRAPHQL_REQUESTS.FindMany];
  const { fieldNames, query } = currentContextView;

  //-> Columns
  const columns = fieldNames.map((columnName: string) => _columns[columnName]);

  //* QUERIES
  // [ ](Adrien): Get infos from context
  const FindOne = findLinkedBuilder(agent, singular, plurial);
  const rowsQuery = useMemo(() => FindOne(query), [FindOne, query]);
  const rowsGetter = useCallback(
    (data) => {
      return [
        data?.[agent]?.[`${plurial}`] || [],
        data?.[agent]?.[`${plurial}Count`] || 0,
      ];
    },
    [agent, plurial]
  );

  const variables = useMemo(() => ({ whereAgent: filterAgent }), [filterAgent]);

  // [ ](Adrien): Create Button should be connected to agent
  //-> Use component props to do so, and add it to default values
  return (
    <Grid container width="100%">
      {/* [ ](Adrien): Calculate max height to prevent scrollBar */}
      <Box display="flex" height={600} width="100%">
        <DotsDatagrid
          entityName={target}
          variant="details"
          columns={columns}
          rowsQuery={rowsQuery}
          rowsGetter={rowsGetter}
          variables={variables}
          hideViews
        />
      </Box>
    </Grid>
  );
}

export default DotsDialogRelationship;
