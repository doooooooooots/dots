import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

const timestamp = (props: DotsColumnProps): GridColDef => ({
  ...props,
  type: 'dateTime',
});

export default withMiddleware(timestamp);
