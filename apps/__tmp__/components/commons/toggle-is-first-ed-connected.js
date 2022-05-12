import React from 'react';
import { setValue } from '_trash/slices/filter';
import { useDispatch, useSelector } from '_trash/store/store';
import ToggleIsFirstEd from './ToggleIsFirstEd';

const selector = (state) => state.filter.isFirstEd;

export default function ToggleIsFirstEdConnected(props) {
  const { ...other } = props;

  const dispatch = useDispatch();
  const isFirstEd = useSelector(selector);

  const handleChange = (_, newValue) => {
    dispatch(setValue('isFirstEd', newValue));
  };

  return <ToggleIsFirstEd value={isFirstEd} onChange={handleChange} {...other} />;
}
