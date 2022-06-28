import withMiddleware from '../middlewares/with-middleware';
import { DotsColumnProps } from '../types';

const checkbox = (props: DotsColumnProps) => ({
  ...props,
  type: 'boolean',
});

export default withMiddleware(checkbox);
