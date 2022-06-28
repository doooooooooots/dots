import { BaseFieldConfig } from '../../types/field';

type TimestampFieldType = BaseFieldConfig;

function timestamp(args: TimestampFieldType) {
  return {
    type: 'date',
    ...args,
  };
}

export default timestamp;
