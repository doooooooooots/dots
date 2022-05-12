import withSmartFilter from '../witf-smart-filter/with-smart-filter';
import withSmartPagination from '../with-smart-pagination/with-smart-pagination';
import withSmartSort from '../with-smart-sort/with-smart-sort';
import withSmartViews from '../with-smart-views/with-smart-views';
import withSmartToolbar from '../with-smart-toolbar/with-smart-toolbar';
import withSmartViewMode from '../with-smart-view-mode/with-smart-view-mode';
import withSmartHistory from '../with-smart-history';
import { compose } from '@dots.cool/utils';

const withSmartness = compose(
  withSmartPagination,
  withSmartFilter,
  withSmartSort,
  withSmartViews,
  withSmartToolbar,
  withSmartViewMode,
  withSmartHistory
);

export default withSmartness;
