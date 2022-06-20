import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import FieldInputValueBase from './field-input-value-base';
import useEnum from '../../../hooks/use-enums';
import ErrorPage from '../../design-system/screens/error-page';

// [ ](Adrien): use dynamic import
import { ScaleBox } from './list-item-scale';
import { SoftLabel } from './list-item-label';
import { ChipWithStatus } from './list-item-chip-with-status';
import EmergencyIcon from '../../design-system/icons/icons-emergency';
import ProgressIcon from '../../design-system/icons/icons-progress';
import { Category } from './list-item-category';

function FieldInputValueEnum(props) {
  const { loading, value, options: enumName, ...other } = props;
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
      Component = ProgressIcon;
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

  return !loading && !loadingData ? (
    <FieldInputValueBase {...other}>
      <Component {...Component.bindProps({ ...option, length, min, max })} />
    </FieldInputValueBase>
  ) : (
    <Box pl={2}>
      <CircularProgress color="neutral" size={15} />
    </Box>
  );
}

export default FieldInputValueEnum;
