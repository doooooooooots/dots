import * as columns from '../../../columns';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const virtual = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.virtual;

  return {
    ...addValidation(),
    ...addColumnConfig(columns.text()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default virtual;
