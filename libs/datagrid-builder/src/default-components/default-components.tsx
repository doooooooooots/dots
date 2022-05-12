import MainDatagrid from './components/datagrid';
import MainFilterbar from './components/filterbar';
import MainPagination from './components/pagination';
import MainViews from './components/views';
import ToolbarData from './components/toolbar';
import MainDialogs from './components/dialogs';
import MainCards from './components/cards';
import Topbar from './components/topbar';

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
