import { GridColDef } from '@mui/x-data-grid-pro';
import withMiddleware from '../middlewares/with-middleware';
import { DotsColumnProps } from '../types';

const currency = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'number',
});

export default withMiddleware(currency);
