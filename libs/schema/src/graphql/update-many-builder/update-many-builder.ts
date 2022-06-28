import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize from 'pluralize';

const PARAMS = `data: $data`;

function updateManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$data: [${Singular}UpdateArgs!]!`;
}

/**
 * *UPDATE MANY
 */
const updateManyBuilder = (singular: string) => (query: string) => {
  const plurial = pluralize(singular);
  const Plurial = ucFirst(plurial);
  return gql`
      mutation Update${Plurial}(${updateManyArgs(singular)}) {
        updates: update${Plurial}(${PARAMS}) {
          ${query}
        }
      }
    `;
};

export default updateManyBuilder;
