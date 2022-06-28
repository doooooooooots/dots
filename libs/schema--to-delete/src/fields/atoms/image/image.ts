import { BaseFieldConfig } from '../../../types/field';

type ImageFieldType = BaseFieldConfig;

function image(args: ImageFieldType) {
  return {
    type: 'image',
    ...args,
  };
}

export default image;
