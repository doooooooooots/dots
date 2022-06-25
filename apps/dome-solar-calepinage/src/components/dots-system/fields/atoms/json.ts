import { BaseFieldConfig } from '../../types/field';

type JsonFieldType = BaseFieldConfig;

function json(args: JsonFieldType) {
  return {
    type: 'json',
    ...args,
  };
}

export default json;
