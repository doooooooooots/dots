import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, StyledOption } from '../../../input';

const RuleValueSelectMultiple = (props) => {
  const { value, onChange } = props;
  const { t } = useTranslation('common');

  return (
    <Select
      size="small"
      value={value}
      onChange={onChange}
      sx={{
        mb: 1,
      }}
    >
      {values.map((_value) => (
        <StyledOption key={_value} value={_value}>
          {t(`${_value}`)}
        </StyledOption>
      ))}
    </Select>
  );
};

export default RuleValueSelectMultiple;
