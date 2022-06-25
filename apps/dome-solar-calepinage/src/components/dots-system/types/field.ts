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
  type?: FieldTypes;
  label: string;
};
