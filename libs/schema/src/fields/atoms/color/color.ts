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

import { BaseFieldConfig, Field } from '../../../types/field';
type ColorFieldType = BaseFieldConfig;

function color(config: ColorFieldType): Field {
  return {
    ...config,
    type: FIELD_TYPES.color,
  };
}

export default color;
