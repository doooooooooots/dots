import * as columns from '../../columns';
import * as forms from '@dots.cool/form-builder';
import * as yup from 'yup';

function initField(field: any) {
  if (!field) throw new Error('Props are required');
  if (!('ui' in field)) field.ui = {};
}
function hasUiColumn(config: any) {
  return !!config?.ui?.column;
}
function hasUiInput(config: any) {
  return !!config?.ui?.input;
}
function hasValidation(config: any) {
  return !!config?.validation;
}
function hasDefaultValue(config: any) {
  return 'defaultValue' in config;
}
function addUiInput(config: any, input: any) {
  config.ui.input = input;
}
function addUiColumn(config: any, column: any) {
  config.ui.column = column;
}
function addValidation(config: any, validation: any) {
  config.validation = validation;
}
function addDefaultValue(config: any, defaultValue: any) {
  config.defaultValue = defaultValue;
}

// complete default values
const checkbox = (config: any) => {
  // make sure all is ok
  initField(config);

  // init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.checkbox({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.checkbox({}));
  if (!hasValidation(config)) addValidation(config, yup.boolean());
  if (!hasDefaultValue(config)) addDefaultValue(config, false);

  return config;
};

const integer = (config) => {
  return config;
};

const json = (config) => {
  return config;
};

const float = (config) => {
  return config;
};

const decimal = (config) => {
  return config;
};

const password = (config) => {
  return config;
};

const select = (config) => {
  return config;
};

const text = (config) => {
  // make sure all is ok
  initField(config);

  // init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.textField({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.text({}));
  if (!hasValidation(config)) addValidation(config, yup.string());
  if (!hasDefaultValue(config)) addDefaultValue(config, '');

  return config;
};

const timestamp = (config) => {
  return config;
};

const relationship = (config) => {
  const { field, query, valueGetter, filterQuery, count = null, many } = config;

  initField(config);

  // init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.autocompleteWithForm({}));
  if (!hasUiColumn(config)) {
    if (many === false) {
      addUiColumn(
        config,
        columns.relationshipSingle({
          valueGetter,
          filterQuery,
        })
      );
    } else {
      addUiColumn(
        config,
        columns.relationshipMany({
          count,
        })
      );
    }
  }
  // if (!hasValidation(config)) addValidation(config, yup.boolean());
  // if (!hasDefaultValue(config)) addDefaultValue(config, false);

  config.sortable = false;
  config.needsContext = true;
  return config;
};

const virtual = (config) => {
  return config;
};

const file = (config) => {
  return config;
};

const image = (config) => {
  return config;
};

const document = (config) => {
  return config;
};

export {
  checkbox,
  integer,
  json,
  float,
  decimal,
  password,
  select,
  text,
  timestamp,
  relationship,
  virtual,
  file,
  image,
  document,
};

// - checkbox
// - integer
// - json
// - float
// - decimal
// - password
// - select
// - text
// - timestamp
// Relationship type
// - relationship
// Virtual type
// - virtual
// File types
// - file
// - image
// Complex types
// - document
// - cloudinaryImage
