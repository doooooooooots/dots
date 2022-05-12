import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

const PARAMS = `data: $data`;

function createManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$data: [${Singular}CreateInput!]!`;
}

/**
 * *CREATE MANY
 */
const createManyBuilder =
  (singular: string, plurial: string) => (query: string) => {
    const Plurial = ucFirst(plurial);
    return gql`
      mutation Create${Plurial}(${createManyArgs(singular)}) {
        create${Plurial}(${PARAMS}) {
          ${query}
        }
      }
    `;
  };

export default createManyBuilder;
