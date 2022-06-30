import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, StyledOption } from '../../../input';

const values = ['ham', 'stram', 'gram', 'pick'];

const RuleValueSelect = (props) => {
  console.log(props);
  const { value, onChange } = props;
  const { t } = useTranslation('common');

  return (
    <Select size="small" value={value} onChange={onChange}>
      {values.map((_value) => (
        <StyledOption key={_value} value={_value}>
          {t(`${_value}`)}
        </StyledOption>
      ))}
    </Select>
  );
};

export default RuleValueSelect;
