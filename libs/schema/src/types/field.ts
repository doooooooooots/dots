import { GridColDef, GridNativeColTypes } from '@mui/x-data-grid-pro';
import { SchemaLike } from 'yup/lib/types';
import { FIELD_TYPES } from '@dots.cool/tokens';

export interface BaseFieldConfig extends Omit<GridColDef, 'field' | 'type'> {
  label: string;
  defaultValue?: string;
  isIndexed?: boolean;
  validation?: SchemaLike;
  hideIn?: string[];
  options?: string;
}

export interface Field extends BaseFieldConfig {
  field: string;
  type: FIELD_TYPES;
  dataType: GridNativeColTypes;
}

export type FieldDefinitions<T extends string> = Record<T, Field>;
