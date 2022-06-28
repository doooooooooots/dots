import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';

const PARAMS = `where: $where`;

function deleteOneArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$where: ${Singular}WhereUniqueInput!`;
}

/**
 * *DELETE ONE
 */
const deleteOneBuilder = (singular: string) => (query: string) => {
  const Singular = ucFirst(singular);
  return gql`
      mutation Delete${Singular}(${deleteOneArgs(singular)}) {
        delete${Singular}(${PARAMS}) {
          ${query}
        }
      }
    `;
};

export default deleteOneBuilder;
