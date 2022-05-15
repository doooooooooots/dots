import { GridColDef, GridColumns } from '@mui/x-data-grid-pro';

const extractColumns = (
  columns: { [columnName: string]: GridColDef },
  columnNames: string[],
  exclude: string[] = []
): GridColumns<GridColDef> => {
  const output: GridColumns<GridColDef> = [];
  columnNames.forEach((columnName: string) => {
    if (!exclude.includes(columnName)) {
      if (columnName in columns) {
        output.push(columns[columnName]);
      } else {
        output.push({ field: columnName, headerName: columnName });
      }
    }
  });
  return output.filter((i) => i);
};

export default extractColumns;
