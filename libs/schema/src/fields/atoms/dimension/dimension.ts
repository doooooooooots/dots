import { BaseFieldConfig } from '../../../types/field';

type DimensionFieldType = BaseFieldConfig;

function dimension(args: DimensionFieldType) {
  return {
    type: 'dimension',
    ...args,
  };
}

export default dimension;
