import { BaseFieldConfig } from '../../types/field';

type SelectFieldType = BaseFieldConfig & {
  options: string;
};

function select(args: SelectFieldType) {
  return {
    type: 'text',
    ...args,
  };
}

export default select;
