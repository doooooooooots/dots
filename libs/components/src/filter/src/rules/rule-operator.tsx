import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, StyledOption } from '../../../input';

import {
  IS_EMPTY,
  IS_NOT_EMPTY,
  NULL,
  OPERATORS,
  TIMESTAMP,
} from '../../constants';

const RuleOperator = (props) => {
  const { operator, onChange, updateValue, variant = TIMESTAMP } = props;
  const { t } = useTranslation('common');

  const handleChange = (newValue) => {
    switch (newValue) {
      case IS_EMPTY:
      case IS_NOT_EMPTY:
        updateValue(NULL);
        break;
      default:
        break;
    }
    onChange(newValue);
  };

  return (
    <Select
      name="operator"
      defaultValue="between"
      value={operator}
      size="small"
      onChange={handleChange}
    >
      {OPERATORS[variant].map((_operator) => (
        <StyledOption key={_operator} value={_operator}>
          {t(`${_operator}`)}
        </StyledOption>
      ))}
    </Select>
  );
};

export default RuleOperator;
