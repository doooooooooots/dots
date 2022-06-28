import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize = require('pluralize');

function searchManyArgs(singular: string, lang = false) {
  const Singular = ucFirst(singular);

  let output = `
    $take: Int,
    $skip: Int! = 0,
    $input: String! = "",
    $orderBy: [${Singular}OrderByInput!]! = [],
    $where: [${Singular}WhereInput!]
  `;

  if (lang) {
    output = `
      ${output}
      $lang: String,
    `;
  }
  return output;
}

/**
 * GET MULTIPLE
 */
const searchManyBuilder =
  (singular: string, plurial?: string) =>
  (query: string, seachOn: string[], lang = false) => {
    if (!plurial) plurial = pluralize(singular);
    const Plurial = ucFirst(plurial);
    const _searchOn = seachOn.map(
      (key) => `{${key}: { contains: $input, mode: insensitive }}
      `
    );
    const not = seachOn.map(
      (key) => `{${key}: { equals: "" }}
      `
    );
    const _where = `{
        OR: [${_searchOn}]
        AND: $where,
        NOT: [${not}]
      }
    `;
    return gql`
    query All${Plurial}(${searchManyArgs(singular, lang)}) {
      rows: ${plurial}(
        take:$take,
        skip:$skip,
        orderBy: $orderBy,
        where: ${_where}
      ) {
        id
        ${query}
      }
      count: ${plurial}Count(where: ${_where})
    }
  `;
  };

export default searchManyBuilder;
