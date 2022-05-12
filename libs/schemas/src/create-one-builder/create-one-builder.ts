import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

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
        create${Singular}(${PARAMS}) {
          ${query}
        }
      }
    `;
};

export default createOneBuilder;
