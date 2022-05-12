import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '_trash/store/store';
import { setValue } from '../../_trash/slices/app';
import SelectOperator from '@components/SelectOperator';

const selector = (state) => state.app.operator;

export default function SelectOperatorConnected(props) {
  const { label } = props;
  const dispatch = useDispatch();
  const operator = useSelector(selector);

  const handleOperatorChange = React.useCallback(
    (e) => {
      dispatch(setValue('operator', e.target.value));
      localStorage.setItem('operator', e.target.value);
    },
    [dispatch]
  );

  useEffect(() => {
    const operator = localStorage.getItem('operator');
    dispatch(setValue('operator', operator));
  }, [dispatch]);

  return <SelectOperator label={label} value={operator} onChange={handleOperatorChange} />;
}
