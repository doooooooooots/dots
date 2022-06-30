import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const checkbox = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.checkbox;

  return {
    ...addValidation(yup.boolean()),
    ...addColumnConfig(columns.checkbox()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default checkbox;
