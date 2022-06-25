import { BaseFieldConfig } from '../../types/field';

type IntegerFieldType = BaseFieldConfig;

function integer(args: IntegerFieldType) {
  return {
    type: 'number',
    ...args,
  };
}

export default integer;
