import { gql } from '@apollo/client';
import ucFirst from '../utils/uc-first';

const CountBuilder = (singular: string, plurial: string) => () => {
  const Singular = ucFirst(singular);
  const Plurial = ucFirst(plurial);

  return gql`
  query Aggregates${Plurial}Count($where: ${Singular}WhereInput! = {}) {
    ${plurial}Count(where: $where)
  }
`;
};

export default CountBuilder;
