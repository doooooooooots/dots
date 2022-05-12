import withSmartPagination from 'src/hoc/with-smart-pagination';
import compose from '@utils/compose';
import withSmartFilter from 'src/hoc/with-smart-filter';
import withSmartSort from 'src/hoc/with-smart-sort';
import withSmartViews from 'src/hoc/with-smart-views';

const withSmartness = compose(withSmartPagination, withSmartFilter, withSmartSort, withSmartViews);

export default withSmartness;
