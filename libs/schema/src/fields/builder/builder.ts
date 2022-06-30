/* eslint-disable @typescript-eslint/no-explicit-any */
import { FIELD_TYPES } from '@dots.cool/tokens';
import { GridColDef } from '@mui/x-data-grid-pro';
import { SchemaLike } from 'yup/lib/types';
import { DEFAULT_VALUES } from '../../default-values';

export interface EntityType {
  id: string;
}

export function initField(field: any) {
  if (!field) throw new Error('Props are required');
}

/**
 * Builders
 */

export function addDefaultValue(type: FIELD_TYPES): {
  defaultValue: unknown;
} {
  if (!(type in DEFAULT_VALUES)) {
    throw new Error(`Type ${type} has no defined default value`);
  }

  return {
    defaultValue: DEFAULT_VALUES[type],
  };
}

export function addColumnConfig(config: Partial<GridColDef>) {
  return { ...config };
}

export function addValidation(validation?: SchemaLike) {
  return {
    validation: validation || null,
  };
}

/**
 * Helpers
 */
export function hasUiColumn(config: any) {
  return !!config?.ui?.column;
}

export function hasUiInput(config: any) {
  return !!config?.ui?.input;
}

export function hasFormatData(config: any) {
  return typeof config?.formatData === 'function';
}

export function hasValidation(config: any) {
  return !!config?.validation;
}

export function hasDefaultValue(config: any) {
  return 'defaultValue' in config;
}
