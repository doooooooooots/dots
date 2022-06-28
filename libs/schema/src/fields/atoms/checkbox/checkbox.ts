import { BaseFieldConfig } from '../../../types/field';

type CheckboxFieldType = BaseFieldConfig;

function checkbox(args: CheckboxFieldType) {
  return {
    type: 'checkbox',
    ...args,
  };
}

export default checkbox;
