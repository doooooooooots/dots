import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize from 'pluralize';

const PARAMS = `where: $where`;

function deleteManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$where: [${Singular}WhereUniqueInput!]!`;
}

/**
 * *DELETE MANY
 */
const deleteManyBuilder = (singular: string) => (query: string) => {
  const plurial = pluralize(singular);
  const Plurial = ucFirst(plurial);
  return gql`
      mutation Delete${Plurial}(${deleteManyArgs(singular)}) {
        deletes: delete${Plurial}(${PARAMS}) {
          id
          ${query}
        }
      }
    `;
};

export default deleteManyBuilder;
