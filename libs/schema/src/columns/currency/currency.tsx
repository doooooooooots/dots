import { ColumnConfigType } from '../types/column-config-type';

const currency = (): ColumnConfigType => ({
  width: 210,
  dataType: 'number',
});

export default currency;
