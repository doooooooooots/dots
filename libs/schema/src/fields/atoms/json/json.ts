import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const json = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.json;

  return {
    ...addValidation(yup.object()),
    ...addColumnConfig(columns.text()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default json;
