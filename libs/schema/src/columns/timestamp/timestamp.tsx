import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

const timestamp = (props: DotsColumnProps): GridColDef => ({
  ...props,
  width: 210,
  valueGetter: ({ value }) => value && new Date(value),
  type: 'dateTime',
});

export default withMiddleware(timestamp);
