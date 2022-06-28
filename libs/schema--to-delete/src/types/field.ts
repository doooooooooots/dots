import { SchemaLike } from 'yup/lib/types';

type FieldTypes =
  | 'checkbox'
  | 'file'
  | 'float'
  | 'image'
  | 'integer'
  | 'json'
  | 'number'
  | 'password'
  | 'relationship'
  | 'select'
  | 'text'
  | 'timestamps'
  | 'virtual';

export type BaseFieldConfig = {
  label: string;
  type?: FieldTypes;
  defaultValue?: string;
  isIndexed?: boolean;
  validation?: SchemaLike;
};
