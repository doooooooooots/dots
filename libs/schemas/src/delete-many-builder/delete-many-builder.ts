import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

const PARAMS = `where: $where`;

function deleteManyArgs(singular: string) {
  const Singular = ucFirst(singular);
  return `$where: [${Singular}WhereUniqueInput!]!`;
}

/**
 * *DELETE MANY
 */
const deleteManyBuilder =
  (singular: string, plurial: string) => (query: string) => {
    const Plurial = ucFirst(plurial);
    return gql`
      mutation Delete${Plurial}(${deleteManyArgs(singular)}) {
        delete${Plurial}(${PARAMS}) {
          ${query}
        }
      }
    `;
  };

export default deleteManyBuilder;
