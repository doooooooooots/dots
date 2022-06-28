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
type ImageFieldType = BaseFieldConfig;

function image(config: ImageFieldType): Field {
  initField(config);

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.imageInput({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.image({}));

  return {
    ...config,
    type: FIELD_TYPES.image,
  };
}

export default image;
