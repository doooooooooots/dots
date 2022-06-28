import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

const people = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'string',
});

export default withMiddleware(people);
