import MainCards from '../cards/cards';
import MainViews from '../views';
import MainFilterbar from '../filterbar';
import MainDatagrid from '../datagrid';
import MainPagination from '../pagination';
import ToolbarData from '../toolbar';
import MainDialogs from '../dialog';
import Topbar from '../topbar';

const defaultComponents = {
  ViewBar: MainViews,
  FilterBar: MainFilterbar,
  Datagrid: MainDatagrid,
  Pagination: MainPagination,
  Toolbar: ToolbarData,
  DialogContent: MainDialogs,
  Cards: MainCards,
  Topbar: Topbar,
};

export default defaultComponents;
