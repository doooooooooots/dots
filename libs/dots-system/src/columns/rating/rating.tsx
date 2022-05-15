import { GridColDef } from '@mui/x-data-grid-pro';
import { DotsColumnProps } from '../types';
import { renderRating, renderRatingEditInputCell } from './RatingEditInputCell';
import withMiddleware from '../middlewares/with-middleware';

const rating = (props: DotsColumnProps): GridColDef => ({
  width: 180,
  ...props,
  renderCell: renderRating,
  renderEditCell: renderRatingEditInputCell,
  editable: true,
  type: 'number',
});

export default withMiddleware(rating);
