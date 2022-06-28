import { BaseFieldConfig } from '../../types/field';

type FloatFieldType = BaseFieldConfig;

function float(args: FloatFieldType) {
  return {
    type: 'number',
    ...args,
  };
}

export default float;
