import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';

const QUERY_ONE_PARAMS = `where: $where`;

function findOneArgs(singular: string, lang = false) {
  const Singular = ucFirst(singular);
  let output = `$where: ${Singular}WhereUniqueInput!`;

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
const findOneBuilder =
  (singular: string) =>
  (query: string, lang = false) => {
    const Singular = ucFirst(singular);
    return gql`
      query Get${Singular}(${findOneArgs(singular, lang)}) {
        entity: ${singular}(${QUERY_ONE_PARAMS}) {
          ${query}
        }
      }
    `;
  };

export default findOneBuilder;
