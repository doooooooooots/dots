import React, { useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import DotsDatagrid from './dots-datagrid';

const QUERY_AGENT_PARAMS = `where: $where`;
const QUERY_TARGET_PARAMS = `skip: $skip, take: $take`;

function findLinkedArgs(agent: string, target: string, lang = false) {
  const Agent = ucFirst(agent);
  const Target = ucFirst(target);
  let output = `
    $where: ${Agent}WhereUniqueInput!,
    $take: Int! = 10,
    $skip: Int! = 0,
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
  (agent: string, target: string) =>
  (query: string, lang = false) => {
    const Agent = ucFirst(agent);
    return gql`
      query Get${Agent}(${findLinkedArgs(agent, target, lang)}) {
        ${agent}(${QUERY_AGENT_PARAMS}) {
          ${target}(${QUERY_TARGET_PARAMS}) {
            ${query}
          }
        }
      }
    `;
  };

function DotsDialogRelationship(props) {
  const { agent, filterAgent, target, filter } = props;

  // 1. Find all filtered ids
  const FindOne = findLinkedBuilder(agent, target);
  const idsQuery = useMemo(
    () => FindOne('id quantity article { id condition { code } }'),
    [FindOne]
  );

  // 2. Search entityName where id in ids

  return (
    <DotsDatagrid
      entityName={target}
      variant="preview"
      filter={filterAgent}
      columns={[{ field: 'id', headerName: 'ID' }]}
      rowsQuery={idsQuery}
      rowsGetter={(data) => data?.storage?.stockUnits || []}
      aggregateQuery={idsQuery}
      aggregateGetter={(data) => 12}
    />
  );
}

export default DotsDialogRelationship;
