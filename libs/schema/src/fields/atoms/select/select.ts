import * as columns from '../../../columns';
import * as forms from '@dots.cool/form-builder';
import * as yup from 'yup';

import {
  hasUiColumn,
  addUiColumn,
  hasValidation,
  addValidation,
  hasDefaultValue,
  addDefaultValue,
  addUiInput,
  hasUiInput,
  initField,
} from '../../builder';

import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig } from '../../../types/field';

type SelectFieldType = BaseFieldConfig & {
  options: string;
};

function select(args: SelectFieldType) {
  return {
    type: 'select',
    ...args,
  };
}

export default select;

// //* SELECT
// const select = (config) => {
//   initField(config);

//   const { variant } = config;

//   //-> init all required properties
//   if (!hasUiInput(config)) addUiInput(config, forms.select({}));
//   if (!hasUiColumn(config))
//     addUiColumn(config, columns.select({ variant: variant || 'text' }));

//   config.type = FIELD_TYPES.select;
//   return config;
// };
