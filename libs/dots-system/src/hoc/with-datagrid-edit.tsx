import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import BackupIcon from '@mui/icons-material/BackupOutlined';
import {
  GridRowModesModel,
  GridRowModes,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid-pro';
import { useConfirmDialog } from '@dots.cool/hooks';
import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { DialogConfirm } from '@dots.cool/components';
import DatagridDialogContent from '../components/dialog/dialog';

export default function withEditMode(Component: any) {
  const DatagridWithEditMode = (props: any) => {
    const {
      rows,
      columns: _columns,
      query,
      onSubmitCallBack,
      entityName,
      ...other
    } = props;

    //* Use dialog options to print confirmation modals
    const { action, target, onOpen, onClose } = useConfirmDialog(); // Form modal actions

    //* Keep local copy of edit/view modes
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
      {}
    );

    const handleRowEditStart = (
      params: GridRowParams,
      event: MuiEvent<React.SyntheticEvent>
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (
      params,
      event
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id: GridRowId) => () => {
      const editedRow = rows.find((row: any) => row.id === id);
      onOpen(GRAPHQL_ACTIONS.UpdateOne, editedRow);
      // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handlePublishClick = (id: GridRowId) => () => {
      const editedRow = rows.find((row: any) => row.id === id);
      onOpen(GRAPHQL_ACTIONS.PublishOne, editedRow);
    };

    const handleDeleteClick = (id: GridRowId) => () => {
      const editedRow = rows.find((row: any) => row.id === id);
      onOpen(GRAPHQL_ACTIONS.DeleteOne, editedRow);
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };

    const processRowUpdate = (newRow: GridRowModel) => {
      const updatedRow = { ...newRow, isNew: false };
      console.log('processUpdate', newRow);
      return updatedRow;
    };

    // Generate column list
    const columns: GridColumns = [
      ..._columns,
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 170,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="primary"
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<BackupIcon />}
              label="Publish"
              className="textPrimary"
              onClick={handlePublishClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];

    return (
      <>
        <Component
          {...other}
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
        <DialogConfirm open={!!action} onClose={onClose}>
          {action && (
            <DatagridDialogContent
              entityName={entityName}
              target={target}
              open={action}
              onSubmitCallback={onSubmitCallBack}
              onClose={onClose}
            />
          )}
        </DialogConfirm>
      </>
    );
  };

  return DatagridWithEditMode;
}
