import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

const pnl = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'number',
});

export default withMiddleware(pnl);
