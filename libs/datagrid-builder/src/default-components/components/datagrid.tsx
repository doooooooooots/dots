/* eslint-disable no-unused-vars */
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import {
  DataGridPro,
  GridActionsCellItem,
  GridActionsColDef,
  GridColumns,
  GridEventListener,
  GridEvents,
  useGridApiRef,
} from '@mui/x-data-grid-pro';
import { isFunction } from 'lodash';
import React, { MouseEventHandler } from 'react';
import { useConfirmDialog } from '@dots.cool/hooks';
import LoadingOverlay from '../../loading-overlay';
import MainHeaderColumnPopper from './header-column-popper';

type AnchorElStateFunc = [
  HTMLElement | null,
  React.Dispatch<React.SetStateAction<HTMLElement | null>>
];

type ID = string | number;

function MainDatagrid(props: any) {
  const {
    columns,
    rows,
    actions,
    loading,
    onUpdate,
    selectionModel,
    onSelectionModelChange,
    hideToolbar,
    hideEdition,
    components,
    ...other
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null) as AnchorElStateFunc;

  // TODO(Adrien): understand classList problem
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

  const apiRef = useGridApiRef();
  const { open, onOpen, onActionClick, onClose, action, target } =
    useConfirmDialog();

  // *MEMO -- Columns - add btns
  const _columns = React.useMemo(() => {
    const handleSaveClick =
      (id: ID): MouseEventHandler<HTMLButtonElement> =>
      async (event) => {
        event.stopPropagation();
        // Wait for the validation to run
        const isValid = await apiRef.current.commitRowChange(id);
        if (isValid) {
          apiRef.current.setRowMode(id, 'view');
          const row = apiRef.current.getRow(id);
          if (isFunction(onUpdate)) {
            onUpdate(row).then(() => {
              apiRef.current.updateRows([{ ...row, isNew: false }]);
            });
          } else {
            apiRef.current.updateRows([{ ...row, isNew: false }]);
          }
        }
      };

    const handleCancelClick =
      (id: ID): MouseEventHandler<HTMLButtonElement> =>
      (event) => {
        event.stopPropagation();
        apiRef.current.setEditRowsModel({});
        const row = apiRef.current.getRow(id);
        if (row.isNew) {
          apiRef.current.updateRows([{ id, _action: 'delete' }]);
        }
      };

    const handleEditClick =
      (id: ID): MouseEventHandler<HTMLButtonElement> =>
      (event) => {
        event.stopPropagation();
        apiRef.current.setEditRowsModel({});
        apiRef.current.setRowMode(id, 'edit');
      };

    const handleDeleteClick =
      (id: ID): MouseEventHandler<HTMLLIElement> =>
      (event) => {
        event.stopPropagation();
        onOpen('deleteOne', id);
      };

    const editionCols: GridColumns<GridActionsColDef> = [
      {
        field: 'actions',
        type: 'actions',
        align: 'right',
        flex: 1,
        getActions: (params) => {
          const { id } = params;
          const isInEditMode = apiRef.current.getRowMode(id) === 'edit';

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                key="save"
                icon={<SaveOutlinedIcon />}
                label="Sauvegarder"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                key="cancel"
                icon={<CancelIcon />}
                label="Cancel"
                color="inherit"
                onClick={handleCancelClick(id)}
              />,
            ];
          }

          let additionnalActions = [];

          if (actions && actions.length) {
            additionnalActions = actions.reduce(
              (acc: GridActionsColDef[], item: any) => {
                if (item && item.getActions) {
                  acc.push(...item.getActions(params));
                }
                return acc;
              },
              []
            );
          }

          const output = [
            <GridActionsCellItem
              key="update"
              icon={<EditOutlinedIcon />}
              label="Modifier"
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItem
              key="delete"
              icon={<DeleteIcon />}
              label="Supprimer"
              onClick={handleDeleteClick(id)}
              showInMenu
            />,
            ...additionnalActions,
          ];

          return output;
        },
      },
    ];

    if (hideEdition) return columns;
    return [...columns, ...editionCols];
  }, [columns, apiRef, onUpdate, onOpen, hideEdition, actions]);

  return (
    <>
      <DataGridPro
        apiRef={apiRef}
        rows={rows}
        loading={loading}
        columns={_columns}
        selectionModel={selectionModel}
        onSelectionModelChange={onSelectionModelChange}
        headerHeight={32}
        editMode="row"
        paginationMode="server"
        sortingMode="server"
        components={{
          // ...components,
          LoadingOverlay: LoadingOverlay,
          ColumnSortedAscendingIcon: KeyboardArrowDownSharpIcon,
          ColumnSortedDescendingIcon: KeyboardArrowDownSharpIcon,
        }}
        componentsProps={{ toolbar: { onActionClick } }}
        onColumnHeaderClick={handleHeaderColumnClick}
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
export default React.memo(MainDatagrid);
