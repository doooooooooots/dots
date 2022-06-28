import { GridColDef } from '@mui/x-data-grid-pro';
import withMiddleware from '../middlewares/with-middleware';
import { DotsColumnProps } from '../types';

const date = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'date',
});

export default withMiddleware(date);
