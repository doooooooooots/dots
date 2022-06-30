import { ColumnConfigType } from '../types/column-config-type';

const number = (): ColumnConfigType => ({
  width: 110,
  dataType: 'number',
});

export default number;
