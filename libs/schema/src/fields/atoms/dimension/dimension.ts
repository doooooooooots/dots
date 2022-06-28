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
type DimensionFieldType = BaseFieldConfig;

function dimension(config: DimensionFieldType): Field {
  return {
    ...config,
    type: FIELD_TYPES.dimension,
  };
}

export default dimension;
