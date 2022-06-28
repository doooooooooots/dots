import * as columns from '../columns';
import * as forms from '@dots.cool/form-builder';
import * as yup from 'yup';
import { isArray } from 'lodash';
import { FIELD_TYPES, GRAPHQL_REQUESTS } from '@dots.cool/tokens';

const CREATE_ONE = GRAPHQL_REQUESTS.CreateOne;
const CREATE_MANY = GRAPHQL_REQUESTS.CreateOne;

interface EntityType {
  id: string;
}

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
function hasFormatData(config: any) {
  return typeof config?.formatData === 'function';
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

// [ ](Adrien): Create config for all default keys (i.e input|column|validation|...)
//* CHECKBOX
const checkbox = (config: any) => {
  //-> make sure all is ok
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.checkbox({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.checkbox({}));
  if (!hasValidation(config)) addValidation(config, yup.boolean());
  if (!hasDefaultValue(config)) addDefaultValue(config, false);

  config.type = FIELD_TYPES.checkbox;
  return config;
};

//* TEXT
const text = (config) => {
  //-> make sure all is ok
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.textField({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.text({}));
  if (!hasValidation(config)) addValidation(config, yup.string());
  if (!hasDefaultValue(config)) addDefaultValue(config, '');

  config.type = FIELD_TYPES.text;
  return config;
};

//* TIMESTAMP
const timestamp = (config) => {
  initField(config);
  const { hideIn = [] } = config;

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.textField({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.timestamp({}));
  if (!hasValidation(config)) addValidation(config, yup.string());

  config.hideIn = [...hideIn, CREATE_ONE, CREATE_MANY];
  config.type = FIELD_TYPES.timestamp;
  return config;
};

//* RELATIONSHIP
const relationship = (config) => {
  //? Create basic fields if missing
  initField(config);

  const { ref, many, ui } = config;

  const isManyRelationShip = !(many === false);
  const { columnField } = ui;

  //? Add default input
  if (!hasUiInput(config))
    addUiInput(
      config,
      forms.autocompleteWithForm({
        multiple: isManyRelationShip,
      })
    );

  //? Add default columns
  if (!hasUiColumn(config)) {
    if (!isManyRelationShip) {
      addUiColumn(
        config,
        columns.relationshipSingle({
          target: ref,
          indexColumn: columnField,
        })
      );
    } else {
      config.query = (plurial: string) => `${plurial}Count`;
      addUiColumn(
        config,
        columns.relationshipMany({
          target: ref,
        })
      );
    }
  }

  //? Add default formatting data (runs before submit)
  if (!hasFormatData(config)) {
    if (!isManyRelationShip) {
      config.formatData =
        (fieldName: string) => (data: { [fieldName: string]: unknown }) => {
          if (fieldName in data) {
            data[fieldName] = {
              connect: { id: (data[fieldName] as { id: string }).id },
            };
          }
          return data;
        };
    } else {
      config.formatData =
        (fieldName: string) =>
        (data: { [fieldName: string]: string | object | object[] }) => {
          if (fieldName in data && isArray(data[fieldName])) {
            data[fieldName] = {
              connect: (data[fieldName] as Array<{ id: string }>).map(
                ({ id }: EntityType) => ({
                  id,
                })
              ),
            };
          }
          return data;
        };
    }
  }

  //? Force sortable to be false (graphQL APIs does not allow linked data sort)
  config.sortable = false;

  // if (!hasValidation(config)) addValidation(config, yup.boolean());
  // if (!hasDefaultValue(config)) addDefaultValue(config, false);

  config.many = isManyRelationShip;
  config.type = FIELD_TYPES.relationship;
  return config;
};

//* SELECT
const select = (config) => {
  initField(config);

  const { variant } = config;

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.select({}));
  if (!hasUiColumn(config))
    addUiColumn(config, columns.select({ variant: variant || 'text' }));

  config.type = FIELD_TYPES.select;
  return config;
};

//* JSON
const json = (config) => {
  config.type = FIELD_TYPES.json;
  return config;
};

//* FLOAT
const float = (config) => {
  config.type = FIELD_TYPES.float;
  return config;
};

//* DECIMAL
const decimal = (config) => {
  config.type = FIELD_TYPES.decimal;
  return config;
};

//* PASSWORD
const password = (config) => {
  config.type = FIELD_TYPES.password;
  return config;
};

//* VIRTUAL
const virtual = (config) => {
  config.type = FIELD_TYPES.virtual;
  return config;
};

//* FILE
const file = (config) => {
  config.type = FIELD_TYPES.file;
  return config;
};

//* IMAGE
const image = (config) => {
  //-> make sure all is ok
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.imageInput({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.image({}));

  config.type = FIELD_TYPES.image;
  return config;
};

//* DOCUMENT
const document = (config) => {
  config.type = FIELD_TYPES.document;
  return config;
};

export {
  checkbox,
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
