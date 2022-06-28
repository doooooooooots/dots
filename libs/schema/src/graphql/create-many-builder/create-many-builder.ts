import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize from 'pluralize';

const PARAMS = `data: $data`;

function createManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$data: [${Singular}CreateInput!]!`;
}

/**
 * *CREATE MANY
 */
const createManyBuilder = (singular: string) => (query: string) => {
  const plurial = pluralize(singular);
  const Plurial = ucFirst(plurial);
  return gql`
      mutation Create${Plurial}(${createManyArgs(singular)}) {
        creates: create${Plurial}(${PARAMS}) {
          id
          ${query}
        }
      }
    `;
};

export default createManyBuilder;
