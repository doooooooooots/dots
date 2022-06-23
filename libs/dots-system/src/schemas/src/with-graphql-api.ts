import { createGraphQlApi } from '@dots.cool/schemas';
import { EntitySchemaEnhanced } from '../index.d';

const withGraphQlApi = (schema: EntitySchemaEnhanced) => {
  const { singular } = schema;
  const graphql = createGraphQlApi(singular);
  return {
    ...schema,
    graphql,
  };
};

export default withGraphQlApi;
