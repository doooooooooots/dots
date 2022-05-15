import { createGraphQlApi } from '@dots.cool/schemas';
import { EntitySchemaEnhanced } from '../index.d';

const withGraphQlApi = (schema: EntitySchemaEnhanced) => {
  const { singular, plurial } = schema;
  const graphql = createGraphQlApi(singular, plurial);
  return {
    ...schema,
    graphql,
  };
};

export default withGraphQlApi;
