import { ColumnConfigType } from '../types/column-config-type';

const timestamp = (): ColumnConfigType => ({
  width: 250,
  valueGetter: ({ value }) => value && new Date(value),
  dataType: 'dateTime',
});

export default timestamp;
