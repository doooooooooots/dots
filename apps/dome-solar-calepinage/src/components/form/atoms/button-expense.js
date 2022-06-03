import React from 'react';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import ButtonBase from './button-base';

export default function ButtonExpense(props) {
  const { tooltip = 'expense', count = 0 } = props;

  return (
    <ButtonBase tooltip={tooltip} icon={<AttachMoneyOutlinedIcon />}>
      {count}
    </ButtonBase>
  );
}
