import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

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
        update${Singular}(${PARAMS}) {
          ${query}
        }
      }
    `;
};

export default updateOneBuilder;
