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
type DocumentFieldType = BaseFieldConfig;

//* DOCUMENT
const document = (config: DocumentFieldType): Field => {
  return {
    ...config,
    type: FIELD_TYPES.document,
  };
};

export default document;
