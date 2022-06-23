import React from 'react';
import useEnum from '../../../hooks/use-enums';
import ErrorPage from '../../design-system/screens/error-page';

// [ ](Adrien): use dynamic import
import { ScaleBox } from './list-item-scale';
import { SoftLabel } from './list-item-label';
import { ChipWithStatus } from './list-item-chip-with-status';
import { Category } from './list-item-category';
import { ProgressValue } from './list-item-progress';
import EmergencyIcon from '../../design-system/icons/icons-emergency';
import { CircularProgress } from '@mui/material';

function FieldInputValueEnum(props) {
  const { value, options: enumName } = props;
  const { data = {}, loading: loadingData, error } = useEnum(enumName);
  const { options, min, max, length, type } = data;

  const option =
    (options && options.find((item) => item.value === parseInt(value, 10))) ||
    {};

  let Component;
  switch (type) {
    case 'scale':
      Component = ScaleBox;
      break;
    case 'progress':
      Component = ProgressValue;
      break;
    case 'emergency':
      Component = EmergencyIcon;
      break;
    case 'label':
      Component = SoftLabel;
      break;
    case 'chip':
      Component = ChipWithStatus;
      break;
    default:
      Component = Category;
      break;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (loadingData) {
    return <CircularProgress color="neutral" size={15} />;
  }

  return (
    <Component {...Component.bindProps({ ...option, length, min, max })} />
  );
}

FieldInputValueEnum.bindProp = ({ value, options }) => ({
  value,
  options,
});

export default FieldInputValueEnum;
