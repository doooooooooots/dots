import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const select = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.select;

  return {
    ...addValidation(yup.number()),
    ...addColumnConfig(columns.select()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default select;
