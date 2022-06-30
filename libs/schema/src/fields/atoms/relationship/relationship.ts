import * as columns from '../../../columns';
import * as yup from 'yup';

import { addColumnConfig, addValidation, addDefaultValue } from '../../builder';
import { FIELD_TYPES } from '@dots.cool/tokens';

import { BaseFieldConfig, Field } from '../../../types/field';

const relationship = (
  config: BaseFieldConfig & {
    many?: boolean;
  }
) => {
  const { many } = config;
  const type = FIELD_TYPES.relationship;

  return {
    ...addValidation(many ? yup.array() : yup.object()),
    ...addColumnConfig(columns.text()),
    ...addDefaultValue(type),
    ...config,
    type: type,
  } as Field;
};

export default relationship;
