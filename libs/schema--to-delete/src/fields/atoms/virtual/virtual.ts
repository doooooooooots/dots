import { BaseFieldConfig } from '../../../types/field';

type VirtualFieldType = BaseFieldConfig;

function virtual(args: VirtualFieldType) {
  return {
    type: 'virtual',
    ...args,
  };
}

export default virtual;
