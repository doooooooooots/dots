import withSmartFilter from '../with-filter/with-filter';
import withSmartPagination from '../with-pagination/with-pagination';
import withSmartSort from '../with-sort/with-sort';
import withSmartViews from '../with-views/with-views';
import withSmartToolbar from '../with-toolbar/with-toolbar';
import withSmartViewMode from '../with-view-mode/with-view-mode';
import { compose } from '@dots.cool/utils';

const withDotsSystem = compose(
  withSmartPagination,
  withSmartFilter,
  withSmartSort,
  withSmartViews,
  withSmartToolbar,
  withSmartViewMode
);

export default withDotsSystem;
