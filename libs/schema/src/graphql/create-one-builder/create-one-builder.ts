import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';

const PARAMS = `data: $data`;

function createOneArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$data: ${Singular}CreateInput!`;
}

/**
 * *CREATE ONE
 */
const createOneBuilder = (singular: string) => (query: string) => {
  const Singular = ucFirst(singular);
  return gql`
      mutation Create${Singular}(${createOneArgs(singular)}) {
        create: create${Singular}(${PARAMS}) {
          id
          ${query}
        }
      }
    `;
};

export default createOneBuilder;
