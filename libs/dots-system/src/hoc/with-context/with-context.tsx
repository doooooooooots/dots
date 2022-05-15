import { FC } from 'react';
import ENTITIES, { EntityKey } from '../../schemas';
import { EntitySchema } from '../../schemas/index.d';

type ComponentWithContextType = FC<unknown & { context?: EntitySchema }>;

const withContext =
  (singular: EntityKey) =>
  (Component: ComponentWithContextType): ComponentWithContextType => {
    const context = ENTITIES[singular];
    const ComponentWithContext: ComponentWithContextType = (props) => {
      return <Component {...props} context={context} />;
    };
    return ComponentWithContext;
  };

export default withContext;
