import { FC } from 'react';
import ENTITIES, { EntityKey } from '../../schemas';
import { EntitySchema } from '../../schemas/index.d';
import schema from '../../schemas/src/schema';

type ComponentWithContextType = FC<unknown & { context?: EntitySchema }>;

const contextCache = {};

const withContext =
  (singular: EntityKey) =>
  (Component: ComponentWithContextType): ComponentWithContextType => {
    let context;

    if (singular in contextCache) {
      context = contextCache[singular];
    } else {
      const schemaConfig = ENTITIES[singular];
      context = schema(schemaConfig);
      contextCache[singular] = context;
    }

    const ComponentWithContext: ComponentWithContextType = (props) => {
      return <Component {...props} context={context} />;
    };
    return ComponentWithContext;
  };

const getContext = (singular) => {
  let context;

  if (singular in contextCache) {
    context = contextCache[singular];
  } else {
    const schemaConfig = ENTITIES[singular];
    context = schema(schemaConfig);
    contextCache[singular] = context;
  }

  return context;
};

export default withContext;
export { withContext, getContext };
