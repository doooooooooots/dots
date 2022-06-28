import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';

const PARAMS = `data: $data`;

function updateManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$data: [${Singular}UpdateArgs!]!`;
}

/**
 * *UPDATE MANY
 */
const updateManyBuilder =
  (singular: string, plurial: string) => (query: string) => {
    const Plurial = ucFirst(plurial);
    return gql`
      mutation Update${Plurial}(${updateManyArgs(singular)}) {
        update${Plurial}(${PARAMS}) {
          ${query}
        }
      }
    `;
  };

export default updateManyBuilder;
