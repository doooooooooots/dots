import { BaseFieldConfig } from '../../../types/field';

type CheckboxFieldType = BaseFieldConfig;

function color(args: CheckboxFieldType) {
  return {
    type: 'text',
    ...args,
  };
}

export default color;
