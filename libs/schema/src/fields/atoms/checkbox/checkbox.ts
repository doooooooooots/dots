import * as columns from '../../../columns';
import * as forms from '@dots.cool/form-builder';
import * as yup from 'yup';

import { FIELD_TYPES } from '@dots.cool/tokens';

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

import { BaseFieldConfig } from '../../../types/field';
type CheckboxFieldType = BaseFieldConfig;

function checkbox(config: CheckboxFieldType) {
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.checkbox({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.checkbox({}));
  if (!hasValidation(config)) addValidation(config, yup.boolean());
  if (!hasDefaultValue(config)) addDefaultValue(config, false);

  return {
    ...config,
    type: FIELD_TYPES.checkbox,
  };
}

export default checkbox;
