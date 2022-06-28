import { BaseFieldConfig } from '../../types/field';

type TextFieldType = BaseFieldConfig;

function text(args: TextFieldType) {
  return {
    type: 'text',
    ...args,
  };
}

export default text;
