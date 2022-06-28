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

import { FIELD_TYPES, GRAPHQL_ACTIONS } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';
const { CreateOne, CreateMany } = GRAPHQL_ACTIONS;
type TimestampFieldType = BaseFieldConfig;

//* TIMESTAMP
const timestamp = (config: TimestampFieldType): Field => {
  initField(config);
  const { hideIn = [] } = config;

  //-> init all required properties
  if (!hasUiInput(config)) addUiInput(config, forms.textField({}));
  if (!hasUiColumn(config)) addUiColumn(config, columns.timestamp({}));
  if (!hasValidation(config)) addValidation(config, yup.string());

  config.hideIn = [...hideIn, CreateOne, CreateMany];

  return {
    ...config,
    type: FIELD_TYPES.timestamp,
  };
};

export default timestamp;
