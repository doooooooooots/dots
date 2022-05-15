import { GridColDef } from '@mui/x-data-grid-pro';

export type DotsColumnProps = GridColDef & {
  field: string;
  query?: string;
};
