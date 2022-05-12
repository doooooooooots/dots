import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

const QUERY_ONE_PARAMS = `where: $where`;

function findOneArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$where: ${Singular}WhereUniqueInput!`;
}

/**
 * GET MULTIPLE
 */
const findOneBuilder = (singular: string) => (query: string) => {
  const Singular = ucFirst(singular);
  return gql`
      query Get${Singular}(${findOneArgs(singular)}) {
        ${singular}(${QUERY_ONE_PARAMS}) {
          ${query}
        }
      }
    `;
};

export default findOneBuilder;
