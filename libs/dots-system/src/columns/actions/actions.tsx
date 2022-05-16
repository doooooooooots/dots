import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';

const actions = (props: DotsColumnProps): GridColDef => ({
  ...props,
  flex: 1,
  type: 'actions',
});

export default actions;
