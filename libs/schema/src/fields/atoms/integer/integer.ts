import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const integer = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.integer;

  return {
    ...addValidation(yup.number().integer()),
    ...addColumnConfig(columns.number()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default integer;
