import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { Select, StyledOption } from '../../../input';
import {
  DEFAULT,
  IS_NOT_WITHIN,
  IS_WITHIN,
  TIMESTAMP_RELATIVE_VALUES,
} from '../../constants';

function RuleValueDate(props) {
  const { operator, value, onChange } = props;
  const { t } = useTranslation('common');

  const namespace = useMemo(() => {
    if ([IS_WITHIN, IS_NOT_WITHIN].includes(operator)) {
      return IS_WITHIN;
    }
    return DEFAULT;
  }, [operator]);

  return (
    <Select size="small" value={value} onChange={onChange}>
      {TIMESTAMP_RELATIVE_VALUES[namespace]?.map((_value) => (
        <StyledOption key={_value} value={_value}>
          {t(`${_value}`)}
        </StyledOption>
      ))}
    </Select>
  );
}

export default RuleValueDate;
