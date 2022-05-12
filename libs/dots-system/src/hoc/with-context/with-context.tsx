import { createSchema } from '@dots.cool/schemas';
import ENTITIES, { EntityKey } from '../../schemas';

const withContext = (singular: EntityKey) => (Component: any) => {
  const { plurial } = ENTITIES[singular];
  const context = createSchema(singular, plurial);
  const ComponentWithContext = (props: JSX.IntrinsicAttributes) => {
    return <Component {...props} context={context} />;
  };
  return ComponentWithContext;
};

export default withContext;
