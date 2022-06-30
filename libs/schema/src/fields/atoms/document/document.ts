import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const document = (config: BaseFieldConfig) => {
  const type = FIELD_TYPES.document;

  return {
    ...addValidation(yup.string()),
    ...addColumnConfig(columns.text()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default document;
