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

import { BaseFieldConfig, Field } from '../../../types/field';
type TextFieldType = BaseFieldConfig;

//* TEXT
const text = (config: TextFieldType): Field => {
  //-> make sure all is ok
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.textField({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.text({}));
  if (!hasValidation(config)) addValidation(config, yup.string());
  if (!hasDefaultValue(config)) addDefaultValue(config, '');

  return {
    ...config,
    type: FIELD_TYPES.text,
  };
};

export default text;
