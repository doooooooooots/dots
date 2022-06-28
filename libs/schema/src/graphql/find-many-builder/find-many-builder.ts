import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize from 'pluralize';

const PARAMS = `
  take: $take,
  skip: $skip,
  where: $where,
  orderBy: $orderBy
`;

const PARAMS_COUNT = `where: $where`;

function findManyArgs(singular: string, lang = false) {
  const Singular = ucFirst(singular);

  let output = `
    $take: Int,
    $skip: Int! = 0,
    $where: ${Singular}WhereInput! = {},
    $orderBy: [${Singular}OrderByInput!]! = [],
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
const findManyBuilder =
  (singular: string) =>
  (query: string, lang = false) => {
    const plurial = pluralize(singular);
    const Plurial = ucFirst(plurial);
    return gql`
    query All${Plurial}(${findManyArgs(singular, lang)}) {
      rows: ${plurial}(${PARAMS}) {
        id
        ${query}
      }
      count: ${plurial}Count(${PARAMS_COUNT})
    }
  `;
  };

export default findManyBuilder;
