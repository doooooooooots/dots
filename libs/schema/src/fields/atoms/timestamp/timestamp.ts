import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';
type TimestampFieldType = BaseFieldConfig;

//* TIMESTAMP
const timestamp = (config: TimestampFieldType) => {
  const type = FIELD_TYPES.timestamp;

  return {
    ...addValidation(yup.date()),
    ...addColumnConfig(columns.timestamp()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default timestamp;
