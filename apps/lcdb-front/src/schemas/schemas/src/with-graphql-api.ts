import { createGraphQlApi } from '@keystone-nx/schema--to-delete';
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
