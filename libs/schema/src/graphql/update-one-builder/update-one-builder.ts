import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';

const PARAMS = `
  data: $data
  where: $where
`;

function updateOneArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `
  $data: ${Singular}UpdateInput!,
  $where: ${Singular}WhereUniqueInput!,
`;
}

/**
 * *UPDATE ONE
 */
const updateOneBuilder = (singular: string) => (query: string) => {
  const Singular = ucFirst(singular);
  return gql`
      mutation Update${Singular}(${updateOneArgs(singular)}) {
        update: update${Singular}(${PARAMS}) {
          id
          ${query}
        }
      }
    `;
};

export default updateOneBuilder;
