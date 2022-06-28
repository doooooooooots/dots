import { gql } from '@apollo/client';
import { ucFirst } from '@dots.cool/utils';
import pluralize from 'pluralize';

const CountBuilder = (singular: string) => () => {
  const Singular = ucFirst(singular);
  const plurial = pluralize(singular);
  const Plurial = ucFirst(plurial);

  return gql`
  query Aggregates${Plurial}Count($where: ${Singular}WhereInput! = {}) {
    aggregates: ${plurial}Count(where: $where)
  }
`;
};

export default CountBuilder;
