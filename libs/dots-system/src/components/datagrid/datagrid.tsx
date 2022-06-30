/* eslint-disable no-unused-vars */
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import {
  DataGridPro,
  GridEventListener,
  GridEvents,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import React from 'react';
import LoadingOverlay from '../datagrid-loading-overlay';
import MainHeaderColumnPopper from '../header-column-popper/header-column-popper';
import withDatagridEdit from '../../hoc/with-datagrid-edit';

type AnchorElStateFunc = [
  HTMLElement | null,
  React.Dispatch<React.SetStateAction<HTMLElement | null>>
];

function MainDatagrid(props: any) {
  const {
    rows,
    rowHeight,
    columns,
    loading,
    selectionModel,
    onSelectionModelChange,
    // UI
    hideToolbar,
    hideEdition,
    ...other
  } = props;

  const apiRef = useGridApiRef();

  // *Header popper
  const [anchorEl, setAnchorEl] = React.useState(null) as AnchorElStateFunc;

  const handleHeaderColumnClick: GridEventListener<
    GridEvents.columnHeaderClick
  > = ({ field }, event) => {
    if (field !== '__check__') {
      const { currentTarget } = event;
      setAnchorEl(currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <DataGridPro
        apiRef={apiRef}
        rows={rows}
        loading={loading}
        columns={columns}
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        headerHeight={32}
        rowHeight={rowHeight}
        editMode="row"
        paginationMode="server"
        sortingMode="server"
        components={{
          // ...components,
          LoadingOverlay: LoadingOverlay,
          ColumnSortedAscendingIcon: KeyboardArrowDownSharpIcon,
          ColumnSortedDescendingIcon: KeyboardArrowDownSharpIcon,
        }}
        onColumnHeaderClick={handleHeaderColumnClick}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter
        checkboxSelection
        disableSelectionOnClick
        disableColumnMenu
        {...other}
      />
      <MainHeaderColumnPopper anchorEl={anchorEl} onClose={handleClose} />
    </>
  );
}
export default withDatagridEdit(MainDatagrid);
