import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import withMiddleware from '../middlewares/with-middleware';

type selectProps = DotsColumnProps & {
  multiple: boolean;
};

const select = ({ multiple, ...props }: selectProps): GridColDef => {
  if (multiple === true) return { ...props, type: 'string' };
  return { ...props, type: 'singleSelect' };
};

export default withMiddleware(select);
