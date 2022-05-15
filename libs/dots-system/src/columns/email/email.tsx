import { GridColDef } from '@mui/x-data-grid-pro';
import withMiddleware from '../middlewares/with-middleware';
import { DotsColumnProps } from '../types';

const email = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'string',
});

export default withMiddleware(email);
