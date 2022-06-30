import { ColumnConfigType } from '../types/column-config-type';

const date = (): ColumnConfigType => ({
  width: 210,
  valueGetter: ({ value }) => value && new Date(value),
  dataType: 'date',
});

export default date;
