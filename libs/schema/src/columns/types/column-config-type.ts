import { GridColDef, GridNativeColTypes } from '@mui/x-data-grid-pro';

export type ColumnConfigType = Partial<GridColDef> & {
  dataType: GridNativeColTypes;
};
