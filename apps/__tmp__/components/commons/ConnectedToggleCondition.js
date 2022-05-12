import React from 'react';
import { setValue } from '_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import ToggleCondition from '@components/toggle-condition-chips';

const selector = (state) => state.filter;

export default function ConnectedToggleCondition() {
  const dispatch = useDispatch();
  const { conditionIn } = useSelector(selector);

  const handleConditionChange = (_, newValue) => {
    dispatch(setValue('conditionIn', newValue));
  };

  return <ToggleCondition value={conditionIn} onChange={handleConditionChange} />;
}
