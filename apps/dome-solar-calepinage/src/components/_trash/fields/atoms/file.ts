import { BaseFieldConfig } from '../../types/field';

type FileFieldType = BaseFieldConfig;

function file(args: FileFieldType) {
  return {
    type: 'file',
    ...args,
  };
}

export default file;
