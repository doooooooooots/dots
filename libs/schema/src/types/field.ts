import { SchemaLike } from 'yup/lib/types';
import { FIELD_TYPES } from '@dots.cool/tokens';

export type BaseFieldConfig = {
  label: string;
  defaultValue?: string;
  isIndexed?: boolean;
  validation?: SchemaLike;
  hideIn?: string[];
};

export type Field = BaseFieldConfig & {
  type: FIELD_TYPES;
};

export interface FormattedFieldInput {
  primary: string;
  secondary: string;
}
