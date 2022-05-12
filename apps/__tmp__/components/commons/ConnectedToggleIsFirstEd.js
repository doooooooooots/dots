import React from 'react';
import { setValue } from '../../_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import ToggleIsFirstEd from './ToggleIsFirstEd';

const selector = (state) => state.filter;

export default function ConnectedToggleIsFirstEd(props) {
  const dispatch = useDispatch();
  const { isFirstEd } = useSelector(selector);

  const handleIsFirstEdChange = (_, newValue) => {
    dispatch(setValue('isFirstEd', newValue));
  };

  return <ToggleIsFirstEd value={isFirstEd} onChange={handleIsFirstEdChange} {...props} />;
}
