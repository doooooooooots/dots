export interface EntityType {
  id: string;
}

export function initField(field: any) {
  if (!field) throw new Error('Props are required');
  if (!('ui' in field)) field.ui = {};
}

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

export function addUiInput(config: any, input: any) {
  config.ui.input = input;
}

export function addUiColumn(config: any, column: any) {
  config.ui.column = column;
}

export function addValidation(config: any, validation: any) {
  config.validation = validation;
}

export function addDefaultValue(config: any, defaultValue: any) {
  config.defaultValue = defaultValue;
}
